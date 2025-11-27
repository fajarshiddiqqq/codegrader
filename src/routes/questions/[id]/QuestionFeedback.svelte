<script lang="ts">
    interface FeedbackAspect {
        aspect: string;
        comment: string;
        details: string;
    }

    interface FeedbackData {
        feedback: FeedbackAspect[];
        score: number;
        summary: string;
    }

    let {
        feedback,
        feedbackError
    }: {
        feedback: FeedbackData | null;
        feedbackError: string | null;
    } = $props();

    $inspect(feedback);
</script>

{#if feedback || feedbackError}
    <div class="space-y-3 mt-6">
        <h3 class="text-md font-semibold mb-3">AI Feedback</h3>

        {#if feedbackError}
            <div class="p-4 rounded-lg border border-gray-300 bg-gray-50">
                <p class="text-sm font-medium text-gray-900 mb-1">Error Generating Feedback</p>
                <p class="text-sm text-gray-700">{feedbackError}</p>
            </div>
        {:else if feedback}
            <div class="p-4 rounded-lg border border-gray-300 bg-gray-50">
                <!-- Score -->
                <div class="mb-4 pb-3 border-b border-gray-200">
                    <p class="text-sm font-semibold text-gray-900">
                        Score: {feedback.score}/100
                    </p>
                </div>

                <!-- Summary -->
                <div class="mb-4">
                    <p class="text-sm font-medium text-gray-900 mb-2">Summary</p>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        {feedback.summary}
                    </p>
                </div>

                <!-- Feedback Aspects -->
                <div class="space-y-3">
                    <p class="text-sm font-medium text-gray-900">Detailed Feedback</p>
                    {#each feedback.feedback as item}
                        <div class="pl-4 border-l-2 border-gray-300">
                            <p class="text-sm font-medium text-gray-900 capitalize mb-1">
                                {item.aspect}
                            </p>
                            <p class="text-sm text-gray-700 mb-1">
                                {item.comment}
                            </p>
                            <p class="text-xs text-gray-600 italic">
                                {item.details}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
{/if}