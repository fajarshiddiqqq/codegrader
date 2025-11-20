<script lang="ts">
    import { enhance } from "$app/forms";

    type TestCase = {
        input_data: string;
        expected_output: string;
        is_hidden: boolean;
    };

    type Criterion = {
        aspect: string;
        weight: number;
        description: string;
    };

    // Basic fields
    let title: string = "";
    let description: string = "";
    let starter_code: string = "";
    let custom_instructions: string = "";
    let difficulty: "easy" | "medium" | "hard" = "easy";
    let visibility: "private" | "public" = "private";
    let tags: string = "";

    // EXISTING items
    let test_cases: TestCase[] = [];
    let criteria: Criterion[] = [];
    let tone: "constructive" | "strict" | "neutral" = "constructive";

    // TEMP input for "Add Test Case"
    let newTest: TestCase = {
        input_data: "",
        expected_output: "",
        is_hidden: false
    };

    // TEMP input for "Add Rubric Criterion"
    let newCriterion: Criterion = {
        aspect: "",
        weight: 0.1,
        description: ""
    };

    function addTestCase(): void {
        if (!newTest.input_data.trim() || !newTest.expected_output.trim()) {
            alert("Please fill in both input and expected output");
            return;
        }
        test_cases = [...test_cases, { ...newTest }];
        newTest = { input_data: "", expected_output: "", is_hidden: false };
    }

    function removeTestCase(index: number): void {
        test_cases = test_cases.filter((_, i) => i !== index);
    }

    function addCriterion(): void {
        if (!newCriterion.aspect.trim() || !newCriterion.description.trim()) {
            alert("Please fill in aspect and description");
            return;
        }
        if (newCriterion.weight <= 0 || newCriterion.weight > 1) {
            alert("Weight must be between 0.1 and 1.0");
            return;
        }
        criteria = [...criteria, { ...newCriterion }];
        newCriterion = { aspect: "", weight: 0.1, description: "" };
    }

    function removeCriterion(index: number): void {
        criteria = criteria.filter((_, i) => i !== index);
    }

    let message = "";
</script>

