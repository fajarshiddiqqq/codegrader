<script>
    import AdminSidebar from "./AdminSidebar.svelte";
    
    let { children } = $props();
    let isOpen = $state(false);
    function toggleSidebar() {
        isOpen = !isOpen;
    }
</script>

<AdminSidebar />
<div class="bg-slate-100 h-full p-4 flex-1 flex flex-col">
    <div class="bg-white flex-1 w-full overflow-y-auto rounded-xl border border-slate-200">
        {@render children()}
    </div>
</div>
