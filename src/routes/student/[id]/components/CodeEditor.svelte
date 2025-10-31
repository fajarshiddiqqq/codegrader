<!-- src/routes/student/[id]/components/CodeEditor.svelte -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import loader from "@monaco-editor/loader";

    let { value = $bindable(), language = "python" } = $props();

    // Live cursor
    let cursorPos = $state("Line 1, Col 1");

    let container: HTMLDivElement;
    let editor: any;

    $effect(() => {
        if (editor && value !== editor.getValue()) {
            editor.setValue(value);
        }
    });

    onMount(async () => {
        if (import.meta.env.DEV) {
            loader.config({
                paths: { vs: "/node_modules/monaco-editor/min/vs" },
            });
        } else {
            loader.config({
                paths: {
                    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.54.0/min/vs",
                },
            });
        }
        const monaco = await loader.init();

        editor = monaco.editor.create(container, {
            value,
            language,
            theme: "vs-dark",
            fontSize: 15,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
            fontFamily: "'Fira Code', monospace",
        });

        // Live cursor
        editor.onDidChangeCursorPosition((e: any) => {
            cursorPos = `Line ${e.position.lineNumber}, Col ${e.position.column}`;
        });

        // Editor → parent
        editor.onDidChangeModelContent(() => {
            value = editor.getValue();
        });

        onDestroy(() => editor?.dispose());
    });
</script>

<div
    class="relative h-full w-full min-h-0 bg-gray-900 rounded-xl overflow-hidden"
>
    <!-- NAMED SLOT: header -->
    <slot name="header" {cursorPos} />

    <!-- Monaco container -->
    <div bind:this={container} class="h-full w-full"></div>
</div>
