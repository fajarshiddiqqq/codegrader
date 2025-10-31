<script>
    let searchQuery = $state("");
</script>

<div class="text-center mb-32">
    <h1
        class="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
    >
        Master Coding with AI That<br />
        <span
            class="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >Grades Like a Teacher</span
        >
    </h1>
    <p class="text-xl md:text-2xl text-slate-600 mb-10">
        Search any topic. Get instant feedback. Learn faster.
    </p>

    <!-- Search Bar -->
    <div class="max-w-3xl mx-auto mb-8">
        <div class="relative">
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search Python loops, JavaScript promises, SQL joins..."
                class="w-full px-8 py-5 text-lg rounded-full border-2 border-slate-200 focus:border-indigo-500 focus:outline-none shadow-lg transition-all"
            />
            <div
                class="absolute right-8 top-1/2 bg-white p-2 -translate-y-1/2 text-slate-400 font-medium"
            >
                Press Enter
            </div>
        </div>
    </div>

    <!-- Primary CTA -->
    <!-- <a href="/login" class="inline-block">
        <button
            class="px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 text-white text-xl font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
            Start Practicing Now
        </button>
    </a> -->
    <button
        onclick={() => alert("Start Practicing Now clicked!")}
        class="px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 text-white text-xl font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-200"
    >
        Start Practicing Now
    </button>
</div>
