<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    interface Props {
        output: any;
        isRunning: boolean;
    }
    
    let { output, isRunning }: Props = $props();
    
    let displayedText = $state('');
    let typingComplete = $state(false);
    
    // Typewriter effect
    $effect(() => {
        if (output?.output) {
            displayedText = '';
            typingComplete = false;
            const text = output.output;
            let i = 0;
            
            const interval = setInterval(() => {
                if (i < text.length) {
                    displayedText += text[i];
                    i++;
                } else {
                    typingComplete = true;
                    clearInterval(interval);
                }
            }, 20);
            
            return () => clearInterval(interval);
        }
    });
</script>

<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex-1 flex flex-col min-h-0">
    <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-800">Output</h2>
        {#if output?.executionTime && typingComplete}
            <span 
                class="text-xs text-gray-500"
                in:fade={{ duration: 300 }}
            >
                {(output.executionTime / 1000).toFixed(2)}s
            </span>
        {/if}
    </div>
    
    <div class="flex-1 bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden min-h-0 relative">
        {#if isRunning}
            <div 
                class="absolute inset-0 flex flex-col items-center justify-center gap-3"
                in:fade={{ duration: 200 }}
            >
                <div class="relative">
                    <div class="w-12 h-12 border-4 border-blue-200 rounded-full"></div>
                    <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <p class="text-gray-600 font-medium">Running code...</p>
            </div>
        {:else if output}
            <div 
                class="p-4 h-full overflow-auto font-mono text-sm"
                in:fly={{ y: 10, duration: 300, easing: cubicOut }}
            >
                {#if output.success}
                    <pre class="text-gray-800 whitespace-pre-wrap">{displayedText}</pre>
                    {#if !typingComplete}
                        <span class="inline-block w-2 h-4 bg-gray-800 animate-pulse ml-1"></span>
                    {/if}
                {:else}
                    <div class="text-red-600">
                        <div class="flex items-start gap-2 mb-2">
                            <svg class="w-5 h-5 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                            </svg>
                            <div>
                                <p class="font-semibold mb-1">Error</p>
                                <pre class="whitespace-pre-wrap">{output.error}</pre>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="h-full flex items-center justify-center p-4">
                <div class="text-center">
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-500 italic">
                        Click "Run Code" to see results.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>