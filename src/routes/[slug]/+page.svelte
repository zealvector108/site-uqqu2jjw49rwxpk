<script>
	import site from "$lib/data/site.json" with { type: "json" };
	import SiteRenderer from "$lib/SiteRenderer.svelte";

	let { data } = $props();
</script>

<SiteRenderer content={site} pageSlug={data.slug} />
