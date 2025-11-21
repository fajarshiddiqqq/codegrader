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

    // REACTIVE STATE using $state()
    let title = $state(q.title);
    let description = $state(q.description);
    let starter_code = $state(q.starter_code || "");
    let custom_instructions = $state(q.custom_instructions || "");
    let difficulty = $state(q.difficulty);
    let visibility = $state(q.visibility);
    let tags = $state(q.tags ? q.tags.join(", ") : "");

    // TEST CASES & RUBRIC
    let test_cases: TestCase[] = $state(q.test_cases || []);
    let criteria: Criterion[] = $state(q.rubric?.criteria || []);
    let tone = $state(q.rubric?.tone || "constructive");

    // TEMP new items
    let newTest: TestCase = $state({
        input_data: "",
        expected_output: "",
        is_hidden: false
    });

    let newCriterion: Criterion = $state({
        aspect: "",
        weight: 0.1,
        description: ""
    });

    let message = $state("");

    function addTestCase() {
        if (!newTest.input_data.trim() || !newTest.expected_output.trim()) {
            alert("Please fill in both fields");
            return;
        }
        test_cases.push({ ...newTest });
        newTest = { input_data: "", expected_output: "", is_hidden: false };
    }

    function removeTestCase(index: number) {
        test_cases.splice(index, 1);
    }

    function addCriterion() {
        if (!newCriterion.aspect.trim() || !newCriterion.description.trim()) {
            alert("Fill aspect + description");
            return;
        }
        criteria.push({ ...newCriterion });
        newCriterion = { aspect: "", weight: 0.1, description: "" };
    }

    function removeCriterion(index: number) {
        criteria.splice(index, 1);
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
                    message = (result.data?.error as string) || "Update failed.";
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
                    <label for="title" class="block text-sm font-medium mb-2">Title</label>
                    <input id="title" name="title" bind:value={title} required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md"/>
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium mb-2">Description</label>
                    <textarea id="description" name="description" bind:value={description} required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-32 resize-none"></textarea>
                </div>

                <div>
                    <label for="custom_instructions" class="block text-sm font-medium mb-2">Custom Instructions</label>
                    <textarea id="custom_instructions" name="custom_instructions" bind:value={custom_instructions}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md h-24 resize-none"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="difficulty" class="block text-sm font-medium mb-2">Difficulty</label>
                        <select id="difficulty" name="difficulty" bind:value={difficulty}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label for="visibility" class="block text-sm font-medium mb-2">Visibility</label>
                        <select id="visibility" name="visibility" bind:value={visibility}
                            class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label for="tags" class="block text-sm font-medium mb-2">Tags</label>
                    <input id="tags" name="tags" bind:value={tags}
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
                <label for="starter_code" class="sr-only">Starter Code</label>
                <textarea id="starter_code" name="starter_code" bind:value={starter_code}
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
                    {#each test_cases as tc, i (i)}
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between mb-3">
                                <span class="font-medium">Test #{i + 1}</span>
                                <button type="button" onclick={() => removeTestCase(i)}
                                    class="text-red-600 text-sm hover:text-red-800">Remove</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label for="test_input_{i}" class="text-xs block mb-1">Input</label>
                                    <input id="test_input_{i}" name={`test_cases[${i}][input_data]`} bind:value={tc.input_data}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm font-mono"/>
                                </div>

                                <div>
                                    <label for="test_expected_{i}" class="text-xs block mb-1">Expected</label>
                                    <input id="test_expected_{i}" name={`test_cases[${i}][expected_output]`} bind:value={tc.expected_output}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full text-sm font-mono"/>
                                </div>
                            </div>

                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" bind:checked={tc.is_hidden}
                                    name={`test_cases[${i}][is_hidden]`} 
                                    class="rounded border-gray-300"/>
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
                            <label for="new_test_input" class="text-xs block mb-1">Input</label>
                            <input id="new_test_input" bind:value={newTest.input_data}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>

                        <div>
                            <label for="new_test_expected" class="text-xs block mb-1">Expected</label>
                            <input id="new_test_expected" bind:value={newTest.expected_output}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>
                    </div>

                    <label class="flex items-center gap-2 mb-3 cursor-pointer">
                        <input type="checkbox" bind:checked={newTest.is_hidden} 
                            class="rounded border-gray-300"/>
                        <span class="text-sm">Hidden</span>
                    </label>

                    <button type="button" onclick={addTestCase}
                        class="w-full bg-gray-900 text-white py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
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
                    {#each criteria as c, i (i)}
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between mb-3">
                                <span class="font-medium">Criterion #{i + 1}</span>
                                <button type="button" onclick={() => removeCriterion(i)}
                                    class="text-red-600 text-sm hover:text-red-800">Remove</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                <div class="md:col-span-2">
                                    <label for="criterion_aspect_{i}" class="text-xs block mb-1">Aspect</label>
                                    <input id="criterion_aspect_{i}" name={`criteria[${i}][aspect]`} bind:value={c.aspect}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                                </div>

                                <div>
                                    <label for="criterion_weight_{i}" class="text-xs block mb-1">Weight</label>
                                    <input id="criterion_weight_{i}" type="number" step="0.1" min="0.1" max="1.0"
                                        name={`criteria[${i}][weight]`} bind:value={c.weight}
                                        class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                                </div>
                            </div>

                            <div>
                                <label for="criterion_desc_{i}" class="text-xs block mb-1">Description</label>
                                <textarea id="criterion_desc_{i}" name={`criteria[${i}][description]`}
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
                            <label for="new_criterion_aspect" class="text-xs block mb-1">Aspect</label>
                            <input id="new_criterion_aspect" bind:value={newCriterion.aspect}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>

                        <div>
                            <label for="new_criterion_weight" class="text-xs block mb-1">Weight</label>
                            <input id="new_criterion_weight" type="number" step="0.1" min="0.1" max="1.0"
                                bind:value={newCriterion.weight}
                                class="border border-gray-300 px-3 py-2 rounded-md w-full"/>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="new_criterion_desc" class="text-xs block mb-1">Description</label>
                        <textarea id="new_criterion_desc" bind:value={newCriterion.description}
                            class="border border-gray-300 px-3 py-2 rounded-md w-full h-20 resize-none"></textarea>
                    </div>

                    <button type="button" onclick={addCriterion}
                        class="w-full bg-gray-900 text-white py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                        Add Criterion
                    </button>
                </div>

                <!-- TONE -->
                <div class="pt-4 border-t border-gray-200">
                    <label for="tone" class="block text-sm mb-2">Feedback Tone</label>
                    <select id="tone" name="tone" bind:value={tone}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white">
                        <option value="constructive">Constructive</option>
                        <option value="strict">Strict</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>

            </div>
        </div>

        {#if message}
            <div class="text-red-600 font-medium" role="alert">{message}</div>
        {/if}

        <button type="submit" formaction="?/update"
            class="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md font-semibold transition-colors">
            Save Changes
        </button>
    </form>
</div>