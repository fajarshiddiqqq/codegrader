<script>
    let { data } = $props();
</script>

<div class="flex flex-col gap-6 items-center">
    <!-- top -->
    <div>
        <!-- search -->

        <!-- sort -->
    </div>

    <!-- list -->
    {#if data.courses.length === 0}
        <div class="bg-white border border-gray-200 rounded-xl py-8 px-12 flex flex-col items-center text-center">
            <div class="bg-gray-100 rounded-full p-4 mb-4">
                <img src="/icons/course.svg" alt="course icon" class="w-10 h-10 opacity-80" />
            </div>
            <p class="font-bold text-xl">No public courses available.</p>
            <p class="text-gray-600">Courses will appear here once they are published.</p>
        </div>
    {:else}
        <h1>hi.</h1>
    {/if}
</div>
