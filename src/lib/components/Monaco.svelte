<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import loader from "@monaco-editor/loader";

    export let value = "";
    export let language = "python";
    export let onChange = (v: string) => {};

    let container;
    let editor;

    onMount(async () => {
        const monaco = await loader.init();

        editor = monaco.editor.create(container, {
            value,
            language,
            theme: "vs-dark",
            automaticLayout: true,
            minimap: { enabled: false },
            lineHeight: 30,
        });

        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });
    });

    onDestroy(() => editor?.dispose());
</script>

<div bind:this={container} class="w-full h-full"></div>
