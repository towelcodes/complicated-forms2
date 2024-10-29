import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db, FormError, FormErrorType } from "$lib/server/db";

export const GET: RequestHandler = async ({ url }) => {
    const id = url.searchParams.get("id");
    if (id == null) return error(400, "Missing ID");
    if (isNaN(parseInt(id))) return error(400, "Invalid ID");

    const token = url.searchParams.get("token");

    try {
        const form = await db.getForm(parseInt(id), token ?? undefined);
        return new Response(JSON.stringify(form));
    } catch (e) {
        if (!(e instanceof FormError)) throw e;
        if (e.type == FormErrorType.NotFound) return error(404, e.message);
        if (e.type == FormErrorType.AuthRequried) return error(401, e.message);
        if (e.type == FormErrorType.Closed || e.type == FormErrorType.Expired) return error(403, e.message);
        return error(400, e.message);
    }
};