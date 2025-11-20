<script>
    let { data, form } = $props();
    
    let showDeleteModal = $state(false);
    let questionToDelete = $state(null);
    let showNotification = $state(false);
    let notificationMessage = $state('');
    let notificationType = $state('success'); // 'success' or 'error'

    // Show notification when form action completes
    $effect(() => {
        if (form) {
            if (form.success) {
                notificationMessage = 'Question deleted successfully!';
                notificationType = 'success';
                showNotification = true;
                setTimeout(() => {
                    showNotification = false;
                }, 3000);
            } else if (form.error) {
                notificationMessage = form.error;
                notificationType = 'error';
                showNotification = true;
                setTimeout(() => {
                    showNotification = false;
                }, 5000);
            }
        }
    });

    function openDeleteModal(question) {
        questionToDelete = question;
        showDeleteModal = true;
    }

    function closeDeleteModal() {
        showDeleteModal = false;
        questionToDelete = null;
    }
</script>

<!-- Notification Toast -->
{#if showNotification}
    <div class="fixed top-4 right-4 z-50 animate-fade-in">
        <div class={`px-4 py-3 rounded shadow-lg ${notificationType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {notificationMessage}
        </div>
    </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteModal}
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" onclick={(e) => e.stopPropagation()}>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Delete Question</h3>
            <p class="text-gray-600 mb-4">
                Are you sure you want to delete "<strong>{questionToDelete?.title}</strong>"? This action cannot be undone.
            </p>
            <div class="flex gap-3 justify-end">
                <button
                    type="button"
                    onclick={closeDeleteModal}
                    class="px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Cancel
                </button>
                <form method="POST" class="inline">
                    <input type="hidden" name="questionId" value={questionToDelete?.id} />
                    <button
                        type="submit"
                        formaction="?/delete"
                        class="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>
    </div>
{/if}

<div class="flex justify-end mb-4">
    <a 
        href="/dashboard/teacher/questions/new"
        class="px-4 py-2 bg-primary text-white rounded text-sm"
    >
        Add Question
    </a>
</div>

{#if data.questions.length === 0}
    <!-- Empty State -->
    <div class="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No questions yet</h3>
        <p class="mt-2 text-sm text-gray-500">Get started by creating your first question.</p>
        <div class="mt-6">
            <a
                href="/dashboard/teacher/questions/new"
                class="inline-flex items-center px-4 py-2 bg-primary text-white rounded text-sm hover:opacity-90"
            >
                <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Question
            </a>
        </div>
    </div>
{:else}
    <!-- Questions List -->
    <div class="space-y-3">
        {#each data.questions as q}
            <div class="bg-white border border-gray-200 rounded-md p-4 hover:shadow-sm transition">
                <!-- Title -->
                <div class="flex items-center justify-between">
                    <h2 class="font-medium text-gray-900 text-lg">
                        {q.title}
                    </h2>
                    <span class="text-xs text-gray-600 border border-gray-300 rounded px-2 py-0.5">
                        {q.difficulty}
                    </span>
                </div>
                <!-- Metadata -->
                <div class="text-sm text-gray-600 flex flex-wrap gap-4 mt-2">
                    <span>ID: {q.id}</span>
                    <span>Role: {q.role}</span>
                    <span>Updated: {q.updated_at}</span>
                </div>
                <!-- Tags -->
                <div class="mt-2 flex flex-wrap gap-2">
                    {#each q.tags as t}
                        <span class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-300">
                            {t}
                        </span>
                    {/each}
                </div>
                <!-- Actions -->
                <div class="mt-4 flex gap-2">
                    <a
                        href={`/dashboard/teacher/questions/${q.id}/view`}
                        class="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        View
                    </a>
                    <a
                        href={`/dashboard/teacher/questions/${q.id}/edit`}
                        class="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Edit
                    </a>
                    <button
                        type="button"
                        onclick={() => openDeleteModal(q)}
                        class="px-3 py-1.5 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Delete
                    </button>
                </div>
            </div>
        {/each}
    </div>
{/if}

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.3s ease-out;
    }
</style>