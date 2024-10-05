<script lang="ts">
    import { base } from "$app/paths";
    import Question from "./Question.svelte";
    import type { FormData, Option } from "$lib/types";
  import { onMount } from "svelte";

    const handleChange = (option: Option) => {
        console.log(option);
    };
    
    type PageData = FormData;
    export let data: PageData;

    let questions: Question[] = [];
</script>

<div class="latte mx-auto w-4/6 m-5 p-8 bg-gradient-to-r from-pink to-rosewater rounded shadow-md">
    <div class="flex items-center">
        <img class="h-16 mr-5" src="{base}/favicon.png" alt="Svelte logo">
        <div>
            <h1 class="text-3xl font-bold">{ data.title }</h1>
            <p>
                { data.description }
                <br/>
                <span class="italic text-sm">
                    {#if data.allRequired}
                        All fields are required.
                    {:else}
                        <span class="text-red">Fields marked with * are required</span>
                    {/if}
                </span>
            </p>
        </div>
    </div>
</div>

{#each data.questions as question}
    <Question question={question} title={question.title} description={question.description} type={question.type} options={question.options}></Question>
{/each}

<div class="latte mx-auto w-1/4 m-5 p-1 rounded shadow-md bg-orange-200">
    <p class="flex items-center justify-center"><img src="{base}/icons/info.png" class="inline h-5 mr-4" alt="info">Choose an option to continue.</p>
</div>

<!-- <Question title={data.questions[0].title} options={data.questions[0].options}></Question> -->