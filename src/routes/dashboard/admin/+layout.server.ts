import { redirect } from "@sveltejs/kit";

export const load = async ({ url, parent }) => {
    const { user } = await parent();
    const path = url.pathname;

    if (path === "/dashboard/admin") {
        throw redirect(302, "/dashboard/admin/users");
    }

    if (user.role !== "admin") {
        throw redirect(302, "/dashboard");
    }

    return {};
};
