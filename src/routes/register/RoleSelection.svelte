<script lang="ts">
    import { goto } from '$app/navigation';

    let hoveredRole = $state<string | null>(null);

    function selectRole(role: string) {
        goto(`/register?role=${role}`);
    }
</script>

<div class="py-24 px-8 md:px-24 w-full col-span-5 xl:col-span-3 bg-white md:shadow-lg relative translate-y-[-16.6%]">
    <a
        href="/login"
        class="absolute top-8 left-8 text-primary/80 font-semibold flex items-center hover:text-primary transition-all group"
    >
        <img
            src="/icons/caret-left-primary.svg"
            alt="caret-left"
            class="inline w-5 h-5 mr-1 opacity-80 group-hover:opacity-100 transition-all group-hover:-translate-x-0.5"
        />
        Login
    </a>

    <div class="flex items-center flex-col mb-16 text-center">
        <div
            class="bg-linear-to-br from-primary to-primary/80 rounded-full w-20 h-20 flex justify-center items-center mb-6 shadow-md"
        >
            <span class="text-white font-bold text-lg">Logo</span>
        </div>
        <h1 class="font-bold text-4xl mb-3 text-gray-800">Welcome to CodeGrader</h1>
        <h2 class="font-normal text-lg text-gray-600">Please select your role to continue</h2>
    </div>

    <div class="flex flex-col gap-5 lg:flex-row">
        <button
            onclick={() => selectRole('teacher')}
            onmouseenter={() => hoveredRole = 'teacher'}
            onmouseleave={() => hoveredRole = null}
            class="group relative border-2 border-gray-300 px-8 py-6 lg:w-1/2 text-start transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
        >
            <div class="flex items-start gap-4">
                <div class="shrink-0 mt-1">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-primary transition-colors duration-300 flex items-center justify-center">
                        {#if hoveredRole === 'teacher'}
                            <div class="w-3 h-3 rounded-full bg-primary transition-all duration-300"></div>
                        {/if}
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary transition-colors">
                        Teacher
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Create and manage coding assignments for students
                    </p>
                </div>
            </div>
        </button>

        <button
            disabled
            onmouseenter={() => hoveredRole = 'student'}
            onmouseleave={() => hoveredRole = null}
            class="group relative border-2 border-gray-300 px-8 py-6 lg:w-1/2 text-start opacity-60 cursor-not-allowed"
        >
            <div class="flex items-start gap-4">
                <div class="shrink-0 mt-1">
                    <div class="w-6 h-6 rounded-full border-2 border-gray-400 transition-colors duration-300 flex items-center justify-center">
                        {#if hoveredRole === 'student'}
                            <div class="w-3 h-3 rounded-full bg-gray-400 transition-all duration-300"></div>
                        {/if}
                    </div>
                </div>
                <div class="flex-1">
                    <p class="text-xl font-semibold mb-2 text-gray-800 transition-colors">
                        Student
                    </p>
                    <p class="text-gray-600 leading-relaxed">
                        Practice programming and complete assignments
                    </p>
                </div>
            </div>
            
            {#if hoveredRole === 'student'}
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded whitespace-nowrap shadow-lg">
                    Under Maintenance
                    <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                </div>
            {/if}
        </button>
    </div>
</div>