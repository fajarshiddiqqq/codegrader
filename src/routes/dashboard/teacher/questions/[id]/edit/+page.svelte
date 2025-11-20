<script lang="ts">
    import { enhance } from "$app/forms";

    // Provided by +page.server.ts
    let { data } = $props();
    const q = data.question;

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

    // PREFILL FIELDS
    let title = q.title;
    let description = q.description;
    let starter_code = q.starter_code || "";
    let custom_instructions = q.custom_instructions || "";
    let difficulty = q.difficulty;
    let visibility = q.visibility;

    let tags = q.tags ? q.tags.join(", ") : "";

    // PREFILL TEST CASES & RUBRIC
    let test_cases: TestCase[] = q.test_cases || [];
    let criteria: Criterion[] = q.rubric?.criteria || [];
    let tone = q.rubric?.tone || "constructive";

    // TEMP new items
    let newTest: TestCase = {
        input_data: "",
        expected_output: "",
        is_hidden: false
    };

    let newCriterion: Criterion = {
        aspect: "",
        weight: 0.1,
        description: ""
    };

    let message = "";

    function addTestCase() {
        if (!newTest.input_data.trim() || !newTest.expected_output.trim()) {
            alert("Please fill in both fields");
            return;
        }
        test_cases = [...test_cases, { ...newTest }];
        newTest = { input_data: "", expected_output: "", is_hidden: false };
    }

    function removeTestCase(index: number) {
        test_cases = test_cases.filter((_, i) => i !== index);
    }

    function addCriterion() {
        if (!newCriterion.aspect.trim() || !newCriterion.description.trim()) {
            alert("Fill aspect + description");
            return;
        }
        criteria = [...criteria, { ...newCriterion }];
        newCriterion = { aspect: "", weight: 0.1, description: "" };
    }

    function removeCriterion(index: number) {
        criteria = criteria.filter((_, i) => i !== index);
    }
</script>

