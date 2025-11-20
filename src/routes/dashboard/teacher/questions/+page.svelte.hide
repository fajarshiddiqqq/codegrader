<script lang="ts">
    import QuestionList from "./QuestionList.svelte";
    import type { TeacherQuestion } from '$lib/types';

    interface PageData {
        questions: TeacherQuestion[];
    }

    let { data }: { data: PageData } = $props();

    // State management
    let searchQuery: string = $state("");
    let debouncedQuery: string = $state("");

    // Debounce search query
    $effect(() => {
        // Read searchQuery to make it a dependency
        const query = searchQuery;
        
        const timer = setTimeout(() => {
            debouncedQuery = query;
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    });

    // Filtered questions based on debounced search query
    let filteredQuestions = $derived.by(() => {
        if (!debouncedQuery.trim()) {
            return data.questions;
        }

        const query = debouncedQuery.toLowerCase().trim();
        
        return data.questions.filter(question => {
            // Search in title
            if (question.title.toLowerCase().includes(query)) return true;
            
            // Search in description
            if (question.desc.toLowerCase().includes(query)) return true;
            
            // Search in language
            if (question.language.toLowerCase().includes(query)) return true;
            
            // Search in difficulty
            if (question.difficulty.toLowerCase().includes(query)) return true;
            
            // Search in tags
            if (question.tags.some(tag => tag.toLowerCase().includes(query))) return true;
            
            // Search in status
            if (question.status.toLowerCase().includes(query)) return true;
            
            return false;
        });
    });
</script>

<div class="flex flex-col gap-4">
    <!-- top controls -->
    <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12"
    >
        <p class="font-bold text-xl">Your Questions</p>

        <!-- search bar -->
        <div class="flex-1">
            <input
                type="text"
                placeholder="Search questions..."
                bind:value={searchQuery}
                class="w-full rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ring-1 ring-gray-300 bg-white"
            />
        </div>

        <a
            href="/dashboard/teacher/questions/new"
            class="px-3 py-1 rounded-md font-medium bg-secondary text-white"
        >
            + New Question
        </a>
    </div>

    <!-- Results count -->
    {#if debouncedQuery.trim()}
        <p class="text-sm text-gray-600">
            Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
        </p>
    {/if}

    <!-- question list -->
    {#if filteredQuestions.length > 0}
        <QuestionList questions={filteredQuestions} />
    {:else}
        <div class="text-center py-12 text-gray-500">
            <p class="text-lg font-medium">No questions found</p>
            <p class="text-sm mt-2">Try adjusting your search query</p>
        </div>
    {/if}
</div>