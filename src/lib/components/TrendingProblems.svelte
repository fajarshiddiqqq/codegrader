<script>
    let data = $props();
    let trendingProblems = data.trendingProblems;
</script>

<div class="mb-16">
    <h2 class="text-3xl font-bold text-slate-900 text-center mb-8">
        Trending Problems
    </h2>
    <div class="grid md:grid-cols-3 gap-6">
        {#each trendingProblems as problem}
            <div
                class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 p-6 border border-slate-100"
            >
                <h3 class="text-xl font-bold text-slate-900 mb-4">
                    {problem.title}
                </h3>
                <div class="flex gap-2 mb-6">
                    <span
                        class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                        >{problem.language}</span
                    >
                    <span
                        class="px-3 py-1 {problem.difficultyColor} rounded-full text-sm font-medium"
                        >{problem.difficulty}</span
                    >
                </div>
                <a href="/s/demo123">
                    <button
                        class="w-full px-6 py-2 bg-slate-900 text-white font-medium rounded-lg shadow-md hover:shadow-xl hover:bg-slate-800 transition-all duration-200"
                    >
                        Practice
                    </button>
                </a>
            </div>
        {/each}
    </div>
</div>
