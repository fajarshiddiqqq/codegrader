<script lang="ts">
    let mobileMenuOpen = $state(false);
</script>

<nav
    class="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="shrink-0">
                <span
                    class="text-2xl font-bold bg-linear-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"
                >
                    CodeGrader
                </span>
            </div>

            <!-- Desktop Nav (future) -->
            <div class="hidden md:flex items-center gap-6">
                <a
                    href="/student"
                    class="text-gray-700 hover:text-blue-600 font-medium transition"
                    >Dashboard</a
                >
                <a
                    href="/student/1"
                    class="text-gray-700 hover:text-blue-600 font-medium transition"
                    >Questions</a
                >
            </div>

            <!-- Mobile Menu Button -->
            <button
                onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
                class="md:hidden p-2 text-gray-600 hover:text-gray-900 transition"
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

    <!-- Mobile Menu -->
    {#if mobileMenuOpen}
        <div class="md:hidden border-t border-gray-200 bg-white">
            <div class="px-4 py-4 space-y-3">
                <a
                    href="/student"
                    class="block text-gray-700 hover:text-blue-600 font-medium"
                    >Dashboard</a
                >
                <a
                    href="/student/1"
                    class="block text-gray-700 hover:text-blue-600 font-medium"
                    >Questions</a
                >
            </div>
        </div>
    {/if}
</nav>