<div class="max-w-4xl mx-auto space-y-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Create New Question</h1>
            <p class="text-sm text-gray-600 mt-1">Design a comprehensive coding challenge</p>
        </div>
        <a href="/dashboard/teacher/questions" 
           class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
            Back to Questions
        </a>
    </div>

    <form method="POST" class="space-y-6"
        use:enhance={() => {
        message = "";
        return async ({ update, result }) => {
            await update();
            if (result.type === 'failure') {
                message = result.data?.error || "Login failed. Please try again.";
                return;
            }
        };
    }}
    >

        <!-- SECTION: QUESTION DETAILS -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Question Details</h2>
            </div>
            
            <div class="p-6 space-y-5">
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title <span class="text-red-500">*</span></label>
                    <input id="title" name="title" bind:value={title} placeholder="e.g., Two Sum Problem" required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description <span class="text-red-500">*</span></label>
                    <textarea id="description" name="description" bind:value={description} 
                        placeholder="Provide a clear explanation of what students need to accomplish..." required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-32 focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"></textarea>
                </div>

                <div>
                    <label for="custom_instructions" class="block text-sm font-medium text-gray-700 mb-2">Custom Instructions for AI Grader (optional)</label>
                    <textarea id="custom_instructions" name="custom_instructions" bind:value={custom_instructions} 
                        placeholder="Add custom instructions to guide the AI grader's evaluation (e.g., 'Focus on code efficiency', 'Be lenient with styling')..."
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-24 focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"></textarea>
                    <p class="text-xs text-gray-500 mt-1.5">These instructions will be included in the AI grading prompt to adjust tone or focus</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="difficulty" class="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select id="difficulty" name="difficulty" bind:value={difficulty}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label for="visibility" class="block text-sm font-medium text-gray-700 mb-2">Visibility</label>
                        <select id="visibility" name="visibility" bind:value={visibility}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white">
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
                    <input id="tags" name="tags" bind:value={tags}
                        placeholder="e.g., arrays, hash-table, sorting"
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
                    <p class="text-xs text-gray-500 mt-1.5">Separate tags with commas</p>
                </div>
            </div>
        </div>

        <!-- SECTION: STARTER CODE -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Starter Code <span class="text-gray-500 text-sm">(optional)</span></h2>
            </div>
            
            <div class="p-6">
                <label for="starter_code" class="block text-sm font-medium text-gray-700 mb-2">Code Template</label>
                <textarea id="starter_code" name="starter_code" bind:value={starter_code}
                    placeholder="def solution():&#10;    # Write your code here&#10;    pass"
                    class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-48 font-mono text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-gray-50"></textarea>
            </div>
        </div>

        <!-- SECTION: TEST CASES -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold text-gray-900">Test Cases <span class="text-gray-500 text-sm">(at least one required)</span></h2>
                    <span class="text-sm text-gray-500">{test_cases.length} test case{test_cases.length !== 1 ? 's' : ''}</span>
                </div>
            </div>
            
            <div class="p-6 space-y-4">
                <!-- Existing Test Cases -->
                {#if test_cases.length > 0}
                    <div class="space-y-3">
                        {#each test_cases as tc, i}
                            <div class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                                <div class="flex justify-between items-start mb-3">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-semibold text-gray-700">Test #{i + 1}</span>
                                        {#if tc.is_hidden}
                                            <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Hidden</span>
                                        {/if}
                                    </div>
                                    <button type="button"
                                        class="text-sm text-red-600 hover:text-red-700 hover:underline"
                                        on:click={() => removeTestCase(i)}>
                                        Remove
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label for={`test_cases[${i}][input_data]`} class="text-xs font-medium text-gray-600 mb-1 block">Input</label>
                                        <input class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                                            name={`test_cases[${i}][input_data]`}
                                            bind:value={tc.input_data} />
                                    </div>
                                    <div>
                                        <label for={`test_cases[${i}][expected_output]`} class="text-xs font-medium text-gray-600 mb-1 block">Expected Output</label>
                                        <input class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono"
                                            name={`test_cases[${i}][expected_output]`}
                                            bind:value={tc.expected_output} />
                                    </div>
                                </div>

                                <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                    <input type="checkbox" bind:checked={tc.is_hidden}
                                        name={`test_cases[${i}][is_hidden]`}
                                        class="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-2 focus:ring-gray-900" />
                                    <span>Hide this test from students</span>
                                </label>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="text-center py-8 text-gray-400 text-sm">
                        No test cases yet. Add your first one below.
                    </div>
                {/if}

                <!-- Add New Test Case -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-gray-50">
                    <h3 class="text-sm font-semibold text-gray-800 mb-4">Add New Test Case</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <label for="newTestInput" class="text-xs font-medium text-gray-600 mb-1 block">Input</label>
                            <input id="newTestInput" class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono bg-white" 
                                bind:value={newTest.input_data} 
                                placeholder="[1, 2, 3]" />
                        </div>
                        
                        <div>
                            <label for="newTestExpectedOutput" class="text-xs font-medium text-gray-600 mb-1 block">Expected Output</label>
                            <input id="newTestExpectedOutput" class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono bg-white" 
                                bind:value={newTest.expected_output} 
                                placeholder="6" />
                        </div>
                    </div>

                    <label class="flex items-center gap-2 text-sm text-gray-700 mb-4 cursor-pointer">
                        <input type="checkbox" bind:checked={newTest.is_hidden}
                            class="w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-2 focus:ring-gray-900" />
                        <span>Hide this test from students</span>
                    </label>

                    <button type="button" on:click={addTestCase}
                        class="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                        Add Test Case
                    </button>
                </div>
            </div>
        </div>

        <!-- SECTION: RUBRIC -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold text-gray-900">Grading Rubric <span class="text-gray-500 text-sm">(at least one required)</span></h2>
                    <span class="text-sm text-gray-500">{criteria.length} criteri{criteria.length !== 1 ? 'a' : 'on'}</span>
                </div>
            </div>
            
            <div class="p-6 space-y-4">
                <!-- Existing Criteria -->
                {#if criteria.length > 0}
                    <div class="space-y-3">
                        {#each criteria as c, i}
                            <div class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                                <div class="flex justify-between items-start mb-3">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-semibold text-gray-700">Criterion #{i + 1}</span>
                                        <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">Weight: {c.weight}</span>
                                    </div>
                                    <button type="button"
                                        class="text-sm text-red-600 hover:text-red-700 hover:underline"
                                        on:click={() => removeCriterion(i)}>
                                        Remove
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                    <div class="md:col-span-2">
                                        <label for={`criteria[${i}][aspect]`} class="text-xs font-medium text-gray-600 mb-1 block">Aspect</label>
                                        <input class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            name={`criteria[${i}][aspect]`}
                                            bind:value={c.aspect} />
                                    </div>

                                    <div>
                                        <label for={`criteria[${i}][weight]`} class="text-xs font-medium text-gray-600 mb-1 block">Weight (0.1-1.0)</label>
                                        <input type="number" step="0.1" min="0.1" max="1.0"
                                            class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            name={`criteria[${i}][weight]`}
                                            bind:value={c.weight} />
                                    </div>
                                </div>

                                <div>
                                    <label for={`criteria[${i}][description]`} class="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                                    <textarea class="border border-gray-300 px-3 py-2 rounded-md w-full h-20 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                        name={`criteria[${i}][description]`}
                                        bind:value={c.description}></textarea>
                                </div>
                            </div>
                        {/each}
                    </div>
                {:else}
                    <div class="text-center py-8 text-gray-400 text-sm">
                        No rubric criteria yet. Add your first one below.
                    </div>
                {/if}

                <!-- Add New Criterion -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-5 bg-gray-50">
                    <h3 class="text-sm font-semibold text-gray-800 mb-4">Add New Criterion</h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div class="md:col-span-2">
                            <label for="newCriterionAspect" class="text-xs font-medium text-gray-600 mb-1 block">Aspect</label>
                            <input id="newCriterionAspect" class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                bind:value={newCriterion.aspect}
                                placeholder="e.g., Correctness" />
                        </div>

                        <div>
                            <label for="newCriterionWeight" class="text-xs font-medium text-gray-600 mb-1 block">Weight</label>
                            <input id="newCriterionWeight" type="number" step="0.1" min="0.1" max="1.0"
                                class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white"
                                bind:value={newCriterion.weight}
                                placeholder="0.5" />
                        </div>
                    </div>

                    <div class="mb-4">
                        <label for="newCriterionDescription" class="text-xs font-medium text-gray-600 mb-1 block">Description</label>
                        <textarea id="newCriterionDescription" class="border border-gray-300 px-3 py-2 rounded-md w-full h-20 text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none bg-white"
                            bind:value={newCriterion.description}
                            placeholder="Describe what this criterion evaluates..."></textarea>
                    </div>

                    <button type="button" on:click={addCriterion}
                        class="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                        Add Criterion
                    </button>
                </div>

                <!-- Tone Selection -->
                <div class="pt-4 border-t border-gray-200">
                    <label for="tone" class="block text-sm font-medium text-gray-700 mb-2">Feedback Tone</label>
                    <select id="tone" name="tone" bind:value={tone}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white">
                        <option value="constructive">Constructive - Encouraging and helpful</option>
                        <option value="strict">Strict - Direct and precise</option>
                        <option value="neutral">Neutral - Objective and factual</option>
                    </select>
                </div>
            </div>
        </div>

        {#if message}
            <div class="text-red-600 font-medium">
                Failed: {message}
            </div>
        {/if}

        <!-- SUBMIT BUTTON -->
        <button type="submit" formaction="?/create"
            class="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md font-semibold shadow hover:shadow-lg transition-all">
            Create Question
        </button>
    </form>
</div>