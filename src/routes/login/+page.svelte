<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import LoginForm from "./LoginForm.svelte";
</script>

<div class="flex flex-col h-screen">
    <Navbar />
    <main class="flex-1 flex justify-center items-center md:bg-accent">
        <div class="w-full md:shadow-xl max-w-3xl lg:max-w-5xl xl:max-w-7xl grid grid-cols-5">
            <LoginForm />
            <div class="hidden xl:block col-span-2 relative">
                <div class="absolute inset-0 bg-black/30"></div>
                <img
                    src="/images/login-banner.webp"
                    alt=""
                    class="w-full h-full object-cover"
                />
                <h1 class="absolute right-5 bottom-5 text-xl text-white font-bold text-center">
                    CodeGrader.
                </h1>
            </div>
        </div>
    </main>
</div>
