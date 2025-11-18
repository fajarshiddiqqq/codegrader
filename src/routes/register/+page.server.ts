import { redirect, fail } from '@sveltejs/kit';

export const load = async ({cookies}) => {
	const token = cookies.get('access_token');
	if (token) {
		throw redirect(302, `/dashboard`);
	}
};

export const actions = {
    default: async ({request, cookies, fetch}) => {
        const data = await request.formData();
        const name = data.get('fullname');
        const email = data.get('email');
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword');
        const role = data.get('role');

        if (!name || !email || !password || !role || !confirmPassword) {
            return fail(400, { error: 'Missing required fields' });
        }

        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match' });
        }

        try {
            const baseUrl = import.meta.env.VITE_BACKEND_URL;
            const res = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return fail(res.status, { error: errorData.error.message || 'Registration failed.' });
            }

            const resData = await res.json();
            if (role === 'student' && resData.data && resData.data.access_token) {
                const token = resData.data.access_token;
                cookies.set('access_token', token, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7 // 1 week
                });
            } else {
                return { success: true, message: resData.meta.message}
            }

        } catch (error) {
            console.error('Registration error:', error);
            return fail(500, { error: 'An unexpected error occurred.' });
        }

        throw redirect(302, '/dashboard');
    }
}