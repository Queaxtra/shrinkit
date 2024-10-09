<script lang="ts">
    let inputFile: HTMLInputElement;
    let isUploading = false;
    let originalSize: number | null = null;
    let compressedSize: number | null = null;
    let compressedImageUrl: string | null = null;
    let originalFileName: string | null = null;

    function areaClick() {
        inputFile.click();
    }

    async function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (!file) return;

        isUploading = true;
        originalFileName = file.name;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to shrink image');
            }

            const result = await response.json();
            originalSize = result.originalSize;
            compressedSize = result.compressedSize;
            compressedImageUrl = result.compressedDataUrl;
        } catch (error) {
            console.error('Error shrinking image:', error);
            alert('Failed to shrink image. Please try again.');
        } finally {
            isUploading = false;
        }
    }

    function formatSize(bytes: number): string {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }

    function downloadImage() {
        if (compressedImageUrl) {
            const link = document.createElement('a');
            link.href = compressedImageUrl;
            link.download = `shrinkit_${originalFileName}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
</script>

<div class="bg-gradient-to-br from-cRed to-red-700 text-white rounded-xl overflow-hidden">
    <div class="container mx-auto py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
                <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">Welcome to Shrinkit</h1>
                <p class="text-lg mb-6 opacity-90">Fast, secure, and easy image uploading</p>
                <ul class="mb-6 space-y-3">
                    <li class="flex items-center">
                        <i class="ri-check-line mr-3 text-xl"></i>
                        <span class="text-sm sm:text-base">Unlimited uploads</span>
                    </li>
                    <li class="flex items-center">
                        <i class="ri-check-line mr-3 text-xl"></i>
                        <span class="text-sm sm:text-base">No registration required</span>
                    </li>
                    <li class="flex items-center">
                        <i class="ri-check-line mr-3 text-xl"></i>
                        <span class="text-sm sm:text-base">No account system</span>
                    </li>
                </ul>
            </div>
            <div class="w-full lg:w-1/2">
                <div class="bg-white rounded-xl p-6 sm:p-8 cursor-pointer" on:click={areaClick} on:keydown={(e) => e.key === 'Enter' && areaClick()} role="button" tabindex="0">
                    <div class="flex flex-col items-center justify-center text-center">
                        <i class="text-5xl sm:text-6xl ri-upload-cloud-line mb-4 text-cRed"></i>
                        <p class="text-base sm:text-lg text-cBlack/80 mb-2 font-medium">Drag and drop your file here</p>
                        <p class="text-sm text-cBlack/80 mb-4">or</p>
                        <button class="bg-cRed text-white px-8 py-2 rounded-xl text-sm sm:text-base font-semibold">
                            Select File
                        </button>
                    </div>
                    <input bind:this={inputFile} id="file-upload" type="file" class="hidden" accept="image/*" on:change={handleFileSelect}/>
                </div>
                {#if isUploading}
                <p class="mt-4 text-center">Uploading and shrinking image...</p>
                {/if}
            </div>
        </div>
    </div>
</div>

{#if compressedImageUrl}
    <div class="container mx-auto mt-8 p-6 border border-cBlack/10 rounded-xl">
        <h2 class="text-2xl font-bold mb-4">Compressed Image Results</h2>
        <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 pr-4">
                <img src={compressedImageUrl} alt="Compressed image" class="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div class="w-full md:w-1/2 mt-4 md:mt-0">
                <p class="mb-2"><span class="font-semibold">Original file name:</span> {originalFileName}</p>
                <p class="mb-2"><span class="font-semibold">Original size:</span> {formatSize(originalSize)}</p>
                <p class="mb-2"><span class="font-semibold">Compressed size:</span> {formatSize(compressedSize)}</p>
                <p class="mb-4"><span class="font-semibold">Compression ratio:</span> {((1 - compressedSize / originalSize) * 100).toFixed(2)}%</p>
                <button on:click={downloadImage} class="bg-cRed text-white px-8 py-2 rounded-xl">
                    Download Compressed Image
                </button>
            </div>
        </div>
    </div>
{/if}
