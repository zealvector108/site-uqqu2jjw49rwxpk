import site from "$lib/data/site.json";
import { error } from "@sveltejs/kit";

export const prerender = true;

export function entries() {
	const pages = site.pages || [];
	if (pages.length <= 1) return [];
	return pages.slice(1).map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
	const pages = site.pages || [];
	const match = pages.find((p) => p.slug === params.slug);
	if (!match) throw error(404, "Page not found");
	return { slug: params.slug };
}
