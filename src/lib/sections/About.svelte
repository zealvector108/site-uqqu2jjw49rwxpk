<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const layout = $derived(section.layout || "image-right");
	const values = $derived(section.values || []);

	function selectElement(path, event) {
		if (!editable) return;
		event.stopPropagation();
		onElementSelect(path);
	}
</script>

<section
	class="about-section"
	class:image-left={layout === "image-left"}
	class:image-right={layout === "image-right"}
	class:three-columns={layout === "three-columns"}
>
	<div class="container">
		{#if layout === "three-columns" && values.length > 0}
			<h2 class="section-title">Our Values</h2>
			<div class="values-grid">
				{#each values as value, idx}
					<div
						class="value-card"
						class:editable
						data-editable={`values.${idx}`}
						onclick={(e) => selectElement(`values.${idx}`, e)}
					>
						<h3 class="value-name">{value}</h3>
					</div>
				{/each}
			</div>
		{:else}
			<div class="about-content">
				{#if layout === "image-left"}
					<div
						class="about-image-wrapper"
						class:editable
						data-editable="aboutImageUrl"
						onclick={(e) => selectElement("aboutImageUrl", e)}
					>
						{#if content.aboutImageUrl}
							<img
								class="about-img"
								src={content.aboutImageUrl}
								alt="About"
							/>
						{:else}
							<div
								class="about-img-placeholder"
								style="background: linear-gradient(135deg, {content.primaryColor}, #1f2937);"
							></div>
						{/if}
					</div>
					<div
						class="about-text"
						class:editable
						data-editable="aboutText"
						onclick={(e) => selectElement("aboutText", e)}
					>
						<h2 class="section-title-left">
							About {content.businessName}
						</h2>
						<p class="about-content">{content.aboutText || ""}</p>
					</div>
				{:else}
					<div
						class="about-text"
						class:editable
						data-editable="aboutText"
						onclick={(e) => selectElement("aboutText", e)}
					>
						<h2 class="section-title-left">
							About {content.businessName}
						</h2>
						<p class="about-content">{content.aboutText || ""}</p>
					</div>
					<div
						class="about-image-wrapper"
						class:editable
						data-editable="aboutImageUrl"
						onclick={(e) => selectElement("aboutImageUrl", e)}
					>
						{#if content.aboutImageUrl}
							<img
								class="about-img"
								src={content.aboutImageUrl}
								alt="About"
							/>
						{:else}
							<div
								class="about-img-placeholder"
								style="background: linear-gradient(135deg, {content.primaryColor}, #1f2937);"
							></div>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.about-section {
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
	.section-title-left {
		font-size: 2.5rem;
		font-weight: 800;
		margin-bottom: 1.5rem;
		color: #111827;
	}
	.about-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}
	.about-text {
		order: 1;
	}
	.image-left .about-text {
		order: 2;
	}
	.about-image-wrapper {
		order: 2;
	}
	.image-left .about-image-wrapper {
		order: 1;
	}
	.about-img {
		width: 100%;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	.about-img-placeholder {
		width: 100%;
		height: 300px;
		border-radius: 1rem;
	}
	.about-content p {
		color: #374151;
		line-height: 1.75;
		font-size: 1.125rem;
	}
	.values-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}
	.value-card {
		background: #f9fafb;
		border-radius: 1rem;
		padding: 2rem;
		text-align: center;
	}
	.value-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
	}
	/* Click-to-edit styles */
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed #7c3aed;
		outline-offset: 4px;
	}
	@media (max-width: 768px) {
		.about-content {
			grid-template-columns: 1fr;
		}
		.section-title,
		.section-title-left {
			font-size: 1.75rem;
		}
		.values-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
