<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	function selectElement(path, event) {
		if (!editable) return;
		event.stopPropagation();
		onElementSelect(path);
	}

	const mapUrl = $derived(content.googleMapsEmbedUrl);
</script>

<footer
	class="site-footer"
	style="background: {content.secondaryColor || '#111827'};"
>
	<div class="container">
		<div class="footer-content">
			<!-- Footer text & copyright -->
			<div class="footer-left">
				<p
					class="footer-text"
					class:editable
					data-editable={editable ? "footerText" : undefined}
					onclick={(e) => selectElement("footerText", e)}
				>
					{content.footerText || ""}
				</p>
				<p class="footer-copyright">
					© {new Date().getFullYear()}
					<span
						class:editable
						data-editable={editable ? "businessName" : undefined}
						onclick={(e) => selectElement("businessName", e)}
						>{content.businessName}</span
					>
				</p>
			</div>

			<!-- Optional Google Maps (small box) -->
			{#if mapUrl}
				<div
					class="footer-map"
					class:editable
					data-editable={editable ? "googleMapsEmbedUrl" : undefined}
					onclick={(e) => selectElement("googleMapsEmbedUrl", e)}
				>
					<h4 class="map-title">Find us</h4>
					<iframe
						src={mapUrl}
						class="map-iframe"
						allowfullscreen
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
				</div>
			{:else if editable}
				<div
					class="footer-map-placeholder"
					class:editable
					data-editable="googleMapsEmbedUrl"
					onclick={(e) => selectElement("googleMapsEmbedUrl", e)}
				>
					<span class="placeholder-text">+ Add Google Map</span>
				</div>
			{/if}
		</div>
	</div>
</footer>

<style>
	.site-footer {
		color: white;
		padding: 2rem 1rem;
	}
	.container {
		max-width: 1140px;
		margin: 0 auto;
	}
	.footer-content {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	@media (min-width: 768px) {
		.footer-content {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}
	}
	.footer-left {
		flex: 1;
	}
	.footer-text {
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}
	.footer-copyright {
		font-size: 0.875rem;
		color: #9ca3af;
	}
	.footer-map {
		width: 100%;
		max-width: 256px;
	}
	.map-title {
		font-size: 0.875rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: #e5e7eb;
	}
	.map-iframe {
		width: 100%;
		height: 150px;
		border: 0;
		border-radius: 8px;
	}
	.footer-map-placeholder {
		width: 100%;
		max-width: 256px;
		height: 150px;
		background: #374151;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.placeholder-text {
		font-size: 0.875rem;
		color: #9ca3af;
	}
	.editable {
		cursor: pointer;
		transition: outline 0.15s ease;
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	.editable:hover {
		outline: 2px dashed rgba(124, 58, 237, 0.5);
	}
	.footer-map-placeholder.editable:hover {
		background: #4b5563;
	}
</style>
