<script lang="ts">
    const items = [
        { icon: 'ri-upload-cloud-line', title: 'Upload Your Image', description: 'Select or drag and drop your image file (up to 500 MB).' },
        { icon: 'ri-magic-line', title: 'Automatic Processing', description: 'Our system will automatically optimize and compress your image.' },
        { icon: 'ri-download-cloud-line', title: 'Download Optimized Image', description: 'Download your optimized image, ready for use.' },
        { icon: 'ri-delete-bin-line', title: 'Automatic Deletion', description: 'Your original and processed images are immediately deleted from our servers.' },
    ];
</script>

<div class="container mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">How It Works</h2>
    <div class="relative">
        {#each items as item, index}
        <div class="mb-8 flex items-center">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-cRed flex items-center justify-center z-10">
                <i class="{item.icon} text-2xl text-white"></i>
            </div>
            <div class="flex-grow ml-4 p-4 rounded-xl border border-cBlack/10">
                <h3 class="text-lg font-semibold mb-2">{item.title}</h3>
                <p class="text-sm text-cGray">{item.description}</p>
            </div>
        </div>
        {#if index !== items.length - 1}
            <div class="absolute left-6 top-12 bottom-0 w-0.5 bg-cRed -z-10" style="height: calc(100% - 3rem);"></div>
        {/if}
        {/each}
    </div>
</div>
