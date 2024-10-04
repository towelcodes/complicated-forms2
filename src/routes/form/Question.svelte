<script lang="ts">
    import type { Option, Path, Question, Section } from "$lib/types";
    import { onMount } from "svelte";

    export let question: Question | Section;
    export let identifier: string | undefined = undefined; // does not have to be unique
    export let title: string;
    export let type: string;
    export let description: string | undefined = undefined;
    export let callback: Function | undefined = undefined;
    export let options: Option[];

    // hold values from 
    let selected_single: string;
    let selected_multi: string[] = [];
    let input_value: string;

    // questions to render below
    let subPaths: Path[] = [];

    let optionsMap: Map<string, Option> = new Map();

    // thank you svelte.dev repl
    const slugify = (str = "") =>
        str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");

    const updateSub = (options: Option[]) => {
        options.forEach((o) => {
            if (o.next) {
                if (!subPaths.includes(o.next)) {
                    subPaths.push(o.next);
                }
            }
        });
    }

    const changed = (e: Event) => {
        if (callback) {
            if (type === "radio") {
                let sel = optionsMap.get(selected_single);
                if (sel) {
                    updateSub([sel]);
                    callback(question, [sel]);
                }
            } else if (type === "checkbox") {
                let sel: Option[] = [];
                selected_multi.forEach((title) => {
                    let opt = optionsMap.get(title);
                    if (opt != undefined) {
                        sel.push(opt);
                    }
                })
                updateSub(sel);
                callback(question, sel);
            }
        }
    }

    const subChanged = (question: Question, options: Option[]) => {
        console.log("queestion options");
    }

    onMount(() => {
        options.forEach((option) => {
            optionsMap.set(option.title, option);
            if (document.querySelector(`input[name=${slugify(option.title)}]`) instanceof HTMLInputElement) {
                option.element = document.querySelector(`input[name=${slugify(option.title)}]`) as HTMLInputElement || undefined;
            }
        });
    });

    console.log(options);
</script>

<div class="latte mx-auto w-4/6 m-5 p-8 bg-surface0 rounded shadow-md">
    <div>
        <h1 class="text-2xl font-bold"><span class="bg-blue-400 rounded p-1 text-xl">{identifier || ""}</span> {title}</h1>
        <p class="text-gray-500">{description || ""}</p>
    </div>

    <div>
        <form>
            {#if type === "radio"}
                {#each options as option}
                    <input type="radio" name={slugify(option.title)} bind:group={selected_single} on:change={changed} value={option.title}>
                    <label for={slugify(option.title)}>{option.title}</label><br/>
                {/each}
            {:else if type === "checkbox"}
                {#each options as option}
                    <input type="checkbox" name={slugify(option.title)} bind:group={selected_multi} on:change={changed} value={option.title}>
                    <label for={slugify(option.title)}>{option.title}</label><br/>
                {/each}
            {:else}
                <p><img src="/icons/cross.png" class="inline h-5" alt="error"> Unsupported option</p>
            {/if}
        </form>
    </div>
</div>

<!-- render questions below if there are any -->
{#each subPaths as sub}
    {#each sub.questions as q}
        <svelte:self question={q} callback={subChanged} identifier={q.identifier} title={q.title} description={q.description} type={q.type} ></svelte:self>
    {/each}
{/each}