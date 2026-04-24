<script>
	import EditableText from "$lib/components/EditableText.svelte";
	import EditableImage from "$lib/components/EditableImage.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let items = $derived(section.items || []);

	function updateItem(index, field, value) {
		const newItems = structuredClone(items);
		newItems[index][field] = value;
		onUpdate({ ...section, items: newItems });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="portfolio-section">
	<div class="container">
		<EditableText
			value={section.title || "Our Work"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		{#if items.length > 0}
			<div class="portfolio-grid">
				{#each items as item, i}
					<div
						class="portfolio-item"
						class:editable
						data-editable={`portfolio-${i}`}
						onclick={() => selectElement(`portfolio-${i}`, item)}
					>
						<EditableImage
							src={item.image}
							{editable}
							onupdate={(v) => updateItem(i, "image", v)}
							class="portfolio-image"
						/>
						<div class="portfolio-overlay">
							<EditableText
								value={item.title}
								{editable}
								onupdate={(v) => updateItem(i, "title", v)}
								class="portfolio-title"
							/>
							{#if item.category}
								<EditableText
									value={item.category}
									{editable}
									onupdate={(v) =>
										updateItem(i, "category", v)}
									class="portfolio-category"
								/>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Portfolio coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.portfolio-section {
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
	.portfolio-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	.portfolio-item {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
	}
	.portfolio-image {
		width: 100%;
		height: 250px;
		object-fit: cover;
		transition: transform 0.3s;
	}
	.portfolio-item:hover .portfolio-image {
		transform: scale(1.05);
	}
	.portfolio-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		padding: 1.5rem;
		color: white;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.portfolio-item:hover .portfolio-overlay {
		opacity: 1;
	}
	.portfolio-title {
		font-size: 1.25rem;
		font-weight: 700;
	}
	.portfolio-category {
		font-size: 0.875rem;
		opacity: 0.8;
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
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
