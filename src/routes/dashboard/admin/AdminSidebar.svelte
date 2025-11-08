<script lang="ts">
    import { page } from "$app/state";

    let isActive = $derived((menu: string) => {
        return page.url.pathname.split("/")[3] === menu;
    });
</script>

<nav
    class="w-80 border-r border-slate-200 bg-white py-8 h-full flex flex-col justify-between"
>
    <div>
        <h1 class="text-xl font-bold text-gray-800 px-4 mb-4">Admin Dashboard</h1>
        <!-- Management Section -->
        <div class="mb-8">
            <h2
                class="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2"
            >
                Management
            </h2>
            <a
                href="/dashboard/admin/users"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-slate-100 transition-colors {isActive(
                    'users'
                )
                    ? 'bg-gray-100 border-l-4 border-primary font-medium'
                    : ''}"
            >
                Users
            </a>
        </div>

        <!-- System Section -->
        <div class="mb-8">
            <h2
                class="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2"
            >
                System
            </h2>
            <a
                href="/dashboard/admin/settings"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-slate-100 transition-colors {isActive(
                    'settings'
                )
                    ? 'bg-slate-100 border-l-4 border-blue-500 font-medium'
                    : ''}"
            >
                Settings
            </a>
            <a
                href="/dashboard/admin/logs"
                class="block w-full px-4 py-2 text-gray-700 hover:bg-slate-100 transition-colors {isActive(
                    'logs'
                )
                    ? 'bg-slate-100 border-l-4 border-blue-500 font-medium'
                    : ''}"
            >
                Logs
            </a>
        </div>
    </div>
    <form method="POST" action="/logout" class="w-full">
        <button
            class="px-6 py-2 hover:bg-gray-100 transition w-full text-start cursor-pointer font-bold"
            type="submit"
        >
            Logout
        </button>
    </form>
</nav>
