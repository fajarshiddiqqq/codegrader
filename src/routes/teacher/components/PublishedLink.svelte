<script>
    let { url } = $props();

    function copyToClipboard() {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }

    function shareLink() {
        if (navigator.share) {
            navigator.share({
                title: 'CodeGrader Quiz',
                url: url
            });
        } else {
            copyToClipboard();
        }
    }
</script>

<div class="bg-green-50 border border-green-300 p-4 rounded mt-4">
    <div class="flex justify-between items-center">
        <p class="text-gray-700 font-medium">Published URL:</p>
        <div class="flex items-center gap-2">
            <a href={url} target="_blank" class="text-primary hover:underline text-sm">
                {url}
            </a>
            <button onclick={copyToClipboard} class="hover:opacity-70 transition">
                <img src="/icons/copy.svg" alt="copy" class="w-4 cursor-pointer" />
            </button>
            <button onclick={shareLink} class="hover:opacity-70 transition">
                <img src="/icons/share.svg" alt="share" class="w-4 cursor-pointer" />
            </button>
        </div>
    </div>
</div>