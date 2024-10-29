import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
    await db.ping();
    return new Response("ok");
};