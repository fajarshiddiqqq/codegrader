<script>
    import Navbar from "$lib/components/Navbar.svelte";
    let { children, data } = $props();

</script>

<div class="flex flex-col h-screen">
    <Navbar {data} />
    <main class="flex-1 flex w-full min-h-0">
        {@render children()}
    </main>
</div>
