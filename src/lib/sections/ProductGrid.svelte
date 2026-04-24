<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const products = $derived(content.products || []);
	const primaryColor = $derived(content.primaryColor || "#7c3aed");
	const title = $derived(section.title || "Our Products");

	function selectElement(idx, field) {
		if (!editable) return;
		onElementSelect({
			path: `products.${idx}.${field}`,
			label: field.charAt(0).toUpperCase() + field.slice(1),
		});
	}
</script>

<section class="products-section">
	<div class="container">
		<h2 class="section-title" style="color: {primaryColor};">{title}</h2>
		{#if products.length > 0}
			<div class="products-grid">
				{#each products as product, idx}
					<div
						class="product-card"
						class:editable
						data-editable={editable}
						onclick={() => editable && selectElement(idx, "")}
					>
						{#if product.imageUrl}
							<img
								class="product-image"
								src={product.imageUrl}
								alt={product.name}
								data-editable={editable}
								onclick={(e) => {
									e.stopPropagation();
									editable && selectElement(idx, "imageUrl");
								}}
							/>
						{/if}
						<div class="product-info">
							<h3
								class="product-name"
								data-editable={editable}
								onclick={(e) => {
									e.stopPropagation();
									editable && selectElement(idx, "name");
								}}
							>
								{product.name}
							</h3>
							<p
								class="product-desc"
								data-editable={editable}
								onclick={(e) => {
									e.stopPropagation();
									editable &&
										selectElement(idx, "description");
								}}
							>
								{product.description || ""}
							</p>
							<div
								class="product-price"
								style="color: {primaryColor};"
								data-editable={editable}
								onclick={(e) => {
									e.stopPropagation();
									editable && selectElement(idx, "price");
								}}
							>
								£{product.price}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Products coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.products-section {
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
	}
	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
	}
	.product-card {
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s;
	}
	.product-card:hover {
		transform: translateY(-4px);
	}
	.product-card.editable {
		cursor: pointer;
	}
	.product-card.editable:hover {
		outline: 2px dashed #7c3aed;
		outline-offset: 2px;
	}
	.product-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}
	.product-info {
		padding: 1.5rem;
	}
	.product-name {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #111827;
	}
	.product-desc {
		color: #6b7280;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}
	.product-price {
		font-size: 1.5rem;
		font-weight: 800;
	}
	.empty-note {
		text-align: center;
		color: #9ca3af;
	}
	@media (max-width: 768px) {
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
