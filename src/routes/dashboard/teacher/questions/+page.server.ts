export const load = async () => {
    const questions = [
        {
            id: 1,
            key: "fibonacci-function",
            title: "Fibonacci Function",
            desc: "Calculate the Fibonacci sequence up to a certain number.",
            language: "Python",
            difficulty: "Easy",
            tags: ["recursion", "algorithms", "math"],
            status: "published" as const,
            stats: {
                attempts: 120,
                passRate: 68,
                avgScore: 82,
                avgTries: 2.3,
                lastAttempt: "2h ago"
            }
        },
        {
            id: 2,
            key: "binary-search-tree",
            title: "Binary Search Tree Implementation",
            desc: "Implement a binary search tree with insert, search, and delete operations.",
            language: "JavaScript",
            difficulty: "Medium",
            tags: ["data-structures", "trees", "BST"],
            status: "published" as const,
            stats: {
                attempts: 87,
                passRate: 52,
                avgScore: 75,
                avgTries: 3.1,
                lastAttempt: "5h ago"
            }
        },
        {
            id: 3,
            key: "merge-sort-algorithm",
            title: "Merge Sort Algorithm",
            desc: "Implement the merge sort algorithm to sort an array of integers.",
            language: "Java",
            difficulty: "Medium",
            tags: ["sorting", "divide-and-conquer", "algorithms"],
            status: "published" as const,
            stats: {
                attempts: 156,
                passRate: 71,
                avgScore: 88,
                avgTries: 2.1,
                lastAttempt: "1h ago"
            }
        },
        {
            id: 4,
            key: "graph-traversal",
            title: "Graph Traversal - DFS & BFS",
            desc: "Implement depth-first search and breadth-first search for graph traversal.",
            language: "Python",
            difficulty: "Hard",
            tags: ["graphs", "traversal", "DFS", "BFS"],
            status: "draft" as const,
            stats: {
                attempts: 23,
                passRate: 43,
                avgScore: 65,
                avgTries: 4.2,
                lastAttempt: "1d ago"
            }
        },
        {
            id: 5,
            key: "two-sum-problem",
            title: "Two Sum Problem",
            desc: "Find two numbers in an array that add up to a specific target.",
            language: "Python",
            difficulty: "Easy",
            tags: ["arrays", "hash-map", "two-pointers"],
            status: "published" as const,
            stats: {
                attempts: 245,
                passRate: 82,
                avgScore: 91,
                avgTries: 1.8,
                lastAttempt: "30m ago"
            }
        },
        {
            id: 6,
            key: "linked-list-reversal",
            title: "Reverse a Linked List",
            desc: "Reverse a singly linked list in-place without using extra space.",
            language: "C++",
            difficulty: "Medium",
            tags: ["linked-list", "pointers", "in-place"],
            status: "published" as const,
            stats: {
                attempts: 98,
                passRate: 64,
                avgScore: 79,
                avgTries: 2.7,
                lastAttempt: "3h ago"
            }
        },
        {
            id: 7,
            key: "dynamic-programming-coins",
            title: "Coin Change Problem",
            desc: "Find the minimum number of coins needed to make a given amount using dynamic programming.",
            language: "Python",
            difficulty: "Hard",
            tags: ["dynamic-programming", "optimization", "algorithms"],
            status: "published" as const,
            stats: {
                attempts: 67,
                passRate: 38,
                avgScore: 58,
                avgTries: 5.1,
                lastAttempt: "6h ago"
            }
        },
        {
            id: 8,
            key: "palindrome-checker",
            title: "Palindrome Checker",
            desc: "Check if a given string is a palindrome, ignoring spaces and punctuation.",
            language: "JavaScript",
            difficulty: "Easy",
            tags: ["strings", "two-pointers", "validation"],
            status: "archived" as const,
            stats: {
                attempts: 189,
                passRate: 89,
                avgScore: 94,
                avgTries: 1.4,
                lastAttempt: "2w ago"
            }
        },
        {
            id: 9,
            key: "quick-sort-implementation",
            title: "QuickSort Implementation",
            desc: "Implement the quicksort algorithm with proper pivot selection.",
            language: "Java",
            difficulty: "Medium",
            tags: ["sorting", "divide-and-conquer", "recursion"],
            status: "draft" as const,
            stats: {
                attempts: 12,
                passRate: 50,
                avgScore: 72,
                avgTries: 3.5,
                lastAttempt: "4d ago"
            }
        },
        {
            id: 10,
            key: "lru-cache",
            title: "LRU Cache Implementation",
            desc: "Design and implement a Least Recently Used (LRU) cache with O(1) operations.",
            language: "Python",
            difficulty: "Hard",
            tags: ["data-structures", "cache", "hash-map", "linked-list"],
            status: "published" as const,
            stats: {
                attempts: 54,
                passRate: 41,
                avgScore: 62,
                avgTries: 4.8,
                lastAttempt: "8h ago"
            }
        }
    ];

    return { questions };
}