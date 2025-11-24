import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ parent, cookies }) => {
    const token = cookies.get("access_token");
    if (!token) throw redirect(302, "/login");
    
    const { question } = await parent();
    if (question.role !== "owner" && question.role !== "editor") {
        throw redirect(302, `/dashboard/teacher/questions`);
    }
}

export const actions = {
    update: async ({ request, params, fetch, cookies }) => {
        const token = cookies.get("access_token");
        if (!token) return fail(401, { error: "Unauthorized" });

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const form = await request.formData();

        // BASIC FIELDS
        const payload = {
            title: form.get("title"),
            description: form.get("description"),
            function_name: form.get("function_name"),
            starter_code: form.get("starter_code") || "",
            custom_instructions: form.get("custom_instructions") || "",
            difficulty: form.get("difficulty"),
            visibility: form.get("visibility"),
            tags: (form.get("tags") as string)
                ?.split(",")
                .map(t => t.trim())
                .filter(Boolean) || []
        };

        // 1. UPDATE MAIN QUESTION
        const res1 = await fetch(`${baseUrl}/questions/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!res1.ok) {
            const err = await res1.json().catch(() => ({}));
            return fail(res1.status, { error: err.error || "Failed to update question" });
        }

        // ================================
        // 2. PARSE TEST CASES
        // ================================
        const testCases: Array<any> = [];
        const testCaseRegex = /^test_cases\[(\d+)\]\[(input_data|expected_output|is_hidden)\]$/;

        for (const [key, value] of form.entries()) {
            const match = key.match(testCaseRegex);
            if (!match) continue;

            const index = Number(match[1]);
            const field = match[2];

            if (!testCases[index]) testCases[index] = {
                input_data: "",
                expected_output: "",
                is_hidden: false
            };

            if (field === "is_hidden") {
                testCases[index].is_hidden = value === "on" ? true : false;
            } else {
                testCases[index][field] = value.toString();
            }
        }

        const cleanedTestCases = testCases.filter(Boolean);

        // 2. UPDATE TEST CASES
        const res2 = await fetch(`${baseUrl}/questions/${params.id}/test-cases`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ test_cases: cleanedTestCases })
        });

        if (!res2.ok) {
            const err = await res2.json().catch(() => ({}));
            return fail(res2.status, { error: err.error || "Failed to update test cases" });
        }

        // // ================================
        // // 3. PARSE RUBRIC
        // // ================================
        const criteria: Array<any> = [];
        const critRegex = /^criteria\[(\d+)\]\[(aspect|weight|description)\]$/;

        for (const [key, value] of form.entries()) {
            const match = key.match(critRegex);
            if (!match) continue;

            const index = Number(match[1]);
            const field = match[2];

            if (!criteria[index]) criteria[index] = {
                aspect: "",
                weight: 0,
                description: ""
            };

            criteria[index][field] =
                field === "weight" ? Number(value) : value.toString();
        }

        const cleanedCriteria = criteria.filter(Boolean);

        const tone = form.get("tone") || "constructive";

        const rubricPayload = {
            criteria: cleanedCriteria,
            tone
        };

        // 3. UPDATE RUBRIC
        const res3 = await fetch(`${baseUrl}/questions/${params.id}/rubric`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ rubric: rubricPayload })
        });
        
        if (!res3.ok) {
            const err = await res3.json().catch(() => ({}));
            return fail(res3.status, { error: err.error.message || "Failed to update rubric" });
        }

        // SUCCESS
        throw redirect(302, `/dashboard/teacher/questions`);
    }
};
