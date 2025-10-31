<script>
    let mobileMenuOpen = $state(false);
</script>

<nav class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <div class="shrink-0">
                <span
                    class="text-2xl font-bold bg-linear-to-r text-primary bg-clip-text"
                    >CodeGrader</span
                >
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
            </div>
        </div>
    {/if}
</nav>