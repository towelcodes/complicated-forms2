<script lang="ts">
    import { base } from "$app/paths";
    import Question from "./Question.svelte";
    import type { FormData, Option, Section } from "$lib/types";

    const handleChange = (option: Option) => {
        console.log(option);
    };
    
    type PageData = FormData;
    export let data: PageData;

    let questions: Question[] = [];

    const changed = (question: Question | Section, sel: Option[]) => {
        sel.forEach((option) => {
            if (option.next) {
                
            }
        });
    }

    console.log(data);
</script>

<div class="latte mx-auto w-4/6 m-5 p-8 bg-gradient-to-r from-pink to-rosewater rounded shadow-md">
    <div class="flex items-center">
        <img class="h-16 mr-5" src="{base}/favicon.png" alt="Svelte logo">
        <div>
            <h1 class="text-3xl font-bold">{ data.title }</h1>
            <p class="text-gray-500">{ data.description }</p>
        </div>
    </div>
</div>

{#each data.sections as section}
    <Question question={section} callback={changed} title={section.title} description={section.description} type="checkbox" options={section.options}></Question>
{/each}
<!-- <Question title={data.questions[0].title} options={data.questions[0].options}></Question> -->