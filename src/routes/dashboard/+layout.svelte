<script>
    import Navbar from "$lib/components/Navbar.svelte";
    let { children } = $props();
</script>

<div class="flex flex-col h-screen">
    <Navbar />
    <main class="flex-1 flex w-full min-h-0">
        {@render children()}
    </main>
</div>
