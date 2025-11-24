import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ fetch, params, cookies  }) => {
    const token = cookies.get('access_token');
    if (!token) {
        throw redirect(302, '/login');
    }

    try {
        const id = params.id;
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const rawRes = await fetch(`${baseUrl}/questions/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const res = await rawRes.json();
        return {
            question: res.data.question
        };
    } catch (error) {
        throw redirect(302, '/login');
    }
}


export const actions = {
    run: async ({ request, cookies, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) {
            return fail(401, { error: "Not authenticated" });
        }

        const formData = await request.formData();
        const code = formData.get("code");
        const question_id = formData.get("question_id");

        if (typeof code !== "string" || !question_id) {
            return fail(400, { error: "Code and question_id are required." });
        }

        const baseUrl = import.meta.env.VITE_BACKEND_URL;

        const res = await fetch(`${baseUrl}/submissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                question_id: Number(question_id),
                code
            })
        });

        let json: any;
        try {
            json = await res.json();
        } catch {
            return fail(res.status, { error: "Invalid JSON from server" });
        }

        if (!json.status) {
            return fail(400, { error: "Submission failed" });
        }

        const data = json.data;

        return {
            success: true,
            // pass exactly what you need
            testResults: {
                status: data.status,
                execution_time_ms: data.execution_time_ms,
                passed: data.passed,
                failed: data.failed,
                total: data.total_tests,
                results: data.results,  // array
                error_message: data.error_message ?? null,
                error_type: data.error_type ?? null
            }
        };
    }
};
