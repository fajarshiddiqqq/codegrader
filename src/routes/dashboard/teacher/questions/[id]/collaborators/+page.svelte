<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";

    type Collaborator = {
        id: number;
        email: string;
        name?: string;
        permission: "viewer" | "editor";
    };

    let { data } = $props();

    // Use $derived to keep in sync with server data after invalidation
    let collaborators: Collaborator[] = $derived(data.collaborators || []);
    let questionId = $derived(data.questionId);

    // Form states
    let newEmail = $state("");
    let newPermission = $state<"viewer" | "editor">("viewer");
    let message = $state("");
    let messageType = $state<"success" | "error">("error");
    let isSubmitting = $state(false);

    // Track which collaborator is being edited
    let editingId = $state<number | null>(null);

    function startEditing(userId: number) {
        editingId = userId;
    }

    function cancelEditing() {
        editingId = null;
    }

    function showMessage(msg: string, type: "success" | "error") {
        message = msg;
        messageType = type;
        setTimeout(() => { message = ""; }, 3000);
    }
</script>

<div class="max-w-3xl mx-auto space-y-6">

    <!-- HEADER -->
    <div class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl font-bold text-gray-900">Manage Collaborators</h1>
            <p class="text-sm text-gray-600 mt-1">Add or remove people who can access this question</p>
        </div>

        <a href="/dashboard/teacher/questions"
           class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
            Back to Question
        </a>
    </div>

    <!-- MESSAGE TOAST -->
    {#if message}
        <div 
            class="px-4 py-3 rounded-md text-sm font-medium {messageType === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'}"
            role="alert">
            {message}
        </div>
    {/if}

    <!-- ADD COLLABORATOR -->
    <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">Add Collaborator</h2>
        </div>

        <form 
            method="POST" 
            action="?/add"
            use:enhance={() => {
                isSubmitting = true;
                return async ({ result }) => {
                    isSubmitting = false;
                    if (result.type === "success") {
                        newEmail = "";
                        newPermission = "viewer";
                        showMessage("Collaborator added successfully!", "success");
                        await invalidateAll(); // Re-fetch all load functions
                    } else if (result.type === "failure") {
                        const err = result.data?.error;
                        showMessage(typeof err === "string" ? err : "Failed to add collaborator.", "error");
                    }
                };
            }}
            class="p-6">
            
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                    <label for="email" class="sr-only">Email address</label>
                    <input 
                        id="email"
                        name="email" 
                        type="email" 
                        placeholder="Enter email address"
                        bind:value={newEmail}
                        required
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md text-sm"
                    />
                </div>

                <div class="sm:w-36">
                    <label for="permission" class="sr-only">Permission</label>
                    <select 
                        id="permission"
                        name="permission" 
                        bind:value={newPermission}
                        class="w-full border border-gray-300 px-4 py-2.5 rounded-md bg-white text-sm">
                        <option value="viewer">Can View</option>
                        <option value="editor">Can Edit</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    class="px-6 py-2.5 bg-gray-900 text-white rounded-md text-sm font-medium 
                           hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    {isSubmitting ? "Adding..." : "Add"}
                </button>
            </div>
        </form>
    </div>

    <!-- COLLABORATORS LIST -->
    <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">
                Current Collaborators
                {#if collaborators.length > 0}
                    <span class="text-gray-500 font-normal">({collaborators.length})</span>
                {/if}
            </h2>
        </div>

        <div class="divide-y divide-gray-200">
            {#each collaborators as collab (collab.id)}
                <div class="px-6 py-4 flex items-center justify-between gap-4">
                    
                    <!-- User Info -->
                    <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">
                            {collab.name || collab.email}
                        </p>
                        {#if collab.name}
                            <p class="text-sm text-gray-500 truncate">{collab.email}</p>
                        {/if}
                    </div>

                    <!-- Permission & Actions -->
                    {#if editingId === collab.id}
                        <!-- EDIT MODE -->
                        <form 
                            method="POST" 
                            action="?/update"
                            use:enhance={() => {
                                return async ({ result }) => {
                                    if (result.type === "success") {
                                        editingId = null;
                                        showMessage("Permission updated!", "success");
                                        await invalidateAll();
                                    } else if (result.type === "failure") {
                                        const err = result.data?.error;
                                        showMessage(typeof err === "string" ? err : "Failed to update.", "error");
                                    }
                                };
                            }}
                            class="flex items-center gap-2">
                            
                            <select 
                                name="permission" 
                                class="border border-gray-300 px-3 py-1.5 rounded-md bg-white text-sm">
                                <option value="viewer" selected={collab.permission === "viewer"}>Can View</option>
                                <option value="editor" selected={collab.permission === "editor"}>Can Edit</option>
                            </select>

                            <input type="hidden" name="user_id" value={collab.id} />

                            <button 
                                type="submit"
                                class="px-3 py-1.5 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                                Save
                            </button>

                            <button 
                                type="button"
                                onclick={cancelEditing}
                                class="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                        </form>
                    {:else}
                        <!-- VIEW MODE -->
                        <div class="flex items-center gap-3">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                                {collab.permission === 'editor' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-gray-100 text-gray-800'}">
                                {collab.permission === "editor" ? "Can Edit" : "Can View"}
                            </span>

                            <button 
                                type="button"
                                onclick={() => startEditing(collab.id)}
                                class="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                                Edit
                            </button>

                            <!-- DELETE FORM -->
                            <form 
                                method="POST" 
                                action="?/delete"
                                use:enhance={() => {
                                    return async ({ result }) => {
                                        if (result.type === "success") {
                                            showMessage("Collaborator removed.", "success");
                                            await invalidateAll();
                                        } else if (result.type === "failure") {
                                            const err = result.data?.error;
                                            showMessage(typeof err === "string" ? err : "Failed to remove.", "error");
                                        }
                                    };
                                }}>
                                <input type="hidden" name="user_id" value={collab.id} />
                                <button 
                                    type="submit"
                                    class="text-sm text-red-600 hover:text-red-800 hover:underline">
                                    Remove
                                </button>
                            </form>
                        </div>
                    {/if}
                </div>
            {:else}
                <div class="px-6 py-12 text-center">
                    <p class="text-gray-500">No collaborators yet</p>
                    <p class="text-sm text-gray-400 mt-1">Add someone using the form above</p>
                </div>
            {/each}
        </div>
    </div>

    <!-- PERMISSION INFO -->
    <div class="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Permission Levels</h3>
        <ul class="text-sm text-gray-600 space-y-1">
            <li><span class="font-medium">Can View:</span> View the question and submissions</li>
            <li><span class="font-medium">Can Edit:</span> Edit the question, test cases, and rubric</li>
        </ul>
    </div>
</div>