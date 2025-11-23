<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import CourseContent from "./CourseContent.svelte";
    import QuestionContent from "./QuestionContent.svelte";
    let { data } = $props();
    let activeTab = $state('courses');
</script>

<div class="flex flex-col min-h-screen bg-gray-100">
    <Navbar {data} />
    <div class="max-w-7xl mx-auto px-6 py-8 w-full">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-4xl font-semibold text-gray-800 mb-2">Explore</h1>
            <p class="text-lg text-gray-500">Browse public courses and questions. Preview content, then log in to start learning and get AI feedback.</p>
        </div>

        <!-- Content Tab -->
        <div class="flex gap-6 mb-6 border-b border-gray-300">
            <button 
                class="tab" 
                class:active={activeTab === 'courses'}
                onclick={() => activeTab = 'courses'}
            >
                Courses
            </button>
            <button 
                class="tab" 
                class:active={activeTab === 'questions'}
                onclick={() => activeTab = 'questions'}
            >
                Questions
            </button>
        </div>

        <!-- Tab Content -->
        {#if activeTab === 'courses'}
            <div>
                <CourseContent {data} />
            </div>
        {:else}
            <div>
                <QuestionContent {data} />
            </div>
        {/if}

    </div>
</div>

<style lang="postcss">
    @reference "$lib/style/app.css";
    
    .tab {
        @apply py-2.5 cursor-pointer text-[17px] text-gray-500 relative bg-transparent border-none;
    }

    .tab.active {
        @apply text-gray-900 font-semibold;
    }

    .tab.active::after {
        content: "";
        @apply absolute left-0 -bottom-px w-full h-0.5 bg-primary rounded-full;
    }
</style>