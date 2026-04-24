<script>
	import site from "$lib/data/site.json" with { type: "json" };
	import SiteRenderer from "$lib/SiteRenderer.svelte";
</script>

<SiteRenderer content={site} pageSlug={null} />
