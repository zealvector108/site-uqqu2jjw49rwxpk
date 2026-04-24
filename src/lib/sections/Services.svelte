<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const services = $derived(content.services || []);
	const primaryColor = $derived(content.primaryColor || "#7c3aed");
	const columns = $derived(section.columns || 3);

	function selectElement(path, data, meta) {
		if (editable) {
			onElementSelect(path, data, meta);
		}
	}
</script>

<section class="services-section" style="--primary: {primaryColor};">
	<div class="container">
		{#if section.title}<h2 class="section-title">{section.title}</h2>{/if}
		{#if !section.title}<h2 class="section-title">Our Services</h2>{/if}
		{#if services.length > 0}
			<div class="services-grid" style="--cols: {columns};">
				{#each services as service, idx}
					<div
						class="service-card"
						data-editable
						onclick={() =>
							selectElement(`services.${idx}`, service, {
								displayName: service.name || "Service",
								type: "service",
							})}
					>
						{#if service.popular}
							<span
								class="popular-badge"
								style="background-color: {primaryColor};"
								>Most Popular</span
							>
						{/if}
						<div
							data-editable
							onclick={(e) => {
								e.stopPropagation();
								selectElement(
									`services.${idx}.name`,
									service.name,
									{
										displayName: "Service Name",
										type: "text",
									},
								);
							}}
						>
							<h3 class="service-name">{service.name}</h3>
						</div>
						<div
							data-editable
							onclick={(e) => {
								e.stopPropagation();
								selectElement(
									`services.${idx}.description`,
									service.description,
									{
										displayName: "Description",
										type: "text",
									},
								);
							}}
						>
							<p class="service-desc">
								{service.description || ""}
							</p>
						</div>
						<div
							data-editable
							onclick={(e) => {
								e.stopPropagation();
								selectElement(
									`services.${idx}.priceFrom`,
									service.priceFrom,
									{ displayName: "Price", type: "number" },
								);
							}}
						>
							<div
								class="service-price"
								style="color: {primaryColor};"
							>
								£{service.priceFrom || service.price || 0}
							</div>
						</div>
						{#if service.durationHours && service.durationHours !== "N/A"}
							<div
								data-editable
								onclick={(e) => {
									e.stopPropagation();
									selectElement(
										`services.${idx}.durationHours`,
										service.durationHours,
										{
											displayName: "Duration",
											type: "text",
										},
									);
								}}
							>
								<div class="service-duration">
									⏱ {service.durationHours}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Services coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.services-section {
		padding: 4rem 1rem;
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
		margin-bottom: 3rem;
		color: #111827;
	}
	.services-grid {
		display: grid;
		grid-template-columns: repeat(var(--cols, 3), 1fr);
		gap: 2rem;
	}
	.service-card {
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		padding: 2rem;
		position: relative;
		cursor: pointer;
		transition: outline 0.15s ease;
		outline: 2px solid transparent;
		outline-offset: 2px;
	}
	.service-card:hover {
		outline: 2px dashed rgba(124, 58, 237, 0.5);
	}
	.popular-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.service-name {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #111827;
	}
	.service-desc {
		color: #6b7280;
		margin-bottom: 1rem;
		line-height: 1.6;
	}
	.service-price {
		font-size: 2rem;
		font-weight: 800;
	}
	.service-duration {
		color: #9ca3af;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}
	.empty-note {
		text-align: center;
		color: #9ca3af;
	}
	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
