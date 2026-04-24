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

	let people = $derived(section.people || []);

	function updatePerson(index, field, value) {
		const newPeople = structuredClone(people);
		newPeople[index][field] = value;
		onUpdate({ ...section, people: newPeople });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="instructors-section">
	<div class="container">
		<EditableText
			value={section.title || "Meet Our Instructors"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		{#if people.length > 0}
			<div class="instructors-grid">
				{#each people as p, i}
					<div
						class="instructor-card"
						class:editable
						data-editable={`instructor-${i}`}
						onclick={() => selectElement(`instructor-${i}`, p)}
					>
						<EditableImage
							src={p.image}
							{editable}
							onupdate={(v) => updatePerson(i, "image", v)}
							class="instructor-image"
						/>
						<EditableText
							value={p.name}
							{editable}
							onupdate={(v) => updatePerson(i, "name", v)}
							class="instructor-name"
						/>
						{#if p.bio}
							<EditableText
								value={p.bio}
								{editable}
								onupdate={(v) => updatePerson(i, "bio", v)}
								class="instructor-bio"
							/>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty-note">Instructors coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.instructors-section {
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
	.instructors-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 2rem;
	}
	.instructor-card {
		text-align: center;
	}
	.instructor-image {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin: 0 auto 1rem;
	}
	.instructor-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
		margin-bottom: 0.5rem;
	}
	.instructor-bio {
		color: #6b7280;
		font-size: 0.875rem;
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
