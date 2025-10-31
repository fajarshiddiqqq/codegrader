<script>
    let { rows } = $props();
    
    // Get all unique column names from the rows
    const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
    
    // Limit preview to first 10 rows
    const previewRows = rows.slice(0, 10);
    const hasMore = rows.length > 10;
</script>

<div class="mt-6">
    <div class="flex justify-between items-center mb-3">
        <h2 class="text-primary text-xl font-semibold">Preview</h2>
        <p class="text-sm text-gray-600">
            Showing {previewRows.length} of {rows.length} row{rows.length !== 1 ? 's' : ''}
        </p>
    </div>
    
    <div class="border border-gray-300 rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-100 border-b border-gray-300">
                    <tr>
                        {#each columns as col}
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 capitalize">
                                {col}
                            </th>
                        {/each}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each previewRows as row, i}
                        <tr class="hover:bg-gray-50 transition-colors">
                            {#each columns as col}
                                <td class="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={row[col]}>
                                    {row[col] || '-'}
                                </td>
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    
    {#if hasMore}
        <p class="text-xs text-gray-500 mt-2 italic">
            + {rows.length - 10} more rows not shown in preview
        </p>
    {/if}
</div>