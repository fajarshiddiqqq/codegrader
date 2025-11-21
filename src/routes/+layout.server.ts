import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, fetch }) => {
    const token = cookies.get('access_token');
    if (!token) {
        return { user: null };
    }

    try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${baseUrl}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) {
            await fetch('/logout', { method: 'POST' });
            throw redirect(302, '/login');
        }

        const user = await res.json();

        return { user: user.data };
    } catch (err) {
        console.error("Auth check failed:", err);
        throw redirect(302, "/login");
    }
}