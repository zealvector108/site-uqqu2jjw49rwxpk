<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let categories = $derived(section.categories || []);

	function updateCategory(index, field, value) {
		const newCats = structuredClone(categories);
		newCats[index][field] = value;
		onUpdate({ ...section, categories: newCats });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="menu-section">
	<div class="container">
		<EditableText
			value={section.title || "Our Menu"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		{#if categories.length > 0}
			<div class="menu-grid">
				{#each categories as cat, i}
					<div
						class="menu-card"
						class:editable
						data-editable={`menu-${i}`}
						onclick={() => selectElement(`menu-${i}`, cat)}
					>
						<div class="menu-icon">{cat.icon || "🍽️"}</div>
						<EditableText
							value={cat.name}
							{editable}
							onupdate={(v) => updateCategory(i, "name", v)}
							class="menu-name"
						/>
						<EditableText
							value={cat.description || ""}
							{editable}
							onupdate={(v) =>
								updateCategory(i, "description", v)}
							class="menu-desc"
						/>
						<button
							class="menu-button"
							style="color: {content.primaryColor};"
							>View →</button
						>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Menu coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.menu-section {
		padding: 4rem 1rem;
		background: #f3f4f6;
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
	.menu-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 2rem;
	}
	.menu-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: box-shadow 0.2s;
	}
	.menu-card:hover {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
	}
	.menu-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}
	.menu-name {
		font-size: 1.5rem;
		font-weight: 700;
		color: #111827;
	}
	.menu-desc {
		color: #6b7280;
		margin-top: 0.5rem;
	}
	.menu-button {
		margin-top: 1rem;
		background: none;
		border: none;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
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
