import { redirect, fail } from "@sveltejs/kit";

export const load = async ({ parent, params, cookies, fetch }) => {
    const token = cookies.get("access_token");
    if (!token) throw redirect(302, "/login");
    
    const questionId = params.id;
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    
    const { question } = await parent();
    if (question.role !== "owner") {
        throw redirect(302, `/dashboard/teacher/questions`);
    }
    
    // 2. Load collaborators
    const rawRes = await fetch(`${baseUrl}/questions/${questionId}/collaborators`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!rawRes.ok) {
        return { collaborators: [], questionId, error: "Failed to load collaborators." };
    }

    const res = await rawRes.json();
    const collaborators = res.data.collaborators;

    return {
        questionId,
        collaborators: collaborators || []
    };
};


export const actions = {

    // ADD collaborator
    add: async ({ request, cookies, params, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) return fail(401, { error: "Unauthorized" });

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const questionId = params.id;

        const form = await request.formData();
        const email = form.get("email");
        const permission = form.get("permission");

        if (!email || !permission) {
            return fail(400, { error: "Email and permission required." });
        }

        const res = await fetch(`${baseUrl}/questions/${questionId}/collaborators`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ email, permission })
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return fail(res.status, { error: error.error?.message || "Failed to add collaborator." });
        }

        return { success: true };
    },


    // UPDATE collaborator permission
    update: async ({ request, cookies, params, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) return fail(401, { error: "Unauthorized" });

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const questionId = params.id;

        const form = await request.formData();
        const user_id = form.get("user_id");
        const permission = form.get("permission");

        console.log("Updating collaborator:", { user_id, permission });

        if (!user_id || !permission) {
            return fail(400, { error: "User ID and permission required." });
        }

        const res = await fetch(`${baseUrl}/questions/${questionId}/collaborators`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ user_id: Number(user_id), permission })
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return fail(res.status, { error: error.error?.message || "Failed to update collaborator." });
        }

        return { success: true };
    },


    // REMOVE collaborator
    delete: async ({ request, cookies, params, fetch }) => {
        const token = cookies.get("access_token");
        if (!token) return fail(401, { error: "Unauthorized" });

        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const questionId = params.id;

        const form = await request.formData();
        const user_id = form.get("user_id");

        if (!user_id) {
            return fail(400, { error: "User ID required." });
        }

        const res = await fetch(`${baseUrl}/questions/${questionId}/collaborators/${user_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            return fail(res.status, { error: error.error?.message || "Failed to remove collaborator." });
        }

        return { success: true };
    }

};
