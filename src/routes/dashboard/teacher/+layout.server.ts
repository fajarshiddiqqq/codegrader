import { redirect } from "@sveltejs/kit";

export const load = async ({ url, parent }) => {
    const { user } = await parent();
    const path = url.pathname;

    if (path === "/dashboard/teacher") {
        throw redirect(302, "/dashboard/teacher/questions");
    }

    // if (user.role !== "teacher") {
    //     throw redirect(302, "/dashboard");
    // }

    return {};
};
