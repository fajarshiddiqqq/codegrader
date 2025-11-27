<script lang='ts'>
    let { q } = $props();
    
    function getDifficultyColor(difficulty: any) {
        switch (difficulty) {
            case "easy":
                return "bg-green-100 text-green-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "hard":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }
</script>

<div
    class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4"
>
    <div class="flex items-center gap-4">
        <h1 class="text-lg sm:text-2xl font-bold text-gray-900">
            {q.title}
        </h1>
        <span
            class={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(q.difficulty)}`}
        >
            {q.difficulty}
        </span>
    </div>

    <div class="flex gap-2">
        {#each q.tags as tag}
            <span
                class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >{tag}</span
            >
        {/each}
    </div>
</div>
