<script lang="ts">
    import { enhance } from "$app/forms";
    import QuestionCodeEditor from "./QuestionCodeEditor.svelte";

    let {
        q,
        code = $bindable(),
        isRunning = $bindable(),
        isSubmitting = $bindable(),
        testResults = $bindable(),
        runError = $bindable(),
        hasRun = $bindable(),
        lastRunCode = $bindable(),
        feedback = $bindable(),
        feedbackError = $bindable(),
        canGenerateFeedback 
    }: {
        q: any;
        code: string;
        isRunning: boolean;
        isSubmitting: boolean;
        testResults: any;
        runError: string | null;
        hasRun: boolean;
        lastRunCode: string | null;
        feedback: any;
        feedbackError: string | null;
        canGenerateFeedback: boolean;
    } = $props();
</script>

<div class="flex-1 flex flex-col overflow-hidden border-l border-gray-200">
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
                    runError = result.data?.error ?? "Failed to run tests.";
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
        <QuestionCodeEditor
            bind:code
            {isRunning}
            {isSubmitting}
            {canGenerateFeedback}
            {hasRun}
            {lastRunCode}
            {testResults}
            onGenerateFeedback={() => {
                document.getElementById('feedback-form')?.requestSubmit();
            }}
        />
    </form>

    <!-- Hidden form for feedback generation -->
    <form
        id="feedback-form"
        method="POST"
        action="?/feedback"
        class="hidden"
        use:enhance={(submit) => {
            if (!testResults?.submission_id) return;
            
            submit.formData.set("submission_id", String(testResults.submission_id));
            isSubmitting = true;
            feedbackError = null;
            feedback = null;

            return async ({ result }) => {
                isSubmitting = false;

                if (result.type === "failure") {
                    feedbackError = result.data?.error ?? "Failed to generate feedback.";
                    feedback = null;
                    return;
                }

                const data = result.data as any;
                feedback = data.feedback ?? null;
                feedbackError = null;
            };
        }}
    ></form>
</div>