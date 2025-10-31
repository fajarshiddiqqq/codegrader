<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import CodeEditor from "./components/CodeEditor.svelte";
    import OutputPanel from "./components/OutputPanel.svelte";
    import FeedbackPanel from "./components/FeedbackPanel.svelte";

    const id = $derived($page.params.id);

    const mockQuestion = {
        title: "Reverse a String",
        description: `<p>Write a function <code>reverse(s: string): string</code> that returns the input reversed.</p>`,
        starterCode: `# Type your code here...\ndef reverse(s: str) -> str:\n    return s[::-1]`,
    };

    let code = $state(mockQuestion.starterCode);
    let isRunning = $state(false);
    let isSubmitting = $state(false);
    let output = $state<any>(null);
    let feedback = $state<any>(null);

    function resetCode() {
        code = mockQuestion.starterCode;
        output = null;
        feedback = null;
    }
</script>

<svelte:head>
    <title>Question {id} – CodeGrader</title>
</svelte:head>

<!-- GRID: full height, min-h-0 to allow flex -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 h-full min-h-0">
    <!-- LEFT -->
    <aside class="lg:col-span-3 flex flex-col gap-5 min-h-0">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-3">
                {mockQuestion.title}
            </h1>
            <div class="prose prose-sm max-w-none text-gray-700">
                {@html mockQuestion.description}
            </div>
        </div>
        
        <FeedbackPanel {feedback} {isSubmitting} />
    </aside>

    <!-- CENTER: Editor -->
    <section class="lg:col-span-6 flex flex-col gap-5 min-h-0">
        <div class="bg-gray-900 rounded-xl shadow-lg overflow-hidden flex flex-col flex-1 min-h-0">
            <CodeEditor bind:value={code} language="python">
                <div
                    slot="header"
                    let:cursorPos
                    class="bg-gray-800 px-4 py-2 text-xs font-medium text-gray-300 flex items-center justify-between"
                >
                    <span class="font-semibold">Python</span>
                    <span class="text-gray-500">{cursorPos}</span>
                </div>
            </CodeEditor>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 justify-end">
            <!-- Run Code Form -->
            <form method="POST" action="?/run" use:enhance={() => {
                isRunning = true;
                output = null;
                return async ({ result, update }) => {
                    await update();
                    if (result.type === 'success') {
                        output = result.data?.result;
                    }
                    isRunning = false;
                };
            }}>
                <input type="hidden" name="code" value={code} />
                <input type="hidden" name="language" value="python" />
                <button
                    type="submit"
                    disabled={isRunning || isSubmitting}
                    class="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {#if isRunning}
                        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {/if}
                    Run Code
                </button>
            </form>

            <!-- Submit Form -->
            <form method="POST" action="?/submit" use:enhance={() => {
                isSubmitting = true;
                output = null;
                feedback = null;
                return async ({ result, update }) => {
                    await update();
                    if (result.type === 'success') {
                        output = result.data?.execResult;
                        feedback = result.data?.feedback;
                    }
                    isSubmitting = false;
                };
            }}>
                <input type="hidden" name="code" value={code} />
                <input type="hidden" name="questionId" value={id} />
                <button
                    type="submit"
                    disabled={isRunning || isSubmitting}
                    class="px-6 py-2.5 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {#if isSubmitting}
                        <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {/if}
                    Submit
                </button>
            </form>

            <!-- Reset Button -->
            <button
                class="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm disabled:opacity-50"
                onclick={resetCode}
                disabled={isRunning || isSubmitting}
            >
                Reset
            </button>
        </div>
    </section>

    <!-- RIGHT -->
    <aside class="lg:col-span-3 flex flex-col gap-5 min-h-0">
        <OutputPanel {output} {isRunning} />
    </aside>
</div>