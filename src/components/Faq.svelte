<script lang="ts">
    const items = [
        { question: "How many files can I upload to Shrinkit?", answer: "You can upload an unlimited number of files to Shrinkit. There is no file upload limit." },
        { question: "How long are my uploaded files stored?", answer: "Shrinkit does not store your uploaded files. Your files are deleted immediately after uploading and processing, which increases your privacy and security." },
        { question: "Do I need to create an account to use Shrinkit?", answer: "No, you don't need to create an account to use Shrinkit. You can start uploading files right away without any registration." },
        { question: "What is the maximum file size?", answer: "The maximum file size you can upload to Shrinkit is 500 MB. This should be sufficient for most users." },
        { question: "What types of files can I upload?", answer: "Shrinkit currently only accepts image files. You can upload JPEG, PNG, GIF and other common image formats." }
    ];
</script>

<div class="container mx-auto py-10">
    <h2 class="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
    <div class="space-y-4">
        {#each items as item}
        <div class="border border-cBlack/10 rounded-xl overflow-hidden">
            <button class="w-full text-left p-4 flex justify-between items-center" on:click={() => item.isOpen = !item.isOpen}>
                <span class="font-semibold">{item.question}</span>
                <i class={`ri-arrow-down-s-line ${item.isOpen ? 'transform rotate-180' : ''} transition-transform duration-300`}></i>
            </button>
            {#if item.isOpen}
            <div class="p-4 bg-white">
                <p class="text-cGray">{item.answer}</p>
            </div>
            {/if}
        </div>
        {/each}
    </div>
</div>

