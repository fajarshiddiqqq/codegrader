<script lang="ts">
    import { page } from "$app/state";

    let isActive = $derived((menu: string) => {
        return page.url.pathname.split("/")[3] === menu;
    });

    let { isOpen = true, toggleSidebar } = $props();
</script>

<nav class={`border-r border-gray-200 bg-white py-8 flex flex-col justify-between duration-300 transition-all h-full w-[55px] ${isOpen ? "xl:w-80" : "xl:w-[55px]"}`}>
    <div>
        <div class="w-full xl:flex justify-between px-4 mb-4 hidden">
            <h1 class={`text-xl font-bold text-gray-800 hidden ${isOpen ? "xl:block" : "xl:hidden"}`}>Teacher Dashboard</h1>
            <button
                class="cursor-pointer transform transition-transform duration-300 hidden xl:block "
                onclick={toggleSidebar}
            >
                <img
                    src="/icons/sidebar.svg"
                    alt="toggle"
                    class="min-w-6 h-6"
                />
            </button>
        </div>

        <hr class={`px-4 border-gray-200 ${isOpen ? "mb-4" : "mb-0"}`} />

        <!-- Management Section -->
        <div class="mb-8">
            <h2 class={`text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2 hidden ${isOpen ? "xl:block" : "xl:hidden"}`}>
                Management
            </h2>
            <a
                href="/dashboard/teacher/questions"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors {isActive('questions')
                    ? 'bg-gray-100 border-l-4 border-primary font-medium'
                    : ''}"
            >
                <img src="/icons/book.svg" alt="book" class={`inline min-w-5 h-5 mr-2 mb-1 ${isOpen ? "xl:hidden" : "xl:inline"}`} />
                <span class={`hidden ${isOpen ? "xl:inline" : "xl:hidden"}`}>Questions</span>
            </a>
            <a
                href="/dashboard/teacher/courses"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors {isActive('courses')
                    ? 'bg-gray-100 border-l-4 border-primary font-medium'
                    : ''}"
            >   
                <img src="/icons/course.svg" alt="course" class={`inline min-w-5 h-5 mr-2 mb-1 ${isOpen ? "xl:hidden" : "xl:inline"}`} />
                <span class={`hidden ${isOpen ? "xl:inline" : "xl:hidden"}`}>Courses</span>
            </a>
            <a
                href="/dashboard/teacher/account"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors {isActive('account')
                    ? 'bg-gray-100 border-l-4 border-primary font-medium'
                    : ''}"
            >
                <img src="/icons/account.svg" alt="account" class={`inline min-w-5 h-5 mr-2 mb-1 ${isOpen ? "xl:hidden" : "xl:inline"}`} />
                <span class={`hidden ${isOpen ? "xl:inline" : "xl:hidden"}`}>Account</span>
            </a>
        </div>
    </div>
    <form method="POST" action="/logout" class="w-full">
        <button class="px-6 py-2 hover:bg-gray-100 transition w-full text-start cursor-pointer font-bold flex justify-center items-center" type="submit">
            <img src="/icons/logout.svg" alt="logout" class={`inline min-w-5 h-5 mr-2 mb-1 ${isOpen ? "xl:hidden" : "xl:inline"}`} />
            <span class={`hidden ${isOpen ? "xl:inline" : "xl:hidden"}`}>Logout</span>
        </button>
    </form>
</nav>
