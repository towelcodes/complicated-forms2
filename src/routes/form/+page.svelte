<script lang="ts">
    import { base } from "$app/paths";
    import Question from "./Question.svelte";
    import Modal from "./Modal.svelte";
    import type { FormData, Option } from "$lib/types";
    import { fly } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    import storedResponses from "$lib/response_store";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    type PageData = FormData;
    export let data: PageData;

    let progressRestored = false;
    setTimeout(() => {
        if (get(storedResponses).size > 0) {
            progressRestored = true;
        }
    }, 500);

    let submitting = false;

    const resetSelections = () => {
        storedResponses.set(new Map());
        location.reload();
    };

    const createModal = () => {
        const element = new Modal({
            target: document.querySelector("#modal")!,
            props: {
                title: "Information Collected",
                description: "Your IP address will be recorded along with your submission.",
                buttons: [
                    {
                        title: "Dismiss",
                        action: () => element.dismiss(10)
                    }
                ]
            }
        });
    }

    const submit = () => {
        submitting = true;
        // TODO check all requried options have value
        console.log(data);
        fetch("/api/submit", {
            method: "POST",
            body: JSON.stringify(data),
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                submitting = false;
                storedResponses.update(() => new Map());
                goto("/success");
            }
        }).catch((err) => {
            console.error(err);
        });
    };

    onMount(() => {
        if (data.background) {
            document.body.style.setProperty("--bg-img", `url(${data.background})`);
        }
    });
</script>

<style>
    :global(body) {
        background-image: var(--bg-img, none);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>

<div id="modal"></div>

{#if progressRestored}
    <div transition:fly={{ duration: 300, easing: quadInOut, y: -6 }} class="fixed overflow-hidden mt-1 left-1/2 -translate-x-1/2 text-white text-sm text-center content-center bg-black rounded-xl px-4 py-2 opacity-70 cursor-default">
        Your progress was restored from your last session.
        <button class="bg-white rounded ml-1 text-sm text-black p-1 hover:bg-slate-400 hover:cursor-pointer transition" on:click={() => resetSelections()}>Reset</button> 
        <button class="ml-2 hover:cursor-pointer" on:click={() => progressRestored = false}>✖</button>
    </div>
{/if}

<div class="latte mx-auto w-4/6 m-5 p-8 bg-gradient-to-r from-pink to-rosewater rounded shadow-md">
    <div class="flex items-center">
        <img class="h-16 mr-5" src={data.icon || base+"/icons/form.png"} alt="Form Icon">
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

<div class="latte mx-auto w-1/4 m-5 p-1 bg-red-400 rounded shadow-md" >
    <div class="flex items-center justify-center">
        <span class="material-icons inline h-5 mr-1 md-dark md-18">warning</span>
        <span class="font-bold text-md">Warning</span><br>
    </div>
    <center class="text-sm">Testing server: all data can be viewed by anyone with no authentication required.</center>
</div>

{#each data.questions as question}
    <Question question={question}></Question>
{/each}

<!-- TODO this should disappear when all required options have been selected -->
<div class="latte mx-auto w-1/4 m-5 p-1 rounded shadow-md bg-orange-200">
    <p class="flex items-center justify-center">
        <span class="material-icons inline h-5 mr-4 mb-1 md-dark md-18">info</span>
        Choose an option to continue.
    </p>
</div>

<div class="text-center">
    <button class="mx-auto mb-0 m-5 px-5 py-3 rounded shadow-md bg-green transition hover:bg-green-500 font-bold" on:click={submit}>
        {#if submitting}
            <img src="{base}/icons/loading.png" class="h-10 inline animate-spin" alt="submitting..." />
        {:else}
            Submit
        {/if}
    </button><br/>
    <span class="italic text-sm text-gray-400" style="line-height: 0;">
        Limited information about your device, such as your IP address, <br/>
        will be recorded along with your submission.
        <button class="not-italic underline hover:cursor-pointer" on:click={() => createModal()}>Learn more</button>
    </span>
</div>