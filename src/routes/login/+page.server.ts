import { resolve } from "$app/paths";
import { redirect, fail } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    const token = cookies.get("access_token");
    if (token) {
        throw redirect(302, `${resolve("/dashboard")}`);
    }
    return {};
}

export const actions = {
    default: async ({ request, cookies, fetch }) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            return fail(400, { email, error: "Email and password are required." });
        }

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return fail(res.status, { email, error: errorData.error.message || "Login failed." });
            }

            const resData = await res.json();
            const token = resData.data.access_token;
			cookies.set("access_token", token, {
				path: "/",
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				sameSite: "strict",
			});
            
        } catch (err) {
            return fail(500, { email, error: "Internal Server Error" });
        }

		throw redirect(302, `${resolve("/dashboard")}`);
    },
};
