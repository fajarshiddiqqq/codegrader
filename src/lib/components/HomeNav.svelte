<script>
    let mobileMenuOpen = $state(false);
    let { data } = $props();
</script>

<nav
    class="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed w-full top-0 z-50"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <a href="/" class="shrink-0">
                <span
                    class="text-2xl font-bold bg-linear-to-r bg-clip-text text-primary"
                    >E-Learning</span
                >
            </a>
            <div class="hidden md:flex space-x-4">
                <a
                    href="/explore"
                    class="px-4 py-2 bg-primary text-white transition-all shadow-md hover:shadow-lg font-medium hover:scale-105"
                    >Explore</a
                >
                {#if data?.user}
                    <a
                        href="/dashboard"
                        class="px-4 py-2 text-gray-700 font-medium transition-colors"
                        >Dashboard</a
                    >
                {:else}
                    <a
                        href="/login"
                        class="px-4 py-2 text-gray-700 font-medium transition-colors"
                        >Login</a
                    >
                {/if}
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
        <div class="md:hidden border-t border-slate-200 bg-white w-full">
            <a
                href="/dashboard"
                class="block w-full text-center text-gray-700 hover:bg-gray-100 py-3"
            >
                Dashboard
            </a>
            <a
                href="/questions"
                class="block w-full text-center text-gray-700 hover:bg-gray-100 py-3 font-bold "
            >
                Start Exploring
            </a>
        </div>
    {/if}
</nav>
