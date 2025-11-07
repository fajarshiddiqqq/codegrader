<script>
    import { page } from "$app/state";
    import Navbar from "$lib/components/Navbar.svelte";
    import RegisterForm from "./RegisterForm.svelte";
    import RoleSelection from "./RoleSelection.svelte";

    let selectedRole = $derived(page.url.searchParams.get("role") || "");
</script>

<div class="flex flex-col h-screen">
    <Navbar />
    <main class="flex-1 flex justify-center items-center md:bg-accent">
        <div class="max-w-5xl px-4 sm:px-6 lg:px-12 xl:px-0 w-full">
            {#if selectedRole === "teacher" || selectedRole === "student"}
                <RegisterForm />
            {:else}
                <RoleSelection />
            {/if}
        </div>
    </main>
</div>
