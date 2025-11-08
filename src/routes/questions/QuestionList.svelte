<script lang="ts">
    interface Question {
        id: number;
        key: string;
        title: string;
        desc: string;
        language: string;
        difficulty: string;
        tags: string[];
        pop: number;
    }

    interface Props {
        questions: Question[];
        viewMode?: "grid" | "list";
    }

    let { questions, viewMode = "grid" }: Props = $props();
</script>

{#if viewMode === "grid"}
    <!-- Grid View -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 content-start">
        {#each questions as question}
            <div class="border border-gray-300 bg-white rounded-lg p-5">
                <div class="flex justify-between mb-3">
                    <span class="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-md">{question.language}</span>
                    <span class="text-gray-700 px-2 py-1 text-xs rounded-md">{question.difficulty}</span>
                </div>
                <h2 class="font-bold mb-2">{question.title}</h2>
                <p class="text-sm text-gray-600 mb-3">{question.desc}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    {#each question.tags as tag}
                        <span class="text-xs bg-gray-200 text-gray-700 rounded-sm px-2 py-1">{tag}</span>
                    {/each}
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-700 text-xs">pop {question.pop}</span>
                    <div class="flex gap-2">
                        <button class="border border-slate-200 px-2 py-1 rounded-md text-sm hover:bg-gray-50">Preview</button>
                        <a href={`/questions/${question.key}`} class="bg-primary font-semibold text-white px-2 py-1 rounded-md text-sm hover:bg-primary/90">Start</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{:else}
    <!-- List View -->
    <div class="flex flex-col gap-3">
        {#each questions as question}
            <div class="border border-gray-300 bg-white rounded-lg p-5">
                <div class="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div class="flex-1 w-full">
                        <div class="flex flex-wrap items-center gap-3 mb-2">
                            <span class="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-md">{question.language}</span>
                            <span class="text-gray-700 px-2 py-1 text-xs rounded-md">{question.difficulty}</span>
                            <span class="text-gray-500 text-xs">pop {question.pop}</span>
                        </div>
                        <h2 class="font-bold mb-2 text-lg">{question.title}</h2>
                        <p class="text-sm text-gray-600 mb-3">{question.desc}</p>
                        <div class="flex flex-wrap gap-2">
                            {#each question.tags as tag}
                                <span class="text-xs bg-gray-200 text-gray-700 rounded-sm px-2 py-1">{tag}</span>
                            {/each}
                        </div>
                    </div>
                    <div class="flex sm:flex-col flex-row gap-2 shrink-0 w-full sm:w-auto">
                        <button class="border border-slate-200 px-4 py-2 rounded-md text-sm whitespace-nowrap hover:bg-gray-50 flex-1 sm:flex-none">Preview</button>
                        <a href={`/questions/${question.key}`} class="bg-primary font-semibold text-white px-4 py-2 rounded-md text-sm whitespace-nowrap hover:bg-primary/90 flex-1 sm:flex-none text-center">Start</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}