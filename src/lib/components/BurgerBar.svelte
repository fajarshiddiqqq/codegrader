<script>
    export let isOpen = false;
    export let toggle = () => {};
</script>

<button
    class="ml-auto md:hidden relative w-6 h-6 flex items-center justify-center cursor-pointer"
    onclick={toggle}
    aria-label="Toggle menu"
>
    <span
        class="absolute h-0.5 w-6 bg-primary transition-transform duration-300"
        class:rotate-45={isOpen}
        class:translate-y-0={isOpen}
        class:-translate-y-2={!isOpen}
    ></span>
    <span
        class="absolute h-0.5 w-6 bg-primary transition-opacity duration-300"
        class:opacity-0={isOpen}
    ></span>
    <span
        class="absolute h-0.5 w-6 bg-primary transition-transform duration-300"
        class:-rotate-45={isOpen}
        class:translate-y-0={isOpen}
        class:translate-y-2={!isOpen}
    ></span>
</button>
