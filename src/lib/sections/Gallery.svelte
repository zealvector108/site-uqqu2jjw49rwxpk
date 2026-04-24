<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const images = $derived(section.images || []);
	const columns = $derived(section.columns || 3);

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="gallery-section">
	<div class="container">
		{#if section.title}<h2 class="section-title">{section.title}</h2>{/if}
		{#if !section.title}<h2 class="section-title">Gallery</h2>{/if}
		{#if images.length > 0}
			<div class="gallery-grid" style="--cols: {columns};">
				{#each images as img, i}
					<img
						src={img}
						alt="Gallery image"
						class="gallery-image"
						class:editable
						data-editable={`gallery-${i}`}
						onclick={() => selectElement(`gallery-${i}`, img)}
					/>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Gallery coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.gallery-section {
		padding: 4rem 1rem;
		background: white;
	}
	.container {
		max-width: 1140px;
		margin: 0 auto;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 3rem;
		color: #111827;
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(var(--cols, 3), 1fr);
		gap: 1rem;
	}
	.gallery-image {
		width: 100%;
		height: 250px;
		object-fit: cover;
		border-radius: 0.75rem;
		transition: transform 0.2s;
	}
	.gallery-image:hover {
		transform: scale(1.02);
	}
	.empty-note {
		text-align: center;
		color: #9ca3af;
	}
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed var(--primary, #7c3aed);
		outline-offset: 4px;
	}
	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
