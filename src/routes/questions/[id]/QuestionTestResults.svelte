<script lang="ts">
    let {
        testResults,
        runError,
        hasRun
    }: {
        testResults: any;
        runError: string | null;
        hasRun: boolean;
    } = $props();

    console.log({ testResults, runError, hasRun });
</script>

<div class={`space-y-3 ${hasRun ? "pb-4" : ""}`}>
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
        <div class="text-sm font-medium text-gray-800 text-right">
            {testResults.passed} / {testResults.total} tests passed
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
                            Input: <span>{JSON.stringify(tc.input)}</span>
                        </div>
                        <div class="text-gray-700">
                            Expected: <span>{tc.expected}</span>
                        </div>
                        <div class="text-gray-700">
                            Got: <span>{tc.got}</span>
                        </div>
                    </div>
                    <div class="text-xs font-semibold">
                        {tc.status === "passed" ? "PASS" : "FAIL"}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>