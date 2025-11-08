<script lang="ts">
    interface TeacherQuestion {
        id: number;
        key: string;
        title: string;
        desc: string;
        language: string;
        difficulty: string;
        tags: string[];
        status: "published" | "draft" | "archived";
        stats: {
            attempts: number;
            passRate: number;
            avgScore: number;
            avgTries: number;
            lastAttempt: string;
        };
    }

    interface Props {
        questions: TeacherQuestion[];
    }

    let { questions }: Props = $props();

    function getDifficultyColor(difficulty: string): string {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "text-green-600";
            case "medium":
                return "text-yellow-600";
            case "hard":
                return "text-red-600";
            default:
                return "text-gray-600";
        }
    }

    function getStatusColor(status: string): string {
        switch (status) {
            case "published":
                return "bg-green-100 text-green-700";
            case "draft":
                return "bg-gray-100 text-gray-700";
            case "archived":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    }
</script>

<div class="flex flex-col gap-4">
    {#each questions as question}
        <div class="border border-gray-200 bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
            <!-- Header Row -->
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                    <span class="bg-gray-100 text-gray-700 px-3 py-1 text-sm font-medium rounded-md">
                        {question.language}
                    </span>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="font-medium text-gray-700">
                            {question.difficulty}
                        </span>
                        <span class="text-gray-400">•</span>
                        <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                            {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Title and Description -->
            <div class="mb-4">
                <h5 class="text-lg font-bold text-gray-900 mb-2">{question.title}</h5>
                <p class="text-sm text-gray-600 leading-relaxed">{question.desc}</p>
            </div>

            <!-- Tags -->
            {#if question.tags.length > 0}
                <div class="flex flex-wrap gap-2 mb-4">
                    {#each question.tags as tag}
                        <span class="text-xs bg-gray-100 text-gray-600 rounded-md px-2 py-1">
                            {tag}
                        </span>
                    {/each}
                </div>
            {/if}

            <!-- Stats and Actions Row -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                <div class="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                    <span class="font-medium">{question.stats.attempts}</span>
                    <span>Attempts</span>
                    <span class="text-gray-400">•</span>
                    <span class="font-medium text-gray-600">{question.stats.passRate}%</span>
                    <span>Pass</span>
                    <span class="text-gray-400">•</span>
                    <span>Avg <span class="font-medium">{question.stats.avgScore}</span></span>
                    <span class="text-gray-400">•</span>
                    <span class="font-medium">{question.stats.avgTries}</span>
                    <span>tries</span>
                    <span class="text-gray-400">•</span>
                    <span class="text-gray-500">{question.stats.lastAttempt}</span>
                </div>

                <div class="flex gap-2 shrink-0">
                    <button class="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        Preview
                    </button>
                    <button class="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                        Edit
                    </button>
                    <button class="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors">
                        Stats
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>