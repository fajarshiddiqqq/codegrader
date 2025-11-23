// fetch question if user logged in
import { redirect } from '@sveltejs/kit';

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