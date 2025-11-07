// dashboard/admin/users/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const students = [
        {
            username: "stu01",
            fullname: "Alice Lee",
            email: "alice@example.com",
            status: "active",
            joined: "2025-01-10",
        },
        {
            username: "stu02",
            fullname: "Bob Tan",
            email: "bob@example.com",
            status: "inactive",
            joined: "2025-02-22",
        },
    ];

    const teachers = [
        {
            username: "teach01",
            fullname: "Mr. Wong",
            email: "wong@example.com",
            status: "active",
            joined: "2024-09-01",
        },
    ];

    const admins = [
        {
            username: "admin01",
            fullname: "Super Admin",
            email: "admin@example.com",
            status: "active",
            joined: "2023-05-12",
        },
    ];

    return { students, teachers, admins };
};
