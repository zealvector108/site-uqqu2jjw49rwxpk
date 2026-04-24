<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const testimonials = $derived(content.testimonials || []);
	const primaryColor = $derived(content.primaryColor || "#7c3aed");

	function selectElement(e, path) {
		if (!editable) return;
		e.stopPropagation();
		onElementSelect(path, e.target);
	}

	// Duplicate list for seamless marquee loop
	const marqueeItems = $derived([...testimonials, ...testimonials]);
	const speed = $derived(Math.max(20, testimonials.length * 6));
</script>

<section class="testimonials-section">
	<div class="container">
		{#if section.title}<h2 class="section-title">{section.title}</h2>
		{:else}<h2 class="section-title">What Our Clients Say</h2>{/if}

		{#if testimonials.length > 0}
			<div class="marquee">
				<div
					class="marquee-track"
					style="animation-duration: {speed}s;"
				>
					{#each marqueeItems as t, i}
						{@const idx = i % testimonials.length}
						<div
							class="testimonial-card"
							class:editable
							data-editable="testimonials.{idx}"
							onclick={(e) =>
								selectElement(e, `testimonials.${idx}`)}
						>
							<div
								class="stars"
								style="color: {primaryColor};"
							>
								{#each Array(t.rating || 5) as _}★{/each}
							</div>
							<p class="testimonial-text">"{t.text}"</p>
							<p class="testimonial-author">
								— {t.author || t.name || "Anonymous"}
							</p>
							{#if t.location}
								<p class="testimonial-location">{t.location}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<p class="empty-note">Testimonials coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.testimonials-section {
		padding: 4rem 0;
		background: white;
		overflow: hidden;
	}
	.container {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 1rem;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 3rem;
		color: #111827;
	}

	.marquee {
		width: 100%;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 8%,
			black 92%,
			transparent
		);
		mask-image: linear-gradient(
			to right,
			transparent,
			black 8%,
			black 92%,
			transparent
		);
	}
	.marquee-track {
		display: flex;
		flex-wrap: nowrap;
		width: max-content;
		animation: marquee-scroll linear infinite;
	}
	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.testimonial-card {
		flex: 0 0 auto;
		width: 340px;
		margin: 0 0.75rem;
		background: #f9fafb;
		border-radius: 1rem;
		padding: 2rem;
		transition:
			box-shadow 0.3s,
			outline 0.15s;
	}
	.testimonial-card:hover {
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
	}
	.testimonial-card.editable {
		cursor: pointer;
	}
	.testimonial-card.editable:hover {
		outline: 2px dashed #7c3aed;
		outline-offset: 2px;
	}
	.stars {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
	}
	.testimonial-text {
		color: #374151;
		line-height: 1.6;
		margin-bottom: 1rem;
		font-style: italic;
	}
	.testimonial-author {
		font-weight: 600;
		color: #111827;
	}
	.testimonial-location {
		color: #9ca3af;
		font-size: 0.875rem;
	}
	.empty-note {
		text-align: center;
		color: #9ca3af;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-track {
			animation: none;
		}
	}
	@media (max-width: 768px) {
		.section-title {
			font-size: 1.75rem;
		}
		.testimonial-card {
			width: 280px;
			padding: 1.5rem;
		}
	}
</style>
