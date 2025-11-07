<script>
    import AdminSidebar from "./AdminSidebar.svelte";
    let { children } = $props();
</script>

<AdminSidebar />
<div class="bg-gray-100 h-full p-4 flex-1 flex flex-col">
    <div class="bg-white flex-1 w-full overflow-y-auto rounded-xl border border-slate-200">
        {@render children()}
    </div>
</div>
