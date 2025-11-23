<script>
    import BurgerBar from "./BurgerBar.svelte";

    let mobileMenuOpen = $state(false);
    let { data } = $props();
</script>

<nav
    class="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky w-full top-0 z-50"
>
    <div class="px-4 sm:px-6 lg:px-12">
        <div class="flex justify-between items-center h-16">
            <a class="shrink-0" href="/">
                <span
                    class="text-2xl font-bold bg-linear-to-r bg-clip-text text-primary"
                    >E-Learning</span
                >
            </a>

            <div class="hidden md:flex space-x-8">
                <a
                    href="/explore"
                    class="text-gray-700 hover:text-gray-700 font-medium transition"
                    >Explore</a
                >
                {#if data?.user}
                    <a
                        href="/dashboard"
                        class="text-gray-700 hover:text-gray-700 font-medium transition"
                        >Dashboard</a
                    >
                {:else}
                    <a
                        href="/login"
                        class="text-gray-700 hover:text-gray-700 font-medium transition"
                        >Login</a
                    >
                {/if}
            </div>

            <BurgerBar
                isOpen={mobileMenuOpen}
                toggle={() => (mobileMenuOpen = !mobileMenuOpen)}
            />
        </div>
    </div>
    {#if mobileMenuOpen}
        <div class="md:hidden border-t border-slate-200 bg-white w-full">
            <a
                href="/questions"
                class="block w-full text-center text-gray-700 hover:bg-gray-100 py-3"
            >
                Questions
            </a>
            <a
                href="/dashboard"
                class="block w-full text-center text-gray-700 hover:bg-gray-100 py-3"
            >
                Dashboard
            </a>
        </div>
    {/if}
</nav>
