export const load = async ({ fetch, cookies  }) => {
    const token = cookies.get('access_token');

    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const rawRes = await fetch(`${baseUrl}/questions/public`);
    const res = await rawRes.json();
    return {
        isLogged: !!token,
        courses: [],
        questions: res.data.questions
    };
}