import { redirect, fail } from "@sveltejs/kit";

export const actions = {

    create: async ({ request, cookies, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) {
            throw redirect(302, "/login");
        }

        const data = await request.formData();

        // Extract basic fields
        const title = data.get("title")?.toString() || "";
        const description = data.get("description")?.toString() || "";
        const function_name = data.get("function_name")?.toString() || "";
        const starter_code = data.get("starter_code")?.toString() || "";
        const custom_instructions =
            data.get("custom_instructions")?.toString() || "";
        const difficulty = data.get("difficulty")?.toString() || "easy";
        const visibility = data.get("visibility")?.toString() || "private";
        const tagsString = data.get("tags")?.toString() || "";
        const tone = data.get("tone")?.toString() || "constructive";

        const tags = tagsString
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        // Extract test cases
        const test_cases = [];
        let testIndex = 0;
        while (data.has(`test_cases[${testIndex}][input_data]`)) {
            test_cases.push({
                input_data:
                    data
                        .get(`test_cases[${testIndex}][input_data]`)
                        ?.toString() || "",
                expected_output:
                    data
                        .get(`test_cases[${testIndex}][expected_output]`)
                        ?.toString() || "",
                is_hidden:
                    data.get(`test_cases[${testIndex}][is_hidden]`) === "on",
            });
            testIndex++;
        }

        // Extract criteria
        const criteria = [];
        let criterionIndex = 0;
        while (data.has(`criteria[${criterionIndex}][aspect]`)) {
            criteria.push({
                aspect:
                    data
                        .get(`criteria[${criterionIndex}][aspect]`)
                        ?.toString() || "",
                weight: parseFloat(
                    data
                        .get(`criteria[${criterionIndex}][weight]`)
                        ?.toString() || "0.1"
                ),
                description:
                    data
                        .get(`criteria[${criterionIndex}][description]`)
                        ?.toString() || "",
            });
            criterionIndex++;
        }

        // Validate required fields
        if (!title || !description || !function_name) {
            return fail(400, { error: "Title, description, and function name are required." });
        }

        if (test_cases.length === 0) {
            return fail(400, { error: "At least one test case is required." });
        }

        if (criteria.length === 0) {
            return fail(400, {
                error: "At least one rubric criterion is required.",
            });
        }

        // Construct request body
        const requestBody = {
            title,
            description,
            function_name,
            starter_code,
            difficulty,
            visibility,
            tags,
            custom_instructions,
            test_cases,
            rubric: {
                criteria,
                tone,
            },
        };

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await fetch(`${baseUrl}/questions/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestBody),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return fail(res.status, {
                    error:
                        errorData.error?.message ||
                        "Failed to create question.",
                });
            }

            const responseData = await res.json();

        } catch (err) {
            if (err instanceof Response) {
                throw err;
            }
            console.error("Error creating question:", err);
            return fail(500, {
                error: "Internal server error while creating question.",
            });
        }

        throw redirect(303, "/dashboard/teacher/questions");

    }
};