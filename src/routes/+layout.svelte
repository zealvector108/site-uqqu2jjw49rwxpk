<script>
	import "./app.css";
	import site from "$lib/data/site.json" with { type: "json" };

	let { children } = $props();

	const whatsappRaw = site.contact?.whatsappNumber || site.whatsappNumber || "";
	const whatsappClean = whatsappRaw.replace(/[^0-9]/g, "");
</script>

<svelte:head>
	<title>{site.businessName || "Website"}{site.tagline ? ` — ${site.tagline}` : ""}</title>
	{#if site.tagline}
		<meta name="description" content={site.tagline} />
	{/if}
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}

{#if whatsappClean}
	<a
		href={`https://wa.me/${whatsappClean}`}
		target="_blank"
		rel="noopener noreferrer"
		class="whatsapp-float"
		aria-label="Chat on WhatsApp"
	>
		<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
			<path d="M16.004 0C7.164 0 .004 7.16.004 16c0 2.823.737 5.576 2.138 7.998L.012 32l8.204-2.1a15.93 15.93 0 0 0 7.788 1.98h.004C24.84 31.88 32 24.72 32 15.88 32 7.04 24.844 0 16.004 0zm0 29.28a13.32 13.32 0 0 1-6.96-1.96l-.5-.3-5.2 1.33 1.39-5.07-.33-.52A13.2 13.2 0 0 1 2.604 16c0-7.38 6.02-13.4 13.4-13.4 7.38 0 13.396 6.02 13.396 13.4 0 7.38-6.016 13.28-13.396 13.28zm7.34-10.02c-.4-.2-2.38-1.18-2.74-1.32-.36-.13-.62-.2-.9.2-.27.4-1.04 1.32-1.28 1.58-.24.28-.46.3-.86.1-.4-.2-1.68-.62-3.2-1.98-1.18-1.06-1.98-2.36-2.22-2.76-.24-.4-.02-.6.18-.8.18-.18.4-.46.6-.68.2-.24.28-.4.4-.68.14-.28.08-.52-.04-.72-.1-.2-.9-2.18-1.24-2.98-.32-.78-.66-.68-.9-.68h-.78c-.28 0-.72.1-1.1.5-.38.4-1.46 1.42-1.46 3.46 0 2.04 1.5 4.02 1.7 4.3.2.28 2.92 4.46 7.08 6.26.98.42 1.76.68 2.36.86.98.32 1.88.26 2.6.16.8-.12 2.38-.98 2.72-1.92.34-.94.34-1.74.24-1.92-.1-.16-.36-.26-.76-.46z" />
		</svg>
	</a>
{/if}

<style>
	.whatsapp-float {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 50;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: #25d366;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
		transition: transform 0.2s;
	}
	.whatsapp-float:hover {
		transform: scale(1.1);
	}
	.whatsapp-float svg {
		width: 32px;
		height: 32px;
		fill: white;
	}
	@media (max-width: 768px) {
		.whatsapp-float {
			bottom: 5rem;
		}
	}
</style>
