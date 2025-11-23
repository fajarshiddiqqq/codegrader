<script lang="ts">
    interface Question {
        id: number;
        title: string;
        description: string;
        language: string;
        difficulty: string;
        tags: string[];
    }

    interface Props {
        questions: Question[];
        selectedLangs: string[];
        selectedDifficulties: string[];
        selectedTags: string[];
        onFiltersUpdate: (filters: {
            selectedLangs: string[];
            selectedDifficulties: string[];
            selectedTags: string[];
        }) => void;
    }

    let { 
        questions, 
        selectedLangs = [], 
        selectedDifficulties = [], 
        selectedTags = [],
        onFiltersUpdate 
    }: Props = $props();

    let tagSearch: string = $state("");
    let isTagDropdownOpen: boolean = $state(false);

    // Generate unique languages from questions
    const langList = $derived((): string[] => {
        return [...new Set(questions.map((q: Question) => q.language))];
    });

    // Generate unique difficulties from questions
    const difficultyList = $derived((): string[] => {
        return [...new Set(questions.map((q: Question) => q.difficulty))];
    });

    // Calculate tag counts from all tags in questions
    const tagCounts = $derived((): Record<string, number> => {
        const counts: Record<string, number> = {};
        questions.forEach((q: Question) => {
            q.tags.forEach((tag: string) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return counts;
    });

    // Get unique tags filtered by search
    const filteredTags = $derived((): string[] => {
        const unique: string[] = Object.keys(tagCounts());
        return unique.filter((tag: string) =>
            tag.toLowerCase().includes(tagSearch.toLowerCase())
        );
    });

    function toggleLang(lang: string): void {
        const newLangs: string[] = selectedLangs.includes(lang)
            ? selectedLangs.filter((l: string) => l !== lang)
            : [...selectedLangs, lang];
        
        onFiltersUpdate({
            selectedLangs: newLangs,
            selectedDifficulties,
            selectedTags
        });
    }

    function toggleDifficulty(difficulty: string): void {
        const newDifficulties: string[] = selectedDifficulties.includes(difficulty)
            ? selectedDifficulties.filter((d: string) => d !== difficulty)
            : [...selectedDifficulties, difficulty];
        
        onFiltersUpdate({
            selectedLangs,
            selectedDifficulties: newDifficulties,
            selectedTags
        });
    }

    function selectTag(tag: string): void {
        if (!selectedTags.includes(tag)) {
            const newTags: string[] = [...selectedTags, tag];
            onFiltersUpdate({
                selectedLangs,
                selectedDifficulties,
                selectedTags: newTags
            });
        }
        isTagDropdownOpen = false;
        tagSearch = "";
    }

    function removeTag(tag: string): void {
        const newTags: string[] = selectedTags.filter((t: string) => t !== tag);
        onFiltersUpdate({
            selectedLangs,
            selectedDifficulties,
            selectedTags: newTags
        });
    }

    function resetFilters(): void {
        onFiltersUpdate({
            selectedLangs: [],
            selectedDifficulties: [],
            selectedTags: []
        });
        tagSearch = "";
    }
</script>

<div class="grid grid-cols-2 gap-4">
    <!-- Language Filter -->
    <div class="border border-gray-300 bg-white rounded-lg p-4 col-span-1 sm:col-span-2">
        <h4 class="font-bold text-gray-700 mb-3">Language</h4>
        <div class="flex flex-wrap gap-2">
            {#each langList() as lang}
                <button
                    onclick={() => toggleLang(lang)}
                    class="px-3 py-1 rounded-full border text-sm
                        {selectedLangs.includes(lang)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'}"
                >
                    {lang}
                </button>
            {/each}
        </div>
    </div>

    <!-- Difficulty Filter -->
    <div class="border border-gray-300 bg-white rounded-lg p-4 col-span-1 sm:col-span-2">
        <h4 class="font-bold text-gray-700 mb-3">Difficulty</h4>
        <div class="flex flex-wrap gap-2">
            {#each difficultyList() as difficulty}
                <button
                    onclick={() => toggleDifficulty(difficulty)}
                    class="px-3 py-1 rounded-full border text-sm
                        {selectedDifficulties.includes(difficulty)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'}"
                >
                    {difficulty}
                </button>
            {/each}
        </div>
    </div>

    <!-- Tags Filter -->
    <div class="border border-gray-300 bg-white rounded-lg p-4 col-span-2">
        <h4 class="font-bold text-gray-700 mb-3">Tags</h4>

        <div class="relative">
            <input
                type="text"
                placeholder="Search tags..."
                bind:value={tagSearch}
                onfocus={() => (isTagDropdownOpen = true)}
                class="w-full rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary ring-1 ring-gray-300"
            />

            {#if isTagDropdownOpen && filteredTags().length > 0}
                <div
                    class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
                >
                    {#each filteredTags() as tag}
                        <button
                            onclick={() => selectTag(tag)}
                            class="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex justify-between items-center
                                {selectedTags.includes(tag)
                                ? 'bg-gray-50 text-gray-400'
                                : 'text-gray-700'}"
                            disabled={selectedTags.includes(tag)}
                        >
                            <span>{tag}</span>
                            <span
                                class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                            >
                                {tagCounts()[tag]}
                            </span>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Selected Tags -->
        {#if selectedTags.length > 0}
            <div class="flex flex-wrap gap-2 mt-3">
                {#each selectedTags as tag}
                    <button
                        onclick={() => removeTag(tag)}
                        class="px-3 py-1 rounded-full bg-primary text-white text-sm flex items-center gap-1 hover:bg-primary/90"
                    >
                        {tag}
                        <span class="text-xs">✕</span>
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <!-- Reset Button -->
    <button
        class="w-full rounded-lg py-2 border border-gray-300 text-sm bg-gray-50 cursor-pointer hover:bg-gray-100 col-span-2"
        onclick={resetFilters}
    >
        Reset Filters
    </button>
</div>

<svelte:window
    onclick={(e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".relative")) {
            isTagDropdownOpen = false;
        }
    }}
/>