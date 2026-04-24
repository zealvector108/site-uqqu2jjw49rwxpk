<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let plans = $derived(section.plans || []);

	function updatePlan(index, field, value) {
		const newPlans = structuredClone(plans);
		newPlans[index][field] = value;
		onUpdate({ ...section, plans: newPlans });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="pricing-section" style="--primary: {content.primaryColor};">
	<div class="container">
		<EditableText
			value={section.title || "Pricing Plans"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
		/>
		{#if plans.length > 0}
			<div class="pricing-grid">
				{#each plans as plan, i}
					<div
						class="pricing-card"
						class:popular={plan.popular}
						class:editable
						data-editable={`plan-${i}`}
						onclick={() => selectElement(`plan-${i}`, plan)}
					>
						{#if plan.popular}
							<span
								class="popular-badge"
								style="background-color: {content.primaryColor};"
								>Most Popular</span
							>
						{/if}
						<EditableText
							value={plan.name}
							{editable}
							onupdate={(v) => updatePlan(i, "name", v)}
							class="plan-name"
						/>
						<div
							class="plan-price"
							style="color: {content.primaryColor};"
						>
							£{plan.price}<span class="period"
								>/{plan.period || "month"}</span
							>
						</div>
						<ul class="plan-features">
							{#each plan.features || [] as feature, fi}
								<li class="flex items-center gap-2">
									<svg
										class="check-icon"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/></svg
									>
									<EditableText
										value={feature}
										{editable}
										onupdate={(v) => {
											const newFeatures = [
												...(plan.features || []),
											];
											newFeatures[fi] = v;
											updatePlan(
												i,
												"features",
												newFeatures,
											);
										}}
									/>
								</li>
							{/each}
						</ul>
						<button
							class="plan-cta"
							style="background-color: {plan.popular
								? content.primaryColor
								: 'transparent'}; color: {plan.popular
								? 'white'
								: content.primaryColor}; border: 2px solid {content.primaryColor};"
						>
							Choose {plan.name}
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Pricing coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.pricing-section {
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
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}
	.pricing-card {
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		padding: 2.5rem 2rem;
		text-align: center;
		position: relative;
	}
	.pricing-card.popular {
		border: 2px solid var(--primary);
		transform: scale(1.05);
	}
	.popular-badge {
		position: absolute;
		top: -0.75rem;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		padding: 0.25rem 1rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
	}
	.plan-name {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #111827;
	}
	.plan-price {
		font-size: 3rem;
		font-weight: 800;
		margin-bottom: 1.5rem;
	}
	.period {
		font-size: 1rem;
		font-weight: 400;
		color: #6b7280;
	}
	.plan-features {
		list-style: none;
		padding: 0;
		margin-bottom: 2rem;
		text-align: left;
	}
	.plan-features li {
		padding: 0.5rem 0;
		color: #374151;
		border-bottom: 1px solid #f3f4f6;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.check-icon {
		width: 1.25rem;
		height: 1.25rem;
		color: #22c55e;
		flex-shrink: 0;
	}
	.plan-cta {
		width: 100%;
		padding: 0.75rem;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s;
	}
	.plan-cta:hover {
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
		.pricing-card.popular {
			transform: none;
		}
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
