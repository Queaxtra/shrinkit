<script lang="ts">
    const items = [
        { name: 'File Upload Limit', shrinkit: 'Unlimited', others: 'Limited' },
        { name: 'File Storage', shrinkit: 'Not stored', others: 'Stored' },
        { name: 'Account Required', shrinkit: 'No', others: 'Yes' },
        { name: 'Maximum File Size', shrinkit: '500 MB', others: 'Varies' },
        { name: 'File Types', shrinkit: 'Images only', others: 'Various' },
    ];
</script>

<div class="container mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">Shrinkit vs Others</h2>
    <div class="overflow-x-auto rounded-xl">
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-cRed text-white">
                    <th class="p-3 text-left">Feature</th>
                    <th class="p-3 text-left">Shrinkit</th>
                    <th class="p-3 text-left">Other Services</th>
                </tr>
            </thead>
            <tbody>
                {#each items as item, i}
                <tr class={i % 2 === 0 ? 'bg-cBlack/5' : 'bg-white'}>
                    <td class="border border-cBlack/10 p-3">{item.name}</td>
                    <td class="border border-cBlack/10 p-3">
                        <span class="flex items-center">
                            <i class="ri-check-line text-green-500 mr-2"></i>
                            {item.shrinkit}
                        </span>
                    </td>
                    <td class="border border-cBlack/10 p-3">
                        <span class="flex items-center">
                            <i class="ri-close-line text-red-500 mr-2"></i>
                            {item.others}
                        </span>
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
