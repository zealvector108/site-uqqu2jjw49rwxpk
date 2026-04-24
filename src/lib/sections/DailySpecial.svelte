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

	let dish = $derived(section.dish || "Grilled Salmon");
	let price = $derived(section.price || 24);
	let description = $derived(
		section.description ||
			"Served with seasonal vegetables and lemon butter sauce.",
	);
	let image = $derived(
		section.image ||
			"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800",
	);

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="daily-special-section">
	<div class="container">
		<div class="special-layout">
			<div class="special-image">
				<EditableImage
					src={image}
					{editable}
					onupdate={(v) => onUpdate({ ...section, image: v })}
					class="special-img"
				/>
			</div>
			<div
				class="special-content"
				class:editable
				data-editable="daily-special"
				onclick={() => selectElement("daily-special", section)}
			>
				<span
					class="special-label"
					style="color: {content.primaryColor};">Today's Special</span
				>
				<EditableText
					value={dish}
					{editable}
					onupdate={(v) => onUpdate({ ...section, dish: v })}
					class="special-dish"
				/>
				<EditableText
					value={description}
					{editable}
					onupdate={(v) => onUpdate({ ...section, description: v })}
					class="special-desc"
				/>
				<p class="special-price" style="color: {content.primaryColor};">
					£{price}
				</p>
				<button
					class="special-button"
					style="background-color: {content.primaryColor};"
					>Order Now</button
				>
			</div>
		</div>
	</div>
</section>

<style>
	.daily-special-section {
		padding: 4rem 1rem;
		background: white;
	}
	.container {
		max-width: 1140px;
		margin: 0 auto;
	}
	.special-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}
	.special-img {
		width: 100%;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	.special-label {
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.special-dish {
		font-size: 2.5rem;
		font-weight: 800;
		color: #111827;
		margin-top: 0.5rem;
	}
	.special-desc {
		color: #6b7280;
		margin-top: 1rem;
		line-height: 1.6;
	}
	.special-price {
		font-size: 2.5rem;
		font-weight: 800;
		margin-top: 1.5rem;
	}
	.special-button {
		margin-top: 1.5rem;
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 9999px;
		color: white;
		font-weight: 600;
		cursor: pointer;
	}
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed var(--primary, #7c3aed);
		outline-offset: 4px;
	}
	@media (max-width: 768px) {
		.special-layout {
			grid-template-columns: 1fr;
		}
		.special-dish,
		.special-price {
			font-size: 1.75rem;
		}
	}
</style>
