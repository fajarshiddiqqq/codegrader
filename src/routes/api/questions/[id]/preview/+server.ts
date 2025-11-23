import { json } from '@sveltejs/kit';

export const GET = async ({ params, fetch }) => {
    const { id } = params;
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    
    try {
        const res = await fetch(`${baseUrl}/questions/${id}/preview`);
        
        if (!res.ok) {
            return json({ error: 'Failed to fetch question' }, { status: res.status });
        }
        
        const data = await res.json();
        return json(data);
    } catch (error) {
        return json({ error: 'Failed to fetch question' }, { status: 500 });
    }
};