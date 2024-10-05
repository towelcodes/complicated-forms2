<script lang="ts">
    import type { Option, Path, Question, Response } from "$lib/types";
    import { QuestionType } from "$lib/types";
    import storedResponses from "$lib/response_store";
    import { slugify } from "$lib/utils";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    export let question: Question;
    export let identifier: string | undefined = undefined; // does not have to be unique
    export let required: boolean = true;
    export let title: string;
    export let type: QuestionType;
    export let description: string | undefined = undefined;
    export let options: Option[];

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

    $: {
        question.response = response;
    }

    // single selection
    $: if (response.single) {
        updateStore(response);
        let sel = optionsMap.get(response.single);
        if (sel) {
            updateSub([sel]);
        } else {
            console.warn("unknown option was selected", response);
        }
    }

    //  multi selection
    $: if (response.multi) {
        if (response.multi.length > 0) {
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

    $: {
        console.log("updated", question.title, question.response);
    }

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

    let optionsMap: Map<string, Option> = new Map();

    const updateSub = (options: Option[]) => {
        // clear sub paths
        console.log("updating subs on question", question.title, "with options", options);
        subPaths = [];
        options.forEach((o) => {
            if (o.path) {
                if (!subPaths.includes(o.path)) {
                    subPaths.push(o.path);
                }
            }
        });
        console.log("paths");
        console.log(subPaths);
    }

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

    console.log(options);
</script>

<div class="latte mx-auto w-4/6 m-5 p-8 bg-surface0 rounded shadow-md">
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
        </form>
    </div>
</div>

<!-- render questions below if there are any -->
{#each subPaths as sub}
    {#each sub.questions as q}
        <svelte:self question={q} identifier={q.identifier} title={q.title} description={q.description} type={q.type} options={q.options} ></svelte:self>
    {/each}
{/each}