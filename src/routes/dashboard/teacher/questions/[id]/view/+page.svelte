<script>
    let { data } = $props();
    const q = data.question;
</script>

<!-- Header with Actions -->
<div class="mb-6 flex items-center justify-between">
    <div>
        <a
            href="/dashboard/teacher/questions"
            class="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 mb-2"
        >
            <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Back to Questions
        </a>
        <h1 class="text-2xl font-bold text-gray-900">{q.title}</h1>
    </div>

    {#if q.role === "owner" || q.role === "editor"}
        <div class="flex gap-2">
            <a
                href={`/dashboard/teacher/questions/${q.id}/edit`}
                class="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
                Edit
            </a>
        </div>
    {/if}
</div>

<!-- Metadata Cards -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Difficulty</div>
        <div class="text-lg font-semibold text-gray-900 capitalize">
            {q.difficulty}
        </div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Question ID</div>
        <div class="text-lg font-semibold text-gray-900">{q.id}</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="text-sm text-gray-600 mb-1">Role</div>
        <div class="text-lg font-semibold text-gray-900 capitalize">
            {q.role}
        </div>
    </div>
</div>

<!-- Tags -->
{#if q.tags && q.tags.length > 0}
    <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h2 class="text-sm font-semibold text-gray-900 mb-3">Tags</h2>
        <div class="flex flex-wrap gap-2">
            {#each q.tags as tag}
                <span
                    class="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                >
                    {tag}
                </span>
            {/each}
        </div>
    </div>
{/if}

<!-- Description -->
<div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-3">Description</h2>
    <p class="text-gray-700 whitespace-pre-wrap">{q.description}</p>
</div>

<div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-3">Function Name</h2>
    <p class="text-gray-700">{q.function_name}</p>
</div>

<!-- Starter Code -->
{#if q.starter_code}
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">Starter Code</h2>
        <pre
            class="bg-gray-50 border border-gray-200 rounded p-4 overflow-x-auto text-sm"><code
                >{q.starter_code}</code
            ></pre>
    </div>
{/if}

<!-- Test Cases -->
{#if q.test_cases && q.test_cases.length > 0}
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Test Cases</h2>
        <div class="space-y-4">
            {#each q.test_cases as testCase, index}
                <div
                    class="border border-gray-200 rounded-lg p-4 {testCase.is_hidden
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-gray-50'}"
                >
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="font-medium text-gray-900">
                            Test Case #{index + 1}
                        </h3>
                        {#if testCase.is_hidden}
                            <span
                                class="text-xs px-2 py-1 rounded bg-amber-200 text-amber-800 font-medium"
                            >
                                Hidden
                            </span>
                        {:else}
                            <span
                                class="text-xs px-2 py-1 rounded bg-green-100 text-green-800 font-medium"
                            >
                                Visible
                            </span>
                        {/if}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div class="text-xs text-gray-600 mb-1 font-medium">
                                Input
                            </div>
                            <pre
                                class="bg-white border border-gray-200 rounded p-2 text-sm overflow-x-auto"><code
                                    >{testCase.input_data}</code
                                ></pre>
                        </div>
                        <div>
                            <div class="text-xs text-gray-600 mb-1 font-medium">
                                Expected Output
                            </div>
                            <pre
                                class="bg-white border border-gray-200 rounded p-2 text-sm overflow-x-auto"><code
                                    >{testCase.expected_output}</code
                                ></pre>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}

<!-- Rubric -->
{#if q.rubric}
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Grading Rubric</h2>
            <span
                class="text-sm px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 capitalize"
            >
                {q.rubric.tone} Tone
            </span>
        </div>
        {#if q.rubric.criteria && q.rubric.criteria.length > 0}
            <div class="space-y-3">
                {#each q.rubric.criteria as criterion}
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-medium text-gray-900 capitalize">
                                {criterion.aspect}
                            </h3>
                            <span class="text-sm font-semibold text-gray-700">
                                {(criterion.weight * 100).toFixed(0)}%
                            </span>
                        </div>
                        <p class="text-sm text-gray-600">
                            {criterion.description}
                        </p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<!-- Timestamps -->
<div class="bg-white border border-gray-200 rounded-lg p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Timestamps</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <div class="text-sm text-gray-600 mb-1">Created At</div>
            <div class="text-sm text-gray-900">{q.created_at}</div>
        </div>
        <div>
            <div class="text-sm text-gray-600 mb-1">Last Updated</div>
            <div class="text-sm text-gray-900">{q.updated_at}</div>
        </div>
    </div>
</div>

<style>
    pre {
        font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
            "source-code-pro", monospace;
    }

    code {
        font-family: inherit;
    }
</style>
