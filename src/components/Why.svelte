<script lang="ts">
    const items = [
        { icon: 'ri-infinity-line', text: 'Unlimited file upload', description: 'You can upload as many files as you want, there is no limit.' },
        { icon: 'ri-delete-bin-line', text: 'Files are not stored on the system', description: 'After uploading your files, they will not be stored on the system.' },
        { icon: 'ri-user-unfollow-line', text: 'No account system', description: 'You do not need to create an account to upload files.' },
        { icon: 'ri-file-list-3-line', text: 'Maximum 500 MB file upload', description: 'You can upload files up to 500 MB.' },
        { icon: 'ri-image-line', text: 'Only image files', description: 'Only image files are accepted.' },
    ];
</script>

<div class="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    <h1 class="text-2xl font-bold">Why Shrinkit?</h1>
    <div class="col-span-1 md:col-span-2 lg:col-span-5">
        {#each items as item}
        <div class="border border-cBlack/10 rounded-xl p-4 flex flex-col mb-4">
            <div class="flex items-center mb-2">
                <i class="{item.icon} text-2xl mr-3 text-cRed"></i>
                <span>{item.text}</span>
            </div>
            <p class="text-sm text-cGray">{item.description}</p>
        </div>
        {/each}
    </div>
</div>

