<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import QuestionHeader from "./QuestionHeader.svelte";
    import QuestionLeftPanel from "./QuestionLeftPanel.svelte";
    import QuestionRightPanel from "./QuestionRightPanel.svelte";
    import QuestionSubmissionHistory from "./QuestionSubmissionHistory.svelte";

    let { data, form } = $props();
    let q = data.question;

    let showHistory = $state(false);
    let isRunning = $state(false);
    let isSubmitting = $state(false);

    let code = $state(q.starter_code ?? "");

    let testResults = $state<any>(form?.testResults ?? null);
    let runError = $state<string | null>(form?.error ?? null);
    let feedback = $state<any>(form?.feedback ?? null); 
    let feedbackError = $state<string | null>(null);

    let hasRun = $derived(!!testResults);
    let lastRunCode = $state<string | null>(
        form?.testResults ? (q.starter_code ?? "") : null
    );

    const canGenerateFeedback = $derived(
        hasRun &&
            !isRunning &&
            !isSubmitting &&
            !!testResults &&
            lastRunCode !== null &&
            code === lastRunCode
    );

    // if code changes, feedback is no longer valid
    $effect(() => {
        if (hasRun && lastRunCode !== null && code !== lastRunCode) {
            feedback = null;
        }
    });

    function toggleHistory() {
        showHistory = !showHistory;
    }
</script>

<div class="flex flex-col h-screen">
    <Navbar {data} />

    <main class="flex flex-col flex-1">
        <!-- Header -->
        <QuestionHeader {q} />

        <!-- Content -->
        <div class="flex-1 flex overflow-hidden flex-col sm:flex-row">
            <!-- left panel -->
            <QuestionLeftPanel 
                {q} 
                bind:testResults 
                bind:runError 
                bind:hasRun 
                bind:feedback
                bind:feedbackError
            />

            <!-- right panel -->
            <QuestionRightPanel
                {q}
                bind:code
                bind:isRunning
                bind:isSubmitting
                bind:testResults
                bind:runError
                bind:hasRun
                bind:lastRunCode
                bind:feedback
                bind:feedbackError
                {canGenerateFeedback}
            />
        </div>

        <!-- Submission history -->
        <QuestionSubmissionHistory {showHistory} {toggleHistory} />
    </main>
</div>