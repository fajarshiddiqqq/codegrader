<script>
    import TeacherSidebar from "./TeacherSidebar.svelte";
    let { children } = $props();
</script>

<div class="flex flex-1 min-h-0">
    <TeacherSidebar />
    <div class="flex-1 overflow-y-auto p-4 bg-gray-100">
        {@render children()}
    </div>
</div>
