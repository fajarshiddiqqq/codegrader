<script>
    import { page } from "$app/state";
</script>

<div
    class="p-8 text-center absolute w-full h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
>
    <h1 class="text-6xl font-bold">404</h1>
    <p class="text-xl mt-4">Page Not Found</p>
    <a href="/" class="btn mt-6">Go Home</a>
</div>

<style lang="postcss">
    @reference "tailwindcss";

    .btn {
        @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition;
    }
</style>
