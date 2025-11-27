<script lang="ts">
    let { showHistory, toggleHistory } = $props<{
        showHistory: boolean;
        toggleHistory: () => void;
    }>();
</script>

<div class="bg-white border-t border-gray-200">
    <button
        type="button"
        onclick={toggleHistory}
        class="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition"
    >
        <div class="flex items-center gap-2">
            <img src="/icons/history.svg" alt="history" class="w-5 h-6" />
            <span class="font-medium text-gray-900">
                Submission History (3)
            </span>
        </div>

        {#if showHistory}
            <img src="/icons/chevron-up.svg" alt="" class="w-5 h-5" />
        {:else}
            <img
                src="/icons/chevron-up.svg"
                alt=""
                class="w-5 h-5 rotate-180"
            />
        {/if}
    </button>
</div>
