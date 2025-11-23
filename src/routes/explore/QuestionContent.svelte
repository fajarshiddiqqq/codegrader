<script lang="ts">
    import FilterSidebar from "./FilterSidebar.svelte";

    interface Question {
        id: number;
        title: string;
        description: string;
        language: string;
        difficulty: string;
        tags: string[];
    }

    let { data } = $props();

    let searchQuery = $state("");
    let sortBy = $state("newest");

    let questions = data.questions;
    let selectedLangs: string[] = $state([]);
    let selectedDifficulties: string[] = $state([]);
    let selectedTags: string[] = $state([]);

    function handleFiltersUpdate(filters: {
        selectedLangs: string[];
        selectedDifficulties: string[];
        selectedTags: string[];
    }): void {
        selectedLangs = filters.selectedLangs;
        selectedDifficulties = filters.selectedDifficulties;
        selectedTags = filters.selectedTags;
    }

    let filteredQuestions = $derived(() => {
        let result: Question[] = questions;

        // Apply search filter
        if (searchQuery.trim()) {
            const query: string = searchQuery.toLowerCase();
            result = result.filter(
                (q: Question) =>
                    q.title.toLowerCase().includes(query) ||
                    q.tags.some((tag: string) =>
                        tag.toLowerCase().includes(query)
                    )
            );
        }

        // Apply language filter
        if (selectedLangs.length > 0) {
            result = result.filter((q: Question) =>
                selectedLangs.includes(q.language)
            );
        }

        // Apply difficulty filter
        if (selectedDifficulties.length > 0) {
            result = result.filter((q: Question) =>
                selectedDifficulties.includes(q.difficulty)
            );
        }

        // Apply tags filter
        if (selectedTags.length > 0) {
            result = result.filter((q: Question) =>
                selectedTags.every((tag: string) => q.tags.includes(tag))
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "newest":
                result = [...result].sort(
                    (a: Question, b: Question) => b.id - a.id
                );
                break;
            case "easy-hard":
                const diffOrder: Record<string, number> = {
                    Easy: 1,
                    Medium: 2,
                    Hard: 3,
                };
                result = [...result].sort(
                    (a: Question, b: Question) =>
                        (diffOrder[a.difficulty] || 999) -
                        (diffOrder[b.difficulty] || 999)
                );
                break;
            case "hard-easy":
                const diffOrderRev: Record<string, number> = {
                    Easy: 3,
                    Medium: 2,
                    Hard: 1,
                };
                result = [...result].sort(
                    (a: Question, b: Question) =>
                        (diffOrderRev[a.difficulty] || 0) -
                        (diffOrderRev[b.difficulty] || 0)
                );
                break;
        }
        return result;
    });
</script>

<div class="flex flex-col gap-6 items-center">
    <!-- Top search and sort -->
    <div class="flex flex-col sm:flex-row gap-4 mb-4 w-full">
        <!-- search -->
        <div class="flex-1">
            <input
                type="text"
                placeholder="Search questions..."
                bind:value={searchQuery}
                class="w-full rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ring-1 ring-gray-300 bg-white"
            />
        </div>

        <!-- quick filter -->
        <select
            bind:value={sortBy}
            class="rounded-lg px-4 py-2 text-sm focus:outline-none ring-1 ring-gray-300 bg-white"
        >
            <option value="newest">Newest</option>
            <option value="easy-hard">Difficulty: Easy to Hard</option>
            <option value="hard-easy">Difficulty: Hard to Easy</option>
        </select>
    </div>

    <!-- Main grid layout -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        <!-- side filter -->
        <div class="lg:col-span-1">
            <FilterSidebar
                {questions}
                {selectedLangs}
                {selectedDifficulties}
                {selectedTags}
                onFiltersUpdate={handleFiltersUpdate}
            />
        </div>

        <!-- main content -->
        <div class="lg:col-span-3 flex flex-col gap-4">
            <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
                <p class="text-sm text-gray-600">
                    Showing {filteredQuestions().length} results
                </p>
            </div>

            <!-- list -->
            {#if data.questions.length === 0}
                <div
                    class="bg-white border border-gray-200 rounded-xl py-8 px-12 flex flex-col items-center text-center"
                >
                    <div class="bg-gray-100 rounded-full p-4 mb-4">
                        <img
                            src="/icons/course.svg"
                            alt="course icon"
                            class="w-10 h-10 opacity-80"
                        />
                    </div>
                    <p class="font-bold text-xl">
                        No public questions available.
                    </p>
                    <p class="text-gray-600">
                        Questions will appear here once they are published.
                    </p>
                </div>
            {:else}
                <div class="flex flex-col gap-3">
                    {#each questions as question}
                        <div
                            class="border border-gray-300 bg-white rounded-lg p-5"
                        >
                            <div
                                class="flex flex-col sm:flex-row items-center justify-between gap-4"
                            >
                                <div class="flex-1 w-full">
                                    <div
                                        class="flex flex-wrap items-center gap-3 mb-2"
                                    >
                                        <span
                                            class="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-md"
                                            >{question.language}</span
                                        >
                                        {#if question.difficulty === 'easy'}
                                            <span
                                                class="bg-green-200 text-green-800 px-2 py-1 text-xs rounded-md"
                                                >{question.difficulty}</span
                                            >
                                        {:else if question.difficulty === 'medium'}
                                            <span
                                                class="bg-yellow-200 text-yellow-800 px-2 py-1 text-xs rounded-md"
                                                >{question.difficulty}</span
                                            >
                                        {:else if question.difficulty === 'hard'}
                                            <span
                                                class="bg-red-200 text-red-800 px-2 py-1 text-xs rounded-md"
                                                >{question.difficulty}</span
                                            >
                                        {:else}
                                            <span
                                                class="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-md"
                                                >{question.difficulty}</span
                                            >
                                        {/if}
                                    </div>
                                    <h2 class="font-bold mb-2 text-lg">
                                        {question.title}
                                    </h2>
                                    <p class="text-sm text-gray-600 mb-3">
                                        {question.description}
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                        {#each question.tags as tag}
                                            <span
                                                class="text-xs bg-gray-200 text-gray-700 rounded-sm px-2 py-1"
                                                >{tag}</span
                                            >
                                        {/each}
                                    </div>
                                </div>
                                <div
                                    class="flex sm:flex-col flex-row gap-2 shrink-0 w-full sm:w-auto"
                                >
                                    <a
                                        href={`/questions/${question.key}/preview`}
                                        class="border border-slate-200 px-4 py-2 rounded-md text-sm whitespace-nowrap hover:bg-gray-50 flex-1 sm:flex-none"
                                        >Preview</a
                                    >
                                    <a
                                        href={`/questions/${question.key}`}
                                        class="bg-primary font-semibold text-white px-4 py-2 rounded-md text-sm whitespace-nowrap hover:bg-primary/90 flex-1 sm:flex-none text-center"
                                        >Start</a
                                    >
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
