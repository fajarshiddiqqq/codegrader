<script>
    import { enhance } from "$app/forms";

    let loading = $state(false);
    let message = $state("");
</script>

<form
    method="POST"
    class="py-24 px-8 md:px-24 w-full col-span-5 xl:col-span-3 bg-white"
    use:enhance={() => {
        loading = true;
        message = "";
        return async ({ update, result }) => {
            await update();
            loading = false;
            if (result.type === 'failure') {
                message = result.data?.error || "Login failed. Please try again.";
                return;
            }
        };
    }}
>
    <div class="mb-8">
        <h1 class="text-5xl mb-3 font-serif text-gray-700">Learn. Submit.</h1>
        <h1 class="text-5xl mb-3 font-serif text-gray-700">Get AI Feedback.</h1>
    </div>

    {#if message}
        <div class="mb-4 p-3 rounded-md border border-red-500 bg-red-100 text-red-700">
            {message}
        </div>
    {/if}

    <div class="mb-6 flex flex-col gap-2 w-full">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300"
            required
            disabled={loading}
            autocomplete="email"
        />
    </div>

    <div class="mb-8 flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center">
            <label for="password">Password</label>
            <a
                href="/forgot-password"
                class="italic text-gray-700 cursor-pointer"
                tabindex="-1"
            >
                Forgot password?
            </a>
        </div>

        <div class="relative">
            <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300 w-full pr-12"
                required
                disabled={loading}
                autocomplete="current-password"
            />
        </div>
    </div>

    <button
        type="submit"
        class="w-full bg-primary text-white rounded-md px-4 py-3 font-bold hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
    >
        {loading ? "Signing in..." : "Sign in"}
    </button>

    <p class="mt-6 text-center text-gray-600">
        Don't have an account?
        <a class="text-primary font-semibold cursor-pointer" href="/register">
            Sign up
        </a>
    </p>

    <div class="flex items-center justify-center my-6">
        <hr class="w-full border-gray-300" />
        <p class="text-center text-gray-500 px-4">or</p>
        <hr class="w-full border-gray-300" />
    </div>

    <button
        type="button"
        class="w-full bg-gray-200 text-black hover:bg-gray-200/90 hover:cursor-pointer rounded-full px-8 py-3 transition"
        onclick={() => {
            alert("Google sign in not implemented yet");
        }}
    >
        Sign in with Google
    </button>
</form>
