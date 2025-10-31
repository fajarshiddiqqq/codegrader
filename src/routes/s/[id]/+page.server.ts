import {redirect } from "@sveltejs/kit";

export const load = ({ params }) => {
    throw redirect(302, `/student/${params.id}`);
}
