<script lang="ts">
    import type { AdditionalInfo, Option, Path, Question, Response } from "$lib/types";
    import { QuestionType } from "$lib/types";
    import storedResponses from "$lib/response_store";
    import { slugify } from "$lib/utils";
    import { onMount } from "svelte";
    import { get } from "svelte/store";
    import { slide } from "svelte/transition";

    export let question: Question;
    // export let identifier: string | undefined = undefined; // does not have to be unique
    // export let required: boolean = true;
    // export let title: string;
    // export let type: QuestionType;
    // export let description: string | undefined = undefined;
    // export let options: Option[];
    // export let additional: AdditionalInfo[] = [];

    let identifier = question.identifier;
    let required = question.required ?? true;
    let title = question.title;
    let type = question.type;
    let description = question.description;
    let options = question.options;
    let additional = question.additional;

    console.log("additional info passed to q", title, additional);
    console.log("additional info bundled with q", question.additional);

    // hold values from 
    let response: Response = {multi: []};
    // let selected_single: string;
    // let selected_multi: string[] = [];
    // let input_value: string;

    const updateStore = (val: Response) => {
        storedResponses.update((map) => {
            map.set(question.uid, val);
            return map;
        });
    }

    $: question.response = response;

    // single selection
    // needs to be async so we can ensure that the optionsMap is built
    // TODO don't use a map to store options so we dont have to wait
    $: if (response.single && question.type == QuestionType.Radio) {
        updateStore(response);
        let sel = optionsMap.get(response.single);
        console.log("updating for single ", question.title, "with sel", sel)
        if (sel) {
            updateSub([sel]);
        } else {
            console.warn("unknown option was selected", response);
        }
    }

    // because we need a default value for multiple selections, 
    // we have to check if the value has been restored yet
    // otherwise it will always be overwitten to be empty
    let multiInit = false;
    //  multi selection
    $: if (response.multi && question.type == QuestionType.Checkbox) {
        if (!multiInit) {
            if (response.multi.length > 0) {
                updateStore(response);
                multiInit = true;
            }
        } else {
            updateStore(response);
        }
        let sel: Option[] = [];
        response.multi.forEach((title) => {
            let opt = optionsMap.get(title);
            if (opt != undefined) {
                sel.push(opt);
            }
        })
        updateSub(sel);
    }

    // $: {
    //     console.log("updated", question.title, question.response);
    // }

    // text input
    // this will get updated for each character typed
    // we send an update only on completion so we dont spam updates
    let queuedUpdate: NodeJS.Timeout | undefined;
    $: if (response.text) {
        if (queuedUpdate) {
            clearTimeout(queuedUpdate);
        }
        queuedUpdate = setTimeout(() => {
            updateStore(response);
            console.error("not implemented yet");
        }, 2000);
    }

    // questions to render below
    let subPaths: Path[] = [];


    const updateSub = (options: Option[]) => {
        console.log("updating subs for", question.title, options);
        // clear sub paths
        subPaths = [];
        options.forEach((o) => {
            console.log("checking option", o);
            if (o.path) {
                if (!subPaths.includes(o.path)) {
                    subPaths.push(o.path);
                }
            }
        });
    }

    let optionsMap: Map<string, Option> = new Map();

    onMount(() => {
        // build mappings from option strings to option objects
        options.forEach((option) => {
            optionsMap.set(option.title, option);
            if (document.querySelector(`input[name=${slugify(option.title)}]`) instanceof HTMLInputElement) {
                option.element = document.querySelector(`input[name=${slugify(option.title)}]`) as HTMLInputElement || undefined;
            }
        });

        // check if this question already has a response
        const res = get(storedResponses).get(question.uid);
        if (res) {
            // this might not work (update: it works actually i'm very happy)
            response = res;
        }
    });

    let testval = "";
    $: console.log(testval);
</script>

<div transition:slide|global class="latte mx-auto w-4/6 m-5 p-8 bg-surface0 rounded shadow-md" >
    <div>
        <h1 class="text-2xl font-bold">
            {#if identifier}
                <span class="bg-blue-400 rounded p-1 text-xl">
                    {identifier}
                </span>
            {/if}
            <!-- TODO do not render star if allRequred is true -->
            {title} {#if required}<span class="text-red">*</span>{/if}
        </h1>
        <p class="text-gray-500">{description || ""}</p>
    </div>

    <div>
        <form>
            {#if type == QuestionType.Radio}
                {#each options as option}
                    <input type="radio" name={slugify(option.title)} bind:group={response.single} value={option.title}>
                    <label for={slugify(option.title)}>{option.title}</label><br/>
                {/each}
            {:else if type == QuestionType.Checkbox}
                {#each options as option}
                    <input type="checkbox" name={slugify(option.title)} bind:group={response.multi} value={option.title}>
                    <label for={slugify(option.title)}>{option.title}</label><br/>
                {/each}
            {:else if type == QuestionType.Text}
                <p><img src="/icons/cross.png" class="inline h-5" alt="error"> Not implemented</p>
            {:else}
                <p><img src="/icons/cross.png" class="inline h-5" alt="error"> Unsupported option</p>
            {/if}

            {#if additional}
                {#each additional as a}
                    <div class="my-2 p-4 bg-surface1 rounded-md">
                        <span class="material-icons md-18 text-md align-bottom">edit_note</span>
                        <span class="font-bold text-md">{a.title}</span><br>
                        {#if a.description}
                            <span class="text-gray-700 text-sm">{a.description}</span><br>
                        {/if}
                        <textarea rows="3" class="resize-none rounded mt-2 w-3/4 p-1" placeholder="Enter additional information as required" bind:value={a.value}></textarea>
                    </div>
                {/each}
            {/if}
        </form>
    </div>
</div>

<!-- render questions below if there are any -->
{#each subPaths as sub}
    {#each sub.questions as q}
        <svelte:self question={q}></svelte:self>
    {/each}
{/each}