<script lang="ts">
    import UserTable from "./UserTable.svelte";
    let { data } = $props();
    let q = $state("");
    let activeMainTab = $state("students");

    function search() {
        console.log(q);
    }

    function setMainTab(tab: string) {
        activeMainTab = tab;
    }

    // Use $derived for reactive filtering
    let tableData = $derived(
        data[activeMainTab].filter(
            (u) =>
                u.username.toLowerCase().includes(q.toLowerCase()) ||
                u.fullname.toLowerCase().includes(q.toLowerCase()) ||
                u.email.toLowerCase().includes(q.toLowerCase())
        )
    );
</script>

<div class="p-8">
    <div class="flex items-center justify-between mb-3">
        <h1 class="text-2xl font-medium capitalize">User Management</h1>
        <div class="relative">
            <label
                for="search"
                class="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer w-4 h-4"
            >
                <img src="/icons/search.svg" class="w-4 h-4" alt="search" />
            </label>

            <input
                id="search"
                bind:value={q}
                onkeydown={(e) => e.key === "Enter" && search()}
                placeholder="Search..."
                class="w-full pl-12 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
        </div>
    </div>

    <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
        <li>
            <button
                type="button"
                class="inline-block px-4 py-2 {activeMainTab === 'students'
                    ? 'text-primary active border-b-2 border-primary bg-gray-100'
                    : 'hover:text-primary hover:bg-gray-100'}"
                onclick={() => setMainTab("students")}
            >
                Students
            </button>
        </li>
        <li>
            <button
                type="button"
                class="inline-block px-4 py-2 {activeMainTab === 'teachers'
                    ? 'text-primary active border-b-2 border-primary bg-gray-100'
                    : 'hover:text-primary hover:bg-gray-100'}"
                onclick={() => setMainTab("teachers")}
            >
                Teachers
            </button>
        </li>
        <li>
            <button
                type="button"
                class="inline-block px-4 py-2 {activeMainTab === 'admins'
                    ? 'text-primary active border-b-2 border-primary bg-gray-100'
                    : 'hover:text-primary hover:bg-gray-100'}"
                onclick={() => setMainTab("admins")}
            >
                Admins
            </button>
        </li>
    </ul>

    <div class="my-4 flex items-center gap-3">
        <button
            class="text-sm bg-primary text-white font-medium px-3 py-1 rounded-md cursor-pointer"
            >+ Create</button
        >
    </div>
    {#if activeMainTab === "students" || activeMainTab === "teachers" || activeMainTab === "admins"}
        <UserTable users={tableData} />
    {/if}
</div>
