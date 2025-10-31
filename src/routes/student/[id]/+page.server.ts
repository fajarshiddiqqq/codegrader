// src/routes/question/[id]/+page.server.ts
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

// Simulated code execution results
const simulateCodeExecution = (code: string, language: string) => {
    const delay = Math.random() * 1000 + 1500; // 1.5-2.5s delay

    return new Promise((resolve) => {
        setTimeout(() => {
            // Parse the code to simulate realistic output
            const hasReturn = code.includes("return");
            const hasPrint = code.includes("print");
            const hasError =
                code.includes("1/0") || code.includes("undefined_var");

            if (hasError) {
                resolve({
                    success: false,
                    output: "",
                    error: "ZeroDivisionError: division by zero\n  at line 3",
                    executionTime: delay,
                });
            } else if (hasPrint) {
                resolve({
                    success: true,
                    output: "Hello, World!\nTest output\n42\n",
                    error: null,
                    executionTime: delay,
                });
            } else {
                resolve({
                    success: true,
                    output: "✓ Code executed successfully\n\nFunction defined: reverse()\nReady to test with input.",
                    error: null,
                    executionTime: delay,
                });
            }
        }, delay);
    });
};

// Simulated AI feedback generation
const generateAIFeedback = (code: string, score: number) => {
    const delay = Math.random() * 2000 + 2000; // 2-4s delay

    return new Promise((resolve) => {
        setTimeout(() => {
            const feedback = {
                score,
                passed: score >= 70,
                testResults: [
                    {
                        name: "Basic string reversal",
                        passed: true,
                        details: 'reverse("hello") → "olleh" ✓',
                    },
                    {
                        name: "Empty string",
                        passed: score >= 80,
                        details: 'reverse("") → "" ✓',
                    },
                    {
                        name: "Single character",
                        passed: score >= 70,
                        details: 'reverse("a") → "a" ✓',
                    },
                    {
                        name: "Special characters",
                        passed: score >= 90,
                        details:
                            'reverse("a!@#") → "#@!a" ' +
                            (score >= 90 ? "✓" : "✗"),
                    },
                ],
                aiComments:
                    score >= 90
                        ? "🎉 Excellent work! Your solution is clean, efficient, and handles all edge cases perfectly. The slice notation [::-1] is the Pythonic way to reverse strings."
                        : score >= 70
                        ? "👍 Good solution! Your code works for most cases. Consider testing edge cases like empty strings and special characters to make it more robust."
                        : "💡 Your code needs some improvements. Make sure to handle edge cases and test thoroughly. Review the test failures above.",
                strengths: [
                    "Clean and readable code",
                    "Efficient O(n) time complexity",
                    "Proper type hints used",
                ].slice(0, score >= 90 ? 3 : 2),
                improvements:
                    score < 90
                        ? [
                              "Add input validation",
                              "Consider edge cases (empty strings, None)",
                              "Add docstring for documentation",
                          ]
                        : [],
            };

            resolve(feedback);
        }, delay);
    });
};

export const actions = {
    run: async ({ request }) => {
        const data = await request.formData();
        const code = data.get("code") as string;
        const language = data.get("language") as string;

        const result = await simulateCodeExecution(code, language);

        return { result };
    },

    submit: async ({ request }) => {
        const data = await request.formData();
        const code = data.get("code") as string;
        const questionId = data.get("questionId") as string;

        // Simulate scoring
        const score = Math.floor(Math.random() * 30) + 70; // 70-100

        const [execResult, feedback] = await Promise.all([
            simulateCodeExecution(code, "python"),
            generateAIFeedback(code, score),
        ]);

        return {
            execResult,
            feedback,
        };
    },
} satisfies Actions;
