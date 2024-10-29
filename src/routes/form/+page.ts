import type { PageLoad } from './$types';
import type { FormData } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ url, fetch }) => {
    const id = url.searchParams.get("id");
    if (!id) error(400, "Form not specified");
    const token = url.searchParams.get("token");

    const res = await fetch(`/api/form?id=${id}${null !== token ? `&token=${token}` : ""}`);
    const json = await res.json();
    if (res.status !== 200) {
        error(res.status, json.message);
    }

    const data = json as FormData; 

    console.log(JSON.stringify(data));

    return data;
};