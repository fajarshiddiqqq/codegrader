<script lang="ts">
    import { fade, fly, scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    interface Props {
        feedback: any;
        isSubmitting: boolean;
    }
    
    let { feedback, isSubmitting }: Props = $props();
    
    function getScoreColor(score: number) {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    }
    
    function getScoreBgColor(score: number) {
        if (score >= 90) return 'bg-green-50 border-green-200';
        if (score >= 70) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    }
</script>

<div class="bg-gray-50 rounded-xl border border-gray-200 p-6 flex-1 flex flex-col min-h-0 overflow-hidden">
    <h2 class="text-lg font-semibold text-gray-800 mb-3">Feedback</h2>
    
    <div class="flex-1 overflow-auto">
        {#if isSubmitting}
            <div 
                class="flex flex-col items-center justify-center h-full gap-4"
                in:fade={{ duration: 200 }}
            >
                <div class="relative">
                    <!-- Animated AI brain icon -->
                    <svg class="w-16 h-16 text-purple-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                    </svg>
                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full animate-ping"></div>
                </div>
                <div class="text-center">
                    <p class="text-gray-700 font-medium mb-1">Analyzing your code...</p>
                    <p class="text-gray-500 text-sm">AI is generating feedback</p>
                </div>
                
                <!-- Progress dots -->
                <div class="flex gap-2">
                    <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
        {:else if feedback}
            <div 
                class="space-y-4"
                in:fly={{ y: 20, duration: 400, easing: cubicOut }}
            >
                <!-- Score Badge -->
                <div 
                    class="border-2 rounded-lg p-4 {getScoreBgColor(feedback.score)}"
                    in:scale={{ duration: 500, delay: 100, easing: cubicOut, start: 0.8 }}
                >
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700">Your Score</span>
                        <span class="text-3xl font-bold {getScoreColor(feedback.score)}">
                            {feedback.score}
                        </span>
                    </div>
                    <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                            class="h-2 rounded-full transition-all duration-1000 ease-out"
                            class:bg-green-600={feedback.score >= 90}
                            class:bg-yellow-500={feedback.score >= 70 && feedback.score < 90}
                            class:bg-red-500={feedback.score < 70}
                            style="width: {feedback.score}%"
                        ></div>
                    </div>
                </div>
                
                <!-- AI Comments -->
                <div 
                    class="bg-white border border-gray-200 rounded-lg p-4"
                    in:fly={{ y: 10, duration: 400, delay: 200, easing: cubicOut }}
                >
                    <p class="text-sm text-gray-700 leading-relaxed">
                        {feedback.aiComments}
                    </p>
                </div>
                
                <!-- Test Results -->
                <div 
                    class="space-y-2"
                    in:fly={{ y: 10, duration: 400, delay: 300, easing: cubicOut }}
                >
                    <p class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Test Cases</p>
                    {#each feedback.testResults as test, i}
                        <div 
                            class="flex items-start gap-2 text-sm p-2 rounded"
                            in:fly={{ x: -10, duration: 300, delay: 350 + (i * 50), easing: cubicOut }}
                        >
                            {#if test.passed}
                                <svg class="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                            {:else}
                                <svg class="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            {/if}
                            <div class="flex-1">
                                <p class="font-medium text-gray-700">{test.name}</p>
                                <p class="text-xs text-gray-500 font-mono mt-0.5">{test.details}</p>
                            </div>
                        </div>
                    {/each}
                </div>
                
                <!-- Strengths -->
                {#if feedback.strengths.length > 0}
                    <div 
                        class="bg-green-50 border border-green-200 rounded-lg p-3"
                        in:fly={{ y: 10, duration: 400, delay: 500, easing: cubicOut }}
                    >
                        <p class="text-xs font-semibold text-green-800 mb-2">✓ Strengths</p>
                        <ul class="space-y-1">
                            {#each feedback.strengths as strength}
                                <li class="text-sm text-green-700 flex items-start gap-2">
                                    <span class="text-green-600 mt-1">•</span>
                                    <span>{strength}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
                
                <!-- Improvements -->
                {#if feedback.improvements.length > 0}
                    <div 
                        class="bg-blue-50 border border-blue-200 rounded-lg p-3"
                        in:fly={{ y: 10, duration: 400, delay: 600, easing: cubicOut }}
                    >
                        <p class="text-xs font-semibold text-blue-800 mb-2">💡 Suggestions</p>
                        <ul class="space-y-1">
                            {#each feedback.improvements as improvement}
                                <li class="text-sm text-blue-700 flex items-start gap-2">
                                    <span class="text-blue-600 mt-1">•</span>
                                    <span>{improvement}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </div>
        {:else}
            <div class="flex items-center justify-center h-full text-center">
                <div>
                    <svg class="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-gray-500 italic text-sm">
                        Submit your code to see your score and AI feedback.
                    </p>
                </div>
            </div>
        {/if}
    </div>
</div>