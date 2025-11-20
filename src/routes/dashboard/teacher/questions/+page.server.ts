import { redirect, fail } from "@sveltejs/kit";

export const load = async ({ cookies, fetch }) => {
    const token = cookies.get("access_token");
    if (!token) {
        throw redirect(302, "/login");
    }

    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${baseUrl}/questions/mine`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.log("Failed to fetch questions:", res.statusText);
            throw redirect(302, "/login");
        }

        const resData = await res.json();

        return { questions: resData.data.questions };
    } catch (err) {
        console.error("Auth check failed:", err);
        throw redirect(302, "/login");
    }
};

export const actions = {
    delete: async ({ request, cookies, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) {
            throw redirect(302, "/login");
        }

        const data = await request.formData();
        const questionId = data.get("questionId");

        if (!questionId) {
            return { success: false, error: "Question ID is required." };
        }

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await fetch(`${baseUrl}/questions/${questionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                return {
                    success: false,
                    error:
                        errorData.error.message || "Failed to delete question.",
                };
            }

            return { success: true };
        } catch (err) {
            return { success: false, error: "Internal Server Error" };
        }
    }
};
