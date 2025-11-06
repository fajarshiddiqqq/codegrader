<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";

    let loading = $state(false);
    let showPassword = $state(false);
    let showConfirmPassword = $state(false);

    let selectedRole = $derived(page.url.searchParams.get("role") || "");

    function handleSubmit(e: Event) {
        e.preventDefault();
        loading = true;
        // Handle registration logic here
        setTimeout(() => {
            loading = false;
            alert("Registration not implemented yet");
        }, 2000);
    }

    function goBack() {
        goto("/register");
    }
</script>

<form
    onsubmit={handleSubmit}
    class="py-24 px-8 md:px-24 w-full col-span-5 xl:col-span-3 bg-white md:shadow-lg relative grid grid-cols-2 gap-4"
>
    <a
        href="/register"
        onclick={(e) => {
            e.preventDefault();
            goBack();
        }}
        class="absolute top-8 left-8 text-primary/80 font-semibold flex items-center hover:text-primary transition-all group"
    >
        <img
            src="/icons/caret-left-primary.svg"
            alt="caret-left"
            class="inline w-5 h-5 mr-1 opacity-80 group-hover:opacity-100 transition-all group-hover:-translate-x-0.5"
        />
        Back
    </a>

    <div class="mb-8 col-span-2 text-center">
        <h1 class="text-5xl mb-3 font-serif text-gray-700">
            Create your {selectedRole === "teacher" ? "Teacher" : "Student"} account
        </h1>
    </div>

    <div class="mb-2 flex flex-col gap-2 w-full col-span-2 md:col-span-1">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            name="username"
            placeholder="johndoe"
            class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300"
            required
            disabled={loading}
        />
    </div>

    <div class="mb-2 flex flex-col gap-2 w-full col-span-2 md:col-span-1">
        <label for="fullname">Full Name</label>
        <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="John Doe"
            class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300"
            required
            disabled={loading}
        />
    </div>

    <div class="mb-2 flex flex-col gap-2 w-full col-span-2">
        <label for="email">Email Address</label>
        <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300"
            required
            disabled={loading}
        />
    </div>

    <div class="mb-2 flex flex-col gap-2 w-full col-span-2 md:col-span-1">
        <label for="password">Password</label>
        <div class="relative">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300 w-full pr-12"
                required
                disabled={loading}
            />
            <button
                type="button"
                onclick={() => (showPassword = !showPassword)}
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabindex="-1"
            >
                <img
                    src={showPassword
                        ? "/icons/eye-open.svg"
                        : "/icons/eye-close.svg"}
                    alt={showPassword ? "Show password" : "Hide  password"}
                    class="w-6"
                />
            </button>
        </div>
    </div>

    <div class="mb-4 flex flex-col gap-2 w-full col-span-2 md:col-span-1">
        <label for="confirmPassword">Confirm Password</label>
        <div class="relative">
            <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                class="bg-white rounded-md px-6 py-2 text-lg placeholder:text-base border border-gray-300 w-full pr-12"
                required
                disabled={loading}
            />
            <button
                type="button"
                onclick={() => (showConfirmPassword = !showConfirmPassword)}
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabindex="-1"
            >
                <img
                    src={showConfirmPassword
                        ? "/icons/eye-open.svg"
                        : "/icons/eye-close.svg"}
                    alt={showConfirmPassword
                        ? "Show password"
                        : "Hide  password"}
                    class="w-6"
                />
            </button>
        </div>
    </div>

    <button
        type="submit"
        class="w-full bg-primary text-white rounded-md px-4 py-3 font-bold hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed col-span-2"
        disabled={loading}
    >
        {loading ? "Creating account..." : "Create account"}
    </button>

    <p class="mt-2 text-center text-gray-600 col-span-2">
        Already have an account?
        <a class="text-primary font-semibold cursor-pointer" href="/login">
            Sign in
        </a>
    </p>

    <div class="flex items-center justify-center my-2 col-span-2">
        <hr class="w-full border-gray-300" />
        <p class="text-center text-gray-500 px-4">or</p>
        <hr class="w-full border-gray-300" />
    </div>

    <button
        type="button"
        class="w-full bg-gray-200 text-black hover:bg-gray-200/90 hover:cursor-pointer rounded-full px-8 py-3 transition col-span-2"
        onclick={() => {
            alert("Google sign up not implemented yet");
        }}
    >
        Sign up with Google
    </button>
</form>
