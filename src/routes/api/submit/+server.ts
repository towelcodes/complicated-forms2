import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
    error(400, "Method not allowed");
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
    if (request.body == null) {
        error(400, "Missing body");
    }

    // TODO ensure the submitted body is valid request
    // FIXME users could modify the form data to submit a invalid answer for a different form (by changing the id in the FormData)
    const json = await request.json();
    if (json.id == null) {
        error(400, "Missing ID");
    }

    await db.submit(json, 0, getClientAddress());
    return new Response(null, { status: 201 });
}