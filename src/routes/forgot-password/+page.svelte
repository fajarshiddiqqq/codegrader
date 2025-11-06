<script>
    import Navbar from "$lib/components/Navbar.svelte";

</script>
<!-- make not implemented notice -->
<Navbar />
<main class="h-screen w-full">
    <div class="flex flex-col justify-center items-center h-full bg-white px-4">
        <h1 class="text-3xl font-bold mb-4 text-gray-800">Forgot Password</h1>
        <p class="text-gray-600 mb-8 text-center">
            Password recovery is not implemented yet. Please contact support for assistance.
        </p>
        <a
            href="/login"
            class="bg-primary text-white px-6 py-3 rounded-md hover:bg-gray-700 transition"
        >
            Back to Login
        </a>
    </div>
</main>