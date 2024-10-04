<script lang="ts">
    import type { Section, Option, Question } from "$lib/types";
    import QuestionComp from "./Question.svelte";

    export let section: Section;
    let activePaths: Question[][] = [];

    const changed = (question: Question | Section, sel: Option[]) => {
        console.log(question, sel);
    }

    const progressPath = (question: Question, sel: Option[]) => {
        console.log(question, sel);
    }

</script>

<!-- main question for section -->
<QuestionComp question={section} callback={changed} title={section.title} description={section.description} type="checkbox" options={section.options}></QuestionComp>

<!-- subquestions -->
{#each activePaths as path}
    {#each path as question}
        <QuestionComp question={question} callback={progressPath} identifier={question.identifier} title={question.title} description={question.description} type={question.type} options={question.options}></QuestionComp>
    {/each}
{/each}