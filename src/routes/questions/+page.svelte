<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import FilterSidebar from "./FilterSidebar.svelte";
    import QuestionList from "./QuestionList.svelte";

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

    interface PageData {
        questions: Question[];
    }

    let { data }: { data: PageData } = $props();
    let questions: Question[] = data.questions;

    // State management
    let searchQuery: string = $state("");
    let sortBy: string = $state("popular");
    let viewMode: "grid" | "list" = $state("grid");
    
    // Filter states
    let selectedLangs: string[] = $state([]);
    let selectedDifficulties: string[] = $state([]);
    let selectedTags: string[] = $state([]);

    // Filtered and sorted questions
    let filteredQuestions = $derived(() => {
        let result: Question[] = questions;

        // Apply search filter
        if (searchQuery.trim()) {
            const query: string = searchQuery.toLowerCase();
            result = result.filter((q: Question) => 
                q.title.toLowerCase().includes(query) ||
                q.desc.toLowerCase().includes(query) ||
                q.tags.some((tag: string) => tag.toLowerCase().includes(query))
            );
        }

        // Apply language filter
        if (selectedLangs.length > 0) {
            result = result.filter((q: Question) => selectedLangs.includes(q.language));
        }

        // Apply difficulty filter
        if (selectedDifficulties.length > 0) {
            result = result.filter((q: Question) => selectedDifficulties.includes(q.difficulty));
        }

        // Apply tags filter
        if (selectedTags.length > 0) {
            result = result.filter((q: Question) => 
                selectedTags.every((tag: string) => q.tags.includes(tag))
            );
        }

        // Apply sorting
        switch (sortBy) {
            case "popular":
                result = [...result].sort((a: Question, b: Question) => b.pop - a.pop);
                break;
            case "newest":
                result = [...result].sort((a: Question, b: Question) => b.id - a.id);
                break;
            case "easy-hard":
                const diffOrder: Record<string, number> = { "Easy": 1, "Medium": 2, "Hard": 3 };
                result = [...result].sort((a: Question, b: Question) => 
                    (diffOrder[a.difficulty] || 999) - (diffOrder[b.difficulty] || 999)
                );
                break;
            case "hard-easy":
                const diffOrderRev: Record<string, number> = { "Easy": 3, "Medium": 2, "Hard": 1 };
                result = [...result].sort((a: Question, b: Question) => 
                    (diffOrderRev[a.difficulty] || 0) - (diffOrderRev[b.difficulty] || 0)
                );
                break;
        }

        return result;
    });

    function handleFiltersUpdate(filters: {
        selectedLangs: string[];
        selectedDifficulties: string[];
        selectedTags: string[];
    }): void {
        selectedLangs = filters.selectedLangs;
        selectedDifficulties = filters.selectedDifficulties;
        selectedTags = filters.selectedTags;
    }
</script>

<div class="flex flex-col min-h-screen bg-gray-100">
    <Navbar {data} />

    <div class="w-full max-w-7xl mx-auto px-4 py-4">
        <!-- Top search and sort -->
        <div class="flex flex-col sm:flex-row gap-4 mb-4">
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
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="easy-hard">Difficulty: Easy to Hard</option>
                <option value="hard-easy">Difficulty: Hard to Easy</option>
            </select> 
        </div>

        <!-- Main grid layout -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                <!-- top controls -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <p class="text-sm text-gray-600">
                        Showing {filteredQuestions().length} results
                    </p>
                    <div class="flex items-center gap-1">
                        <span class="text-gray-700 text-sm mr-2">View</span>
                        <button
                            onclick={() => viewMode = "grid"}
                            class="px-3 py-1 text-sm rounded-full font-semibold
                                {viewMode === 'grid' 
                                    ? 'bg-secondary text-white' 
                                    : 'bg-white text-gray-700 border border-gray-300'}"
                        >
                            Grid
                        </button>
                        <button
                            onclick={() => viewMode = "list"}
                            class="px-3 py-1 text-sm rounded-full font-semibold
                                {viewMode === 'list' 
                                    ? 'bg-secondary text-white' 
                                    : 'bg-white text-gray-700 border border-gray-300'}"
                        >
                            List
                        </button>
                    </div>
                </div>

                <!-- question list -->
                <QuestionList questions={filteredQuestions()} {viewMode} />
            </div>
        </div>
    </div>
</div>