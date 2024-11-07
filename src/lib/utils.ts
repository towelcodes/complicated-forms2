// thank you svelte.dev repl
// FIXME ensure that the output can be used as a valid query selector
export const slugify = (str = "") =>
    str.toLowerCase().replace(/ /g, "-").replace(/\./g, "").replaceAll("&","AND");