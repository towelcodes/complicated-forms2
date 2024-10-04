import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
    return {
        post: {
            title: `Title for goes here`,
            content: `Content for goes here`,
        },
    };
}