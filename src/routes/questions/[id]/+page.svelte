<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import { enhance } from "$app/forms";
    import Monaco from "$lib/components/Monaco.svelte";

    let { data, form } = $props();
    let q = data.question;

    let showHistory = $state(false);
    let isRunning = $state(false);
    let isSubmitting = $state(false);

    let code = $state(q.starter_code ?? "");

    let testResults = $state<any>(form?.testResults ?? null);
    let runError = $state<string | null>(form?.error ?? null);

    let hasRun = $state(!!testResults);
    let lastRunCode = $state<string | null>(hasRun ? code : null);

    const canGenerateFeedback = $derived(
        hasRun &&
            !isRunning &&
            !isSubmitting &&
            !!testResults &&
            lastRunCode !== null &&
            code === lastRunCode
    );

    // if code changes, feedback is no longer valid (future)
    $effect(() => {
        if (hasRun && lastRunCode !== null && code !== lastRunCode) {
            // feedback = null; // future
        }
    });

    function getDifficultyColor(difficulty: any) {
        switch (difficulty) {
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

<div class="flex flex-col h-screen">
    <Navbar {data} />

    <main class="flex flex-col flex-1">
        <!-- Header -->
        <div
            class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4"
        >
            <div class="flex items-center gap-4">
                <h1 class="text-lg sm:text-2xl font-bold text-gray-900">
                    {q.title}
                </h1>
                <span
                    class={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(q.difficulty)}`}
                >
                    {q.difficulty}
                </span>
            </div>

            <div class="flex gap-2">
                {#each q.tags as tag}
                    <span
                        class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >{tag}</span
                    >
                {/each}
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 flex overflow-hidden flex-col sm:flex-row">
            <!-- left panel -->
            <div
                class="sm:w-2/5 h-1/3 sm:h-auto border-r border-gray-200 overflow-y-auto"
            >
                <div class="p-6">
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

                    <h2 class="text-lg font-semibold mb-3">
                        Problem Description
                    </h2>
                    <p class="text-gray-700 mb-6">{q.description}</p>

                    <h3 class="text-md font-semibold mb-3">Test Cases</h3>
                    <div class="space-y-3 mb-6">
                        {#each q.test_cases as tc}
                            <div
                                class="p-3 rounded border border-gray-200 bg-gray-50"
                            >
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
                </div>
            </div>

                <!-- right panel -->
                <div
                    class="flex-1 flex flex-col overflow-hidden border-l border-gray-200"
                >
                    <form
                        method="POST"
                        action="?/run"
                        class="flex-1 flex flex-col"
                        use:enhance={(submit) => {
                            submit.formData.set("code", code);
                            submit.formData.set("question_id", String(q.id));

                            isRunning = true;
                            runError = null;

                            return async ({ result }) => {
                                isRunning = false;

                                if (result.type === "failure") {
                                    testResults = null;
                                    runError =
                                        result.data?.error ??
                                        "Failed to run tests.";
                                    return;
                                }

                                const data = result.data as any;

                                testResults = data.testResults ?? null;
                                runError = null;

                                hasRun = !!testResults;
                                lastRunCode = code;
                            };
                        }}
                    >
                        <div class="flex-1 flex flex-col border-b">
                            <div
                                class="bg-gray-100 px-4 py-2 border-b flex items-center justify-between"
                            >
                                <div class="flex flex-col gap-1">
                                    <span class="text-sm font-medium text-gray-700"
                                        >Code Editor</span
                                    >

                                    {#if hasRun && lastRunCode !== null && code !== lastRunCode}
                                        <span class="text-xs text-amber-700">
                                            Code changed since last run. Run tests
                                            again to enable feedback.
                                        </span>
                                    {/if}
                                </div>

                                <div class="flex gap-2">
                                    <!-- Run Tests -->
                                    <button
                                        type="submit"
                                        class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-800 disabled:bg-gray-400 text-sm font-medium transition"
                                        disabled={isRunning}
                                    >
                                        <img
                                            src="/icons/play.svg"
                                            alt="play"
                                            class="w-4 h-4"
                                        />
                                        {isRunning ? "Running..." : "Run Tests"}
                                    </button>

                                    <!-- Generate Feedback (not implemented yet) -->
                                    <button
                                        type="button"
                                        disabled={!canGenerateFeedback}
                                        class="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded hover:bg-emerald-700 disabled:bg-gray-400 text-sm font-medium transition"
                                        onclick={() =>
                                            console.log("not implemented")}
                                    >
                                        <img
                                            src="/icons/submit.svg"
                                            alt="send"
                                            class="w-4 h-4"
                                        />
                                        {isSubmitting
                                            ? "Generating..."
                                            : "Generate Feedback"}
                                    </button>
                                </div>
                            </div>

                            <div class="flex-1 min-h-0">   <!-- THIS FIXES MONACO -->
                                <Monaco
                                    value={code}
                                    language="python"
                                    onChange={(v) => (code = v)}
                                />
                            </div>
                        </div>

                        <!-- Test Results -->
                        <div
                            class={`border-t bg-white space-y-3 overflow-y-auto max-h-72 ${hasRun ? "p-4" : ""}`}
                        >
                            <!-- Run error -->
                            {#if runError}
                                <div
                                    class="px-3 py-2 rounded border border-red-300 bg-red-50 text-sm text-red-700"
                                >
                                    {runError}
                                </div>
                            {/if}

                            <!-- Runtime error -->
                            {#if testResults && testResults.status === "error"}
                                <div
                                    class="p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700"
                                >
                                    <div class="font-medium">
                                        Runtime Error ({testResults.error_type})
                                    </div>
                                    <div class="mt-1">
                                        {testResults.error_message}
                                    </div>
                                </div>
                            {/if}

                            <!-- Passed/Failed cases -->
                            {#if testResults && testResults.status !== "error"}
                                <div class="text-sm font-medium text-gray-800">
                                    {testResults.passed} / {testResults.total} tests
                                    passed
                                    <span class="text-gray-500 ml-2">
                                        ({testResults.execution_time_ms} ms)
                                    </span>
                                </div>

                                <div class="space-y-2 text-xs font-mono mt-3">
                                    {#each testResults.results as tc}
                                        <div
                                            class="border rounded px-3 py-2 flex justify-between items-center
                                            {tc.status === 'passed'
                                                ? 'bg-emerald-50 border-emerald-200'
                                                : 'bg-red-50 border-red-200'}"
                                        >
                                            <div>
                                                <div class="text-gray-700">
                                                    Input: <span
                                                        >{JSON.stringify(
                                                            tc.input
                                                        )}</span
                                                    >
                                                </div>
                                                <div class="text-gray-700">
                                                    Expected: <span
                                                        >{tc.expected}</span
                                                    >
                                                </div>
                                                <div class="text-gray-700">
                                                    Got: <span>{tc.got}</span>
                                                </div>
                                            </div>
                                            <div class="text-xs font-semibold">
                                                {tc.status === "passed"
                                                    ? "PASS"
                                                    : "FAIL"}
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </form>
                </div>
        </div>

        <!-- Submission history (left untouched) -->
        <div class="bg-white border-t border-gray-200">
            <button
                onclick={() => (showHistory = !showHistory)}
                class="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
                <div class="flex items-center gap-2">
                    <img
                        src="/icons/history.svg"
                        alt="history"
                        class="w-5 h-6"
                    />
                    <span class="font-medium text-gray-900"
                        >Submission History (3)</span
                    >
                </div>

                {#if showHistory}
                    <img src="/icons/chevron-up.svg" alt="" class="w-5 h-5" />
                {:else}
                    <img
                        src="/icons/chevron-up.svg"
                        alt=""
                        class="w-5 h-5 rotate-180"
                    />
                {/if}
            </button>
        </div>
    </main>
</div>
