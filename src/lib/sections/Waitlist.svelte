<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let ctaText = $derived(section.cta || "Join the waitlist");
	let subtext = $derived(
		section.subtext || "Be the first to know when we launch.",
	);

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section
	class="waitlist-section"
	style="background-color: {content.primaryColor};"
>
	<div
		class="container"
		class:editable
		data-editable="waitlist"
		onclick={() => selectElement("waitlist", section)}
	>
		<EditableText
			value={ctaText}
			{editable}
			onupdate={(v) => onUpdate({ ...section, cta: v })}
			class="waitlist-title"
		/>
		<EditableText
			value={subtext}
			{editable}
			onupdate={(v) => onUpdate({ ...section, subtext: v })}
			class="waitlist-subtext"
		/>
		<form class="waitlist-form" onsubmit={(e) => e.preventDefault()}>
			<input
				type="email"
				name="email"
				placeholder="Your email address"
				required
				class="waitlist-input"
			/>
			<button
				type="submit"
				class="waitlist-button"
				style="color: {content.primaryColor};">Notify Me</button
			>
		</form>
	</div>
</section>

<style>
	.waitlist-section {
		padding: 4rem 1rem;
	}
	.container {
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
	}
	.waitlist-title {
		font-size: 2.5rem;
		font-weight: 800;
		color: white;
	}
	.waitlist-subtext {
		color: rgba(255, 255, 255, 0.9);
		font-size: 1.125rem;
		margin-top: 1rem;
	}
	.waitlist-form {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}
	.waitlist-input {
		flex: 1;
		padding: 1rem;
		border: none;
		border-radius: 9999px;
		font-size: 1rem;
	}
	.waitlist-button {
		padding: 1rem 2rem;
		border: none;
		border-radius: 9999px;
		background: white;
		font-weight: 600;
		font-size: 1rem;
		cursor: pointer;
		white-space: nowrap;
	}
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed white;
		outline-offset: 4px;
	}
	@media (max-width: 768px) {
		.waitlist-form {
			flex-direction: column;
		}
		.waitlist-title {
			font-size: 1.75rem;
		}
	}
</style>
