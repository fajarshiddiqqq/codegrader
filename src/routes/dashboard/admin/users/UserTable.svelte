<script lang="ts">
    export let users: Array<{
        username: string;
        fullname: string;
        email: string;
        status: "active" | "inactive";
        joined: string;
    }>;
</script>

<div class="overflow-x-auto rounded-lg shadow-sm border border-gray-100">
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each users as user}
                <tr class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.fullname}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            {user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            {user.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                        <button class="bg-slate-200 text-gray-700 hover:bg-slate-300 px-2 py-1 rounded">Edit</button>
                        {#if user.status === 'active'}
                            <button class="bg-red-500 text-white hover:bg-red-600 px-2 py-1 rounded">Disable</button>
                        {:else}
                            <button class="bg-primary text-white px-2 py-1 rounded">Enable</button>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
