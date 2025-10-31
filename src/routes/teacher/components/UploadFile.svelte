<script lang="ts">
    import Papa from "papaparse";
    import PreviewTable from "./PreviewTable.svelte";

    // Update props to expose both success and file
    let { 
        onSuccess = $bindable(false),
        onReset = () => {},
        file = $bindable(null)
    } = $props();

    let error = $state("");
    let success = $state(false);
    let rows = $state<any[]>([]);

    const required = ["title", "language", "description", "rubric"];
    const optional = ["expected_input", "expected_output", "difficulty"];

    function handleSelect(e: Event) {
        const t = e.target as HTMLInputElement;
        if (t.files?.length) checkFile(t.files[0]);
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        const f = e.dataTransfer?.files?.[0];
        if (f) checkFile(f);
    }

    function handleDragOver(e: DragEvent) {
        e.preventDefault();
    }

    function checkFile(f: File) {
        reset();
        if (!f.name.toLowerCase().endsWith(".csv")) {
            error = "Invalid file type (.csv only)";
            return;
        }
        file = f;
        validateCSV();
    }

    function validateCSV() {
        if (!file) return;
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (res: any) => {
                const cols = (res.meta.fields ?? []).map((c: string) =>
                    c.trim().toLowerCase()
                );
                const miss = required.filter((c: string) => !cols.includes(c));
                const extra = cols.filter(
                    (c: string) => !required.concat(optional).includes(c)
                );
                if (miss.length) error = "Missing columns: " + miss.join(", ");
                else if (extra.length)
                    error = "Unknown columns: " + extra.join(", ");
                else {
                    rows = res.data;
                    success = true;
                    onSuccess = true;
                }
            },
        });
    }

    function reset() {
        file = null;
        error = "";
        success = false;
        onSuccess = false;
        rows = [];
        const input = document.getElementById("fileInput") as HTMLInputElement;
        if (input) input.value = "";

        onReset();
    }
</script>


<button
    class="border-2 border-dashed border-gray-400 rounded-xl p-10 cursor-pointer hover:border-primary flex flex-col items-center space-y-4 w-full"
    ondrop={handleDrop}
    ondragover={handleDragOver}
    onclick={() => document.getElementById("fileInput")?.click()}
>
    <img src="/icons/file.svg" alt="file" class="w-10" />
    <p class="text-sm text-gray-700">
        Drag and drop CSV here or <span class="text-amber-700 font-medium"
            >Click to Browse</span
        >
    </p>
    <input
        id="fileInput"
        type="file"
        accept=".csv"
        class="hidden"
        onchange={handleSelect}
    />
</button>

<a
    href="/CodeGrader%20Teacher%20CSV%20Example.csv"
    download
    class="text-primary text-sm italic"
>
    Download CSV Template
</a>

{#if file}
    <div
        class="bg-gray-100 border border-gray-300 p-3 rounded mt-4 flex justify-between items-center"
    >
        <div class="flex items-center">
            <img
                src="/icons/file-2.svg"
                alt="file"
                class="w-6 inline-block mr-3"
            />
            <div>
                <p class="text-sm font-medium text-gray-700">{file.name}</p>
                <p class="text-xs text-gray-500">
                    {Math.round(file.size / 1024)} KB
                </p>
            </div>
        </div>
        <button onclick={reset}>
            <img
                src="/icons/close.svg"
                alt="close"
                class="w-6 ml-2 cursor-pointer"
            />
        </button>
    </div>
{/if}

{#if error}
    <div class="bg-red-100 border border-red-300 p-3 rounded mt-4 text-red-700">
        {error}
    </div>
{/if}

{#if success}
    <PreviewTable {rows} />
{/if}

