<script lang="ts">
  import { quadInOut } from "svelte/easing";
    import { fly } from "svelte/transition";

    export let title: string;
    export let description: string;
    export let buttons: {title: string, action: () => void}[];
    export let delay: number = 0;

    let render = false;
    setTimeout(() => {
        render = true;
    }, delay);

    export const dismiss = (delay?: number) => {
        delay = delay ?? 0;
        setTimeout(() => {
            // TODO this should ideally destroy the component instance; not just hide it
            render = false;
        }, delay);
    };
</script>

{#if render}
    <div transition:fly={{ duration: 200, easing: quadInOut, y: -6 }} class="fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2
    text-white text-sm text-center content-center bg-surface1/80 rounded-xl border-white border-2 cursor-default w-1/2 h-1/2 backdrop-blur-md shadow-lg">
        <h1 class="text-xl font-bold mb-3">{ title }</h1>
        { description } <br>
        {#each buttons as button}
            <button class="bg-white rounded text-black text-sm p-1 hover:bg-slate-400 hover:cursor-pointer transition mt-5 mx-2" 
            on:click={button.action}>{button.title}</button>
        {/each}
    </div>
{/if}