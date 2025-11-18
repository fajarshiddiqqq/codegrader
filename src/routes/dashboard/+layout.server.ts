import { redirect } from "@sveltejs/kit";

export const load = async ({ url, parent }) => {
  const { user } = await parent();

  if (!user) {
    throw redirect(302, "/login");
  }

  const path = url.pathname;
  if (user.role === "admin" && !path.startsWith("/dashboard/admin")) {
    throw redirect(302, "/dashboard/admin");
  }

  if (user.role === "teacher" && !path.startsWith("/dashboard/teacher")) {
    throw redirect(302, "/dashboard/teacher");
  }

  if (user.role === "student" && !path.startsWith("/dashboard/student")) {
    throw redirect(302, "/dashboard/student");
  }

  return { user };
};
