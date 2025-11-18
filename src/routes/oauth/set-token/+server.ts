import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const { token } = await request.json();

    if (!token) {
        return json({ error: 'Missing token' }, { status: 400 });
    }

    cookies.set('access_token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return json({ success: true });
}
