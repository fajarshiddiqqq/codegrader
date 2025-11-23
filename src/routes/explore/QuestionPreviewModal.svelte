<script lang="ts">
    import { goto } from "$app/navigation";

    interface Question {
        id: number;
        title: string;
        description: string;
        language: string;
        difficulty: string;
        tags: string[];
    }

    let {
        questionId = $bindable(),
        onClose,
        isLogged,
    }: {
        questionId: number | null;
        onClose: () => void;
        isLogged: boolean;
    } = $props();

    let question = $state<Question | null>(null);
    let loading = $state(false);
    let error = $state<string | null>(null);

    // Fetch question when questionId changes
    $effect(() => {
        if (questionId !== null) {
            fetchQuestion(questionId);
        } else {
            question = null;
            error = null;
        }
    });

    async function fetchQuestion(id: number) {
        loading = true;
        error = null;
        try {
            // Use SvelteKit's internal API route instead
            const res = await fetch(`/api/questions/${id}/preview`);

            if (!res.ok) {
                throw new Error("Failed to load question");
            }

            const data = await res.json();
            question = data.data.question;
        } catch (err) {
            error =
                err instanceof Error ? err.message : "Failed to load question";
            question = null;
        } finally {
            loading = false;
        }
    }
    function handleStart() {
        if (question) {
            goto(`/questions/${question.id}`);
        }
    }

    function getDifficultyColor(difficulty: string) {
        switch (difficulty.toLowerCase()) {
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

{#if questionId !== null}
    <!-- Modal Backdrop -->
    <div
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onclick={onClose}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && onClose()}
    >
        <!-- Modal Content -->
        <div
            class="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onclick={(e) => e.stopPropagation()}
            role="dialog"
            tabindex="0"
            onkeydown={(e) => e.key === "Escape" && onClose()}
        >
            <!-- Header -->
            <div
                class="border-b border-gray-200 px-6 py-4 flex justify-between items-center"
            >
                <h2 class="text-xl font-semibold text-gray-800">
                    Question Preview
                </h2>
                <button
                    onclick={onClose}
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto px-6 py-6">
                {#if loading}
                    <div class="flex items-center justify-center py-12">
                        <div
                            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
                        ></div>
                    </div>
                {:else if error}
                    <div
                        class="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
                    >
                        <p class="text-red-800 font-medium">
                            Error loading question
                        </p>
                        <p class="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                {:else if question}
                    <!-- Question Title and Metadata -->
                    <div class="mb-6">
                        <h3 class="text-2xl font-bold text-gray-800 mb-3">
                            {question.title}
                        </h3>
                        <div class="flex flex-wrap items-center gap-2">
                            <span
                                class="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-md font-medium"
                            >
                                {question.language}
                            </span>
                            <span
                                class="{getDifficultyColor(
                                    question.difficulty
                                )} px-3 py-1 text-sm rounded-md font-medium capitalize"
                            >
                                {question.difficulty}
                            </span>
                            {#each question.tags as tag}
                                <span
                                    class="bg-blue-50 text-blue-700 px-3 py-1 text-sm rounded-md"
                                >
                                    {tag}
                                </span>
                            {/each}
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="border-t border-gray-200 my-6"></div>

                    <!-- Description -->
                    <div class="mb-6">
                        <h4 class="text-lg font-semibold text-gray-800 mb-3">
                            Problem Description
                        </h4>
                        <p
                            class="text-gray-700 leading-relaxed whitespace-pre-wrap"
                        >
                            {question.description}
                        </p>
                    </div>
                {/if}
            </div>

            <!-- Footer -->
            <div
                class="border-t border-gray-200 px-6 py-4 flex justify-end gap-3"
            >
                <button
                    onclick={onClose}
                    class="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                    Cancel
                </button>
                {#if !isLogged}
                    <button
                        onclick={() => goto("/login")}
                        class="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                    >
                        Login to Start
                    </button>
                {:else}
                    <button
                        onclick={handleStart}
                        disabled={!question}
                        class="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Start Challenge
                    </button>
                {/if}
            </div>
        </div>
    </div>
{/if}
