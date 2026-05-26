import { DATA_PATH } from "./config.js";

const cache = {};

async function fetchCached(key, path) {
    if (cache[key]) return cache[key];
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
    cache[key] = await res.json();
    return cache[key];
}

export function getGallery() {
    return fetchCached("gallery", `${DATA_PATH}gallery.json`);
}

export function getTestimonials() {
    return fetchCached("testimonials", `${DATA_PATH}testimonials.json`);
}

export function getHarmonyDetails() {
    return fetchCached ("harmonyDetails", `${DATA_PATH}harmony-details.json`);
}