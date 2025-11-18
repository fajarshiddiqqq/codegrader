<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    let token;

    $: token = $page.url.searchParams.get("token");

    if (token) {
        // Set cookie by making a POST to your SvelteKit API
        fetch("/api/oauth/set-token", {
            method: "POST",
            body: JSON.stringify({ token }),
            headers: { "Content-Type": "application/json" },
        }).then(() => {
            goto("/dashboard");
        });
    } else {
        goto("/login"); // fallback
    }
</script>

<p>Signing you in...</p>
