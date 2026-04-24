<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let items = $derived(section.items || []);

	function updateItem(index, value) {
		const newItems = structuredClone(items);
		newItems[index] = value;
		onUpdate({ ...section, items: newItems });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="featured-section">
	<div class="container">
		<EditableText
			value={section.title || "Featured Collection"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		{#if items.length > 0}
			<div class="featured-grid">
				{#each items as item, i}
					<div
						class="featured-item"
						class:editable
						data-editable={`featured-${i}`}
						onclick={() => selectElement(`featured-${i}`, item)}
					>
						<div class="featured-icon">✦</div>
						<EditableText
							value={item}
							{editable}
							onupdate={(v) => updateItem(i, v)}
							class="featured-label"
						/>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	.featured-section {
		padding: 3rem 1rem;
		background: #f9fafb;
	}
	.container {
		max-width: 1140px;
		margin: 0 auto;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 2rem;
	}
	.featured-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;
	}
	.featured-item {
		text-align: center;
		padding: 1rem;
	}
	.featured-icon {
		width: 80px;
		height: 80px;
		background: linear-gradient(135deg, var(--primary, #7c3aed), #1f2937);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		color: white;
		margin: 0 auto 0.75rem;
	}
	.featured-label {
		font-size: 1rem;
		font-weight: 500;
		color: #374151;
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
