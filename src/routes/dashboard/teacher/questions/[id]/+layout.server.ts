import { redirect } from "@sveltejs/kit";

export const load = async ({ params, cookies, fetch }) => {
    const token = cookies.get("access_token");
    if (!token) {
        throw redirect(302, "/login");
    }

    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${baseUrl}/questions/${params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            console.log("Failed to fetch questions:", res.statusText);
            throw redirect(302, "/login");
        }
        const resData = await res.json();
        
        return { question: resData.data.question };

    } catch (err) {
        console.error("Auth check failed:", err);
        throw redirect(302, "/login");
    }
}