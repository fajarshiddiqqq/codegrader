<script lang="ts">
    import Monaco from "$lib/components/Monaco.svelte";

    let {
        code = $bindable(),
        isRunning,
        isSubmitting,
        canGenerateFeedback,
        hasRun,
        lastRunCode,
        testResults,
        onGenerateFeedback
    }: {
        code: string;
        isRunning: boolean;
        isSubmitting: boolean;
        canGenerateFeedback: boolean;
        hasRun: boolean;
        lastRunCode: string | null;
        testResults: any;
        onGenerateFeedback?: () => void;
    } = $props();

    const showCodeChangedWarning = $derived(
        hasRun && lastRunCode !== null && code !== lastRunCode
    );
</script>

<div class="flex flex-col h-full overflow-hidden">
    <div
        class="bg-gray-100 px-4 py-2 border-b flex items-center justify-between"
    >
        <div class="flex flex-col gap-1">
            <span class="text-sm font-medium text-gray-700">Code Editor</span>

            {#if showCodeChangedWarning}
                <span class="text-xs text-amber-700">
                    Code changed since last run. Run tests again to enable
                    feedback.
                </span>
            {/if}
        </div>

        <div class="flex gap-2">
            <!-- Run Tests -->
            <button
                type="submit"
                class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-blue-800 disabled:bg-gray-400 text-sm font-medium transition"
                disabled={isRunning || canGenerateFeedback}
            >
                <img src="/icons/play.svg" alt="play" class="w-4 h-4" />
                {isRunning ? "Running..." : "Run Tests"}
            </button>

            <!-- Generate Feedback -->
            <button
                type="button"
                disabled={!canGenerateFeedback}
                class="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded hover:bg-emerald-700 disabled:bg-gray-400 text-sm font-medium transition"
                onclick={onGenerateFeedback}
            >
                <img src="/icons/submit.svg" alt="send" class="w-4 h-4" />
                {isSubmitting ? "Generating..." : "Generate Feedback"}
            </button>
        </div>
    </div>

    <Monaco value={code} language="python" onChange={(v) => (code = v)} />
</div>