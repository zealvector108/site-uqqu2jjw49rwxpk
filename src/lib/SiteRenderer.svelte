<script>
	import Hero from "./sections/Hero.svelte";
	import Services from "./sections/Services.svelte";
	import ProductGrid from "./sections/ProductGrid.svelte";
	import Pricing from "./sections/Pricing.svelte";
	import Testimonials from "./sections/Testimonials.svelte";
	import About from "./sections/About.svelte";
	import Contact from "./sections/Contact.svelte";
	import FeaturedCollection from "./sections/FeaturedCollection.svelte";
	import Portfolio from "./sections/Portfolio.svelte";
	import Schedule from "./sections/Schedule.svelte";
	import Instructors from "./sections/Instructors.svelte";
	import Gallery from "./sections/Gallery.svelte";
	import Waitlist from "./sections/Waitlist.svelte";
	import Footer from "./sections/Footer.svelte";
	import MenuGrid from "./sections/MenuGrid.svelte";
	import DailySpecial from "./sections/DailySpecial.svelte";
	import ReservationForm from "./sections/ReservationForm.svelte";

	let { content, pageSlug = null } = $props();

	const sectionComponentMap = {
		hero: Hero,
		services: Services,
		features: Services,
		productGrid: ProductGrid,
		pricing: Pricing,
		testimonials: Testimonials,
		about: About,
		contact: Contact,
		featuredCollection: FeaturedCollection,
		portfolio: Portfolio,
		schedule: Schedule,
		instructors: Instructors,
		gallery: Gallery,
		waitlist: Waitlist,
		menuGrid: MenuGrid,
		dailySpecial: DailySpecial,
		reservationForm: ReservationForm,
		footer: Footer,
	};

	const pages = content.pages || [{ slug: "home", name: "Home", sections: content.sections || defaultSections() }];

	function defaultSections() {
		return [
			{ type: "hero" },
			{ type: "services" },
			{ type: "testimonials" },
			{ type: "about" },
			{ type: "contact" },
			{ type: "footer" },
		];
	}

	let activePage = $derived(
		pageSlug
			? pages.find((p) => p.slug === pageSlug) || pages[0]
			: pages[0]
	);

	let sections = $derived(activePage?.sections || defaultSections());

	let allSections = $derived(
		sections.some((s) => s.type === "footer")
			? sections
			: [...sections, { type: "footer" }]
	);

	function pageHref(slug) {
		return slug === pages[0].slug ? "/" : `/${slug}`;
	}
</script>

<div
	class="site-wrapper"
	style="--primary: {content.primaryColor || '#7c3aed'}; font-family: '{content.font || 'Inter'}', sans-serif;"
>
	<nav class="site-nav">
		<div class="nav-inner">
			<a href="/" class="nav-logo">{content.businessName || 'Website'}</a>
			<div class="nav-links">
				{#if pages.length > 1}
					{#each pages as p}
						<a
							href={pageHref(p.slug)}
							class="nav-link"
							class:active={p.slug === activePage.slug}
						>
							{p.name}
						</a>
					{/each}
				{:else}
					<a href="/" class="nav-link active">Home</a>
				{/if}
			</div>
		</div>
	</nav>

	{#each allSections as section}
		<div id="section-{section.type}">
			{#if sectionComponentMap[section.type]}
				<svelte:component
					this={sectionComponentMap[section.type]}
					{section}
					{content}
					editable={false}
				/>
			{/if}
		</div>
	{/each}
</div>

<style>
	.site-wrapper {
		min-height: 100vh;
		color: #111827;
		background: #fff;
		overflow-x: hidden;
		position: relative;
	}
	.site-nav {
		position: sticky;
		top: 0;
		z-index: 40;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}
	.nav-inner {
		max-width: 1140px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 4rem;
		gap: 1rem;
	}
	.nav-logo {
		font-size: 1.25rem;
		font-weight: 800;
		color: #111827;
		text-decoration: none;
	}
	.nav-links {
		display: flex;
		gap: 1rem;
	}
	.nav-link {
		background: transparent;
		border: none;
		color: #374151;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		font-size: 0.95rem;
		cursor: pointer;
		text-decoration: none;
		font-family: inherit;
		transition: color 0.2s, background 0.2s;
	}
	.nav-link:hover {
		color: var(--primary, #7c3aed);
		background: rgba(0, 0, 0, 0.03);
	}
	.nav-link.active {
		color: var(--primary, #7c3aed);
		background: rgba(124, 58, 237, 0.08);
	}
	@media (max-width: 768px) {
		.site-nav {
			position: fixed;
			top: auto;
			bottom: 0;
			left: 0;
			right: 0;
			box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
			padding-bottom: env(safe-area-inset-bottom);
		}
		.nav-inner {
			height: 3.5rem;
			justify-content: space-around;
			padding: 0 0.5rem;
			gap: 0.5rem;
		}
		.nav-logo {
			display: none;
		}
		.nav-links {
			display: flex;
			flex: 1;
			justify-content: space-around;
			gap: 0.25rem;
		}
		.nav-link {
			padding: 0.4rem 0.5rem;
			font-size: 0.85rem;
		}
		.site-wrapper {
			padding-bottom: 4rem;
		}
	}
</style>
