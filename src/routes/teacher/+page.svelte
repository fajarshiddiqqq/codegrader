<script>
    import Navbar from "./components/Navbar.svelte";
    import PublishedLink from "./components/PublishedLink.svelte";
    import UploadFile from "./components/UploadFile.svelte";

    let isSuccess = $state(false);
    let uploadedFile = $state(null);
    let isPublishing = $state(false);
    let publishedUrl = $state(null);
    let publishError = $state(null);

    async function handlePublish() {
        if (!uploadedFile || !isSuccess) return;
        
        isPublishing = true;
        publishError = null;

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('/api/publish', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            console.log('Result:', result);
            
            if (result.success) {
                publishedUrl = result.url;
                console.log('Published URL:', publishedUrl);
            } else {
                publishError = result.error || 'Failed to publish';
            }
        } catch (error) {
            console.error('Error:', error);
            publishError = 'An error occurred while publishing';
        } finally {
            isPublishing = false;
        }
    }

    function handleReset() {
        publishedUrl = null;
        publishError = null;
    }
</script>


<svelte:head>
    <title>Teacher Dashboard - CodeGrader</title>
</svelte:head>

<Navbar />
<main class="py-10 px-4">
    <div class="max-w-xl mx-auto space-y-4">
        <h1 class="text-primary text-3xl font-bold mb-6">Upload Questions CSV</h1>

        <!-- File upload input -->
        <UploadFile bind:onSuccess={isSuccess} bind:file={uploadedFile} onReset={handleReset} />

        <!-- Publish button -->
        <div class="mt-4">
            <button 
                onclick={handlePublish}
                disabled={!isSuccess || isPublishing}
                class="w-full py-3 px-4 rounded-sm transition font-semibold {isSuccess && !isPublishing
                    ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer' 
                    : 'bg-gray-400 text-white cursor-not-allowed opacity-60'}"
            >
                {isPublishing ? 'Publishing...' : 'Publish'}
            </button>
        </div>

        {#if publishError}
            <div class="bg-red-100 border border-red-300 p-3 rounded mt-4 text-red-700">
                {publishError}
            </div>
        {/if}

        <!-- Published link -->
        {#if publishedUrl}
            <PublishedLink url={publishedUrl} />
        {/if}
    </div>
</main>