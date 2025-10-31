<script>
    let mobileMenuOpen = $state(false);
</script>

<nav
    class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="shrink-0">
                <span
                    class="text-2xl font-bold bg-linear-to-r bg-clip-text text-primary"
                    >CodeGrader</span
                >
            </div>
            <div class="hidden md:flex space-x-4">
                <!-- <a
                    href="/login"
                    class="px-4 py-2 text-primary font-medium transition-colors"
                    >Start Exploring</a
                > -->
                <button
                    onclick={() => alert("Start Exploring clicked!")}
                    class="px-4 py-2 text-primary font-medium transition-colors"
                    >Start Exploring</button
                >
                <!-- <a
                    href="/s/demo123"
                    class="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
                    >Try Demo</a
                > -->
                <button
                    class="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
                    onclick={() => {
                        alert("Demo link clicked!");
                    }}
                >
                    Try Demo
                </button>
            </div>
            <button
                onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
                class="md:hidden p-2 text-slate"
                aria-label="Toggle Mobile Menu"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
    {#if mobileMenuOpen}
        <div class="md:hidden border-t border-slate-200 bg-white">
            <div class="px-4 py-4 space-y-3">
                <!-- <a
                    href="/teacher"
                    class="block px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                    >Start Exploring</a
                >
                <a
                    href="/s/demo123"
                    class="block px-4 py-2 text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg"
                    >Try Demo</a
                > -->
                <button
                    onclick={() => alert("Start Exploring clicked!")}
                    class="block w-full px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                    Start Exploring
                </button>
                <button
                    onclick={() => {
                        alert("Demo link clicked!");
                    }}
                    class="block w-full px-4 py-2 text-center bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg"
                >
                    Try Demo
                </button>
            </div>
        </div>
    {/if}
</nav>
