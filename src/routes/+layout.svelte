<script>
    import "$lib/style/app.css";
    import { user } from "$lib/stores/user";

    let { data, children } = $props();

    if (data?.user) {
        user.set(data.user);
    } else {
        user.set(null);
    }
</script>

{@render children()}