<div class="max-w-4xl mx-auto space-y-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Edit Question</h1>
            <p class="text-sm text-gray-600 mt-1">Update and refine your coding challenge</p>
        </div>

        <a href="/dashboard/teacher/questions"
           class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
            Back to Question
        </a>
    </div>

    <form method="POST"
        use:enhance={() => {
            message = "";
            return async ({ update, result }) => {
                await update();
                if (result.type === 'failure') {
                    message = result.data?.error || "Update failed.";
                }
            };
        }}
        class="space-y-6">

        <!-- SECTION: QUESTION DETAILS -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Question Details</h2>
            </div>
            
            <div class="p-6 space-y-5">
                <div>
                    <label class="block text-sm font-medium mb-2">Title</label>
                    <input name="title" bind:value={title} required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md"/>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Description</label>
                    <textarea name="description" bind:value={description} required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-32 resize-none"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Custom Instructions</label>
                    <textarea name="custom_instructions" bind:value={custom_instructions}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-24 resize-none"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Difficulty</label>
                        <select name="difficulty" bind:value={difficulty}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-2">Visibility</label>
                        <select name="visibility" bind:value={visibility}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium mb-2">Tags</label>
                    <input name="tags" bind:value={tags}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md" />
                </div>
            </div>
        </div>

        <!-- STARTER CODE -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold text-gray-900">Starter Code</h2>
            </div>
            
            <div class="p-6">
                <textarea name="starter_code" bind:value={starter_code}
                    class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-48 font-mono text-sm bg-gray-50 resize-none"></textarea>
            </div>
        </div>

        <!-- TEST CASES -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold">Test Cases</h2>
            </div>

            <div class="p-6 space-y-4">

                <!-- EXISTING -->
                <div class="space-y-3">
                    {#each test_cases as tc, i}
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between mb-3">
                                <span class="font-medium">Test #{i + 1}</span>
                                <button type="button" on:click={() => removeTestCase(i)}
                                    class="text-red-600 text-sm">Remove</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label class="text-xs">Input</label>
                                    <input name={`test_cases[${i}][input_data]`} bind:value={tc.input_data}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm font-mono"/>
                                </div>

                                <div>
                                    <label class="text-xs">Expected</label>
                                    <input name={`test_cases[${i}][expected_output]`} bind:value={tc.expected_output}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm font-mono"/>
                                </div>
                            </div>

                            <label class="flex items-center gap-2">
                                <input type="checkbox" bind:checked={tc.is_hidden}
                                    name={`test_cases[${i}][is_hidden]`} />
                                <span class="text-sm">Hidden</span>
                            </label>
                        </div>
                    {/each}
                </div>

                <!-- NEW -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-5">
                    <h3 class="text-sm font-semibold mb-4">Add Test Case</h3>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                            <label class="text-xs">Input</label>
                            <input bind:value={newTest.input_data}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>

                        <div>
                            <label class="text-xs">Expected</label>
                            <input bind:value={newTest.expected_output}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>
                    </div>

                    <label class="flex items-center gap-2 mb-3">
                        <input type="checkbox" bind:checked={newTest.is_hidden} />
                        <span class="text-sm">Hidden</span>
                    </label>

                    <button type="button" on:click={addTestCase}
                        class="w-full bg-gray-900 text-white py-2 rounded-md text-sm">
                        Add Test Case
                    </button>
                </div>
            </div>
        </div>

        <!-- RUBRIC -->
        <div class="bg-white rounded-lg shadow border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-lg font-semibold">Rubric</h2>
            </div>

            <div class="p-6 space-y-4">

                <!-- EXISTING -->
                <div class="space-y-3">
                    {#each criteria as c, i}
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between mb-3">
                                <span class="font-medium">Criterion #{i + 1}</span>
                                <button type="button" on:click={() => removeCriterion(i)}
                                    class="text-red-600 text-sm">Remove</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div class="md:col-span-2">
                                    <label class="text-xs">Aspect</label>
                                    <input name={`criteria[${i}][aspect]`} bind:value={c.aspect}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                                </div>

                                <div>
                                    <label class="text-xs">Weight</label>
                                    <input type="number" step="0.1" min="0.1" max="1.0"
                                        name={`criteria[${i}][weight]`} bind:value={c.weight}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                                </div>
                            </div>

                            <div>
                                <label class="text-xs">Description</label>
                                <textarea name={`criteria[${i}][description]`}
                                    bind:value={c.description}
                                    class="border border-gray-300 px-3 py-2 rounded-md w-full h-20 resize-none"></textarea>
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- NEW -->
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-5">
                    <h3 class="text-sm font-semibold mb-4">Add Criterion</h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div class="md:col-span-2">
                            <label class="text-xs">Aspect</label>
                            <input bind:value={newCriterion.aspect}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>

                        <div>
                            <label class="text-xs">Weight</label>
                            <input type="number" step="0.1" min="0.1" max="1.0"
                                bind:value={newCriterion.weight}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="text-xs">Description</label>
                        <textarea bind:value={newCriterion.description}
                            class="border border-gray-300 px-3 py-2 rounded-md w-full h-20 resize-none"></textarea>
                    </div>

                    <button type="button" on:click={addCriterion}
                        class="w-full bg-gray-900 text-white py-2 rounded-md text-sm">
                        Add Criterion
                    </button>
                </div>

                <!-- TONE -->
                <div class="pt-4 border-t border-gray-200">
                    <label class="block text-sm mb-2">Feedback Tone</label>
                    <select name="tone" bind:value={tone}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                        <option value="constructive">Constructive</option>
                        <option value="strict">Strict</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>

            </div>
        </div>

        {#if message}
            <div class="text-red-600 font-medium">{message}</div>
        {/if}

        <button type="submit" formaction="?/update"
            class="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md font-semibold">
            Save Changes
        </button>
    </form>
</div>
