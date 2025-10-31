<script>
    let data = $props();
    let topics = data.topics;
</script>

<div class="mb-26">
    <h2 class="text-3xl font-bold text-slate-900 text-center mb-8">
        Browse by Topic
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {#each topics as topic}
            <button
                class="p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200 border border-slate-100"
            >
                <div class="w-12 h-12 rounded-lg mb-3 mx-auto">
                    <img
                        src={topic.icon}
                        alt={topic.name}
                        class="w-8 h-8 mx-auto"
                    />
                </div>
                <div class="text-slate-800 font-semibold text-center">
                    {topic.name}
                </div>
            </button>
        {/each}
    </div>
</div>
