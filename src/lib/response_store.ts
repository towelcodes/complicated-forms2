import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Response } from "./types";

const raw = browser ? window.localStorage.getItem("responses") : undefined;

let initialValue: Map<string, Response> = new Map();
try {
    const json = raw ? JSON.parse(raw) : undefined;
    initialValue = json ? new Map(Object.entries(json)) : new Map();
} catch {
    console.warn("malformed json will be reset");
}

// TODO add a reset progress button
const storedResponses = writable<Map<string, Response>>(initialValue);

storedResponses.subscribe((responses) => {
    console.log("responses changed: ", responses);
    if (browser) {
        console.log("entries", responses.entries());
        localStorage.setItem("responses", JSON.stringify(Object.fromEntries(responses)));
    }
});

export default storedResponses;