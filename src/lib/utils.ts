// thank you svelte.dev repl
export const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");