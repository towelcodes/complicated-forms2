import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Response } from "./types";

const raw = browser ? window.localStorage.getItem("responses") : undefined;
const json = raw ? JSON.parse(raw) : undefined;
const initialValue: Map<string, Response> = json ? new Map(Object.entries(json)) : new Map();
console.log("initial val", initialValue);

const storedResponses = writable<Map<string, Response>>(initialValue, () => {
    console.log("got a subscriber");
    return () => console.log("no more subscribers");
});

storedResponses.subscribe((responses) => {
    console.log("responses changed: ", responses);
    if (browser) {
        console.log("entries", responses.entries());
        localStorage.setItem("responses", JSON.stringify(Object.fromEntries(responses)));
    }
});

export default storedResponses;