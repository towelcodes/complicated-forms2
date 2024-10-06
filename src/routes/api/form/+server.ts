import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { POSTGREST_ENDPOINT, SERVICE_ROLE_KEY } from "$env/static/private";

export const GET: RequestHandler = async ({ request }) => {
    if (request.body == null) {
        error(400, "Missing body");
    }

    const json = await request.json();

    const res = await fetch(POSTGREST_ENDPOINT + "/forms?id=eq." + json.id, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + SERVICE_ROLE_KEY,
            "apikey": SERVICE_ROLE_KEY
        }
    });

    if (!res.ok) {
        error(res.status, await res.text());
    }

    const form = await res.json();
    
    // TODO authentication

    return new Response(form.data);
};