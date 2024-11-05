import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
    const dbRef = db();
    await dbRef.ping();
    return new Response("ok");
};