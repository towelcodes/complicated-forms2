<script lang="ts">
    import { base } from "$app/paths";
    import { page } from "$app/stores";
</script>

<!-- TODO make errors more specific -->
<div class="latte mx-auto w-4/6 m-5 p-8 bg-gradient-to-r from-pink to-rosewater rounded shadow-md">
    <div class="flex items-center">
        <img class="h-16 mr-5" src="{base}/icons/cross.png" alt="error">
        <div>
            <h1 class="text-3xl font-bold"><span class="bg-blue-400 rounded p-1 text-xl">{ $page.status }</span>
                { $page.error?.message }</h1>
            <p class="text-gray-500">The requested page is unavaliable, or something else went wrong.</p>
        </div>
    </div>
</div>