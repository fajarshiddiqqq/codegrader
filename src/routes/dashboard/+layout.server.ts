import { redirect } from "@sveltejs/kit";

export const load = async ({ url }) => {
  let role = "admin";

  const path = url.pathname;
  // if (role === "admin" && !path.startsWith("/dashboard/admin")) {
  //   throw redirect(302, "/dashboard/admin");
  // }

  // if (role === "teacher" && !path.startsWith("/dashboard/teacher")) {
  //   throw redirect(302, "/dashboard/teacher");
  // }

  // if (role === "student" && !path.startsWith("/dashboard/student")) {
  //   throw redirect(302, "/dashboard/student");
  // }

  return { user: { role } };
};
