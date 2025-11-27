<script>
    import QuestionFeedback from "./QuestionFeedback.svelte";
    import QuestionTestResults from "./QuestionTestResults.svelte";

    let {
        q,
        testResults = $bindable(),
        runError = $bindable(),
        hasRun = $bindable(),
        feedback = $bindable(),
        feedbackError = $bindable(),
    } = $props();
</script>

<div class="sm:w-2/5 border-r border-gray-200 flex flex-col overflow-hidden">
    <div class="shrink-0 p-6 pb-0">
        <a
            href="/explore?tab=questions"
            class="flex items-center mb-4 text-sm text-gray-700"
        >
            <img
                src="/icons/chevron-up.svg"
                alt="caret-left"
                class="w-4 h-4 mr-1 -rotate-90"
            />
            Back to Questions
        </a>
    </div>

    <div class="flex-1 overflow-y-auto p-6 pt-0">
        <h2 class="text-lg font-semibold mb-3 mt-4">Problem Description</h2>
        <p class="text-gray-700 mb-6">{q.description}</p>

        {#if hasRun}
            <h3 class="text-md font-semibold mb-3">Test Results</h3>
            <QuestionTestResults {testResults} {runError} {hasRun} />
        {:else}
            <h3 class="text-md font-semibold mb-3">Test Cases</h3>
            <div class="space-y-3 mb-6">
                {#each q.test_cases as tc}
                    <div class="p-3 rounded border border-gray-200 bg-gray-50">
                        <div class="font-mono text-sm">
                            <div class="text-gray-600">
                                Input: <span class="text-gray-900"
                                    >{tc.input_data}</span
                                >
                            </div>
                            <div class="text-gray-600">
                                Output: <span class="text-gray-900"
                                    >{tc.expected_output}</span
                                >
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        <QuestionFeedback {feedback} {feedbackError} /> 
    </div>
</div>