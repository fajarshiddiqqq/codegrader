<script>
    import Footer from "$lib/components/Footer.svelte";
    import HomeCTA from "$lib/components/HomeCTA.svelte";
    import HomeNav from "$lib/components/HomeNav.svelte";
    import TopicBrowser from "$lib/components/TopicBrowser.svelte";
    import TrendingProblems from "$lib/components/TrendingProblems.svelte";

    let searchQuery = "";
    let mobileMenuOpen = false;

    const topics = [
        { name: "Python", icon: "/icons/python.svg" },
        { name: "JavaScript", icon: "/icons/javascript.svg" },
        { name: "SQL", icon: "/icons/sql.svg" },
        { name: "Algorithms", icon: "/icons/algorithm.svg" },
        { name: "Data Structures", icon: "/icons/datastructure.svg" },
        { name: "Web Dev", icon: "/icons/html.svg" },
    ];

    const trendingProblems = [
        {
            title: "FizzBuzz",
            language: "Python",
            difficulty: "Easy",
            difficultyColor: "bg-green-100 text-green-700",
        },
        {
            title: "Two Sum",
            language: "JavaScript",
            difficulty: "Medium",
            difficultyColor: "bg-yellow-100 text-yellow-700",
        },
        {
            title: "Binary Search Tree",
            language: "Python",
            difficulty: "Hard",
            difficultyColor: "bg-red-100 text-red-700",
        },
    ];
</script>

<svelte:head>
    <title>CodeGrader - AI-Powered Code Grading at Scale</title>
</svelte:head>

<div class="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50">
    <!-- Navigation -->
    <HomeNav />

    <!-- Hero Section -->
    <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="max-w-5xl mx-auto">
            <!-- Main Headline -->
            <HomeCTA />

            <!-- Topic Browser -->
            <TopicBrowser {topics} />

            <!-- Trending Problems -->
            <!-- <TrendingProblems {trendingProblems} /> -->
        </div>
    </div>

    <!-- Footer -->
    <Footer />
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }
</style>
