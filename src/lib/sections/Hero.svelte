<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const style = $derived(section.style || "center");
	const heroImage = $derived(content.heroImageUrl || "");
	const businessName = $derived(content.businessName || "");
	const tagline = $derived(content.tagline || "");
	const primaryColor = $derived(content.primaryColor || "#7c3aed");

	function selectElement(path, data, meta) {
		if (editable) {
			onElementSelect(path, data, meta);
		}
	}
</script>

<section
	class="hero-section"
	class:fullscreen={style === "fullscreen"}
	class:split={style === "split"}
	class:overlay={style === "overlay"}
	class:minimal={style === "minimal"}
	class:center={style === "center"}
	class:with-demo={style === "with-demo"}
	class:with-stars={style === "with-stars"}
	class:with-button={style === "with-button"}
	style="--primary: {primaryColor}; background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url({heroImage});"
>
	<div class="hero-content">
		{#if style === "with-stars"}
			<div class="stars-deco">✦ ✧ ✦ ✧ ✦</div>
		{/if}
		<div
			data-editable
			onclick={() =>
				selectElement("businessName", content.businessName, {
					displayName: "Business Name",
					type: "text",
				})}
			class="editable-wrapper"
		>
			<h1 class="hero-title">{businessName}</h1>
		</div>
		<div
			data-editable
			onclick={() =>
				selectElement("tagline", content.tagline, {
					displayName: "Tagline",
					type: "text",
				})}
			class="editable-wrapper"
		>
			<p class="hero-tagline">{tagline}</p>
		</div>
		{#if style === "with-button" || style === "center" || style === "with-demo"}
			<button class="hero-cta" style="background-color: {primaryColor};">
				{style === "with-demo" ? "Get Started Free" : "Learn More"}
			</button>
		{/if}
	</div>
</section>

<style>
	.hero-section {
		min-height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		background-size: cover;
		background-position: center;
		color: white;
		padding: 4rem 2rem;
		position: relative;
	}
	.fullscreen {
		min-height: 100vh;
	}
	.split {
		min-height: 80vh;
		justify-content: flex-start;
	}
	.split .hero-content {
		max-width: 50%;
		text-align: left;
		padding-left: 4rem;
	}
	.overlay .hero-content {
		background: rgba(0, 0, 0, 0.6);
		padding: 3rem;
		border-radius: 1rem;
	}
	.minimal {
		min-height: 60vh;
		background: linear-gradient(135deg, var(--primary), #1f2937);
	}
	.minimal .hero-title {
		font-size: 2.5rem;
	}
	.center {
		min-height: 70vh;
	}
	.with-demo {
		min-height: 80vh;
	}
	.with-stars {
		min-height: 80vh;
	}
	.stars-deco {
		font-size: 1.5rem;
		letter-spacing: 1rem;
		margin-bottom: 1rem;
		opacity: 0.7;
	}
	.hero-content {
		max-width: 800px;
		z-index: 1;
	}
	.hero-title {
		font-size: 3.5rem;
		font-weight: 800;
		margin-bottom: 1rem;
		color: #fff;
		line-height: 1.1;
	}
	.hero-tagline {
		font-size: 1.35rem;
		margin-bottom: 2rem;
		opacity: 0.95;
		line-height: 1.5;
	}
	.hero-cta {
		padding: 1rem 2.5rem;
		border: none;
		border-radius: 9999px;
		color: white;
		font-weight: 600;
		font-size: 1.125rem;
		cursor: pointer;
		transition:
			transform 0.2s,
			opacity 0.2s;
	}
	.hero-cta:hover {
		transform: scale(1.05);
	}
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2rem;
		}
		.hero-tagline {
			font-size: 1rem;
		}
		.split .hero-content {
			max-width: 100%;
			padding-left: 1rem;
		}
	}
	.editable-wrapper {
		display: inline-block;
	}
	.editable-wrapper:hover {
		outline: 2px dashed rgba(255, 255, 255, 0.5);
		outline-offset: 4px;
		border-radius: 4px;
	}
</style>
