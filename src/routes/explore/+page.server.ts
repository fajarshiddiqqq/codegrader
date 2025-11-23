export const load = async ({ fetch  }) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const rawRes = await fetch(`${baseUrl}/questions/public`);
    const res = await rawRes.json();
    return {
        courses: [],
        questions: res.data.questions
    };
}