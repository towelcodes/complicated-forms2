import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { POSTGREST_ENDPOINT, SERVICE_ROLE_KEY } from "$env/static/private";

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

    const body = JSON.stringify({
        id: json.id,
        ip_address: getClientAddress(),
        form_data: json,
        for: 0
    });

    const res = await fetch(POSTGREST_ENDPOINT + "/submissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + SERVICE_ROLE_KEY,
            "apikey": SERVICE_ROLE_KEY,
        },
        body: body
    });

    console.log(res);

    if (!res.ok) {
        error(res.status, await res.text());
    }

    return new Response(null, { status: 201 });
}