<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	let timetable = $derived(section.timetable || []);

	function updateRow(index, field, value) {
		const newRows = structuredClone(timetable);
		newRows[index][field] = value;
		onUpdate({ ...section, timetable: newRows });
	}

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="schedule-section">
	<div class="container">
		<EditableText
			value={section.title || "Class Schedule"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		{#if timetable.length > 0}
			<table class="schedule-table">
				<thead>
					<tr>
						<th>Day</th>
						<th>Time</th>
						<th>Class</th>
					</tr>
				</thead>
				<tbody>
					{#each timetable as row, i}
						<tr
							class:editable
							data-editable={`schedule-${i}`}
							onclick={() => selectElement(`schedule-${i}`, row)}
						>
							<td
								><EditableText
									value={row.day}
									{editable}
									onupdate={(v) => updateRow(i, "day", v)}
								/></td
							>
							<td
								><EditableText
									value={row.time}
									{editable}
									onupdate={(v) => updateRow(i, "time", v)}
								/></td
							>
							<td
								><EditableText
									value={row.class}
									{editable}
									onupdate={(v) => updateRow(i, "class", v)}
								/></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="empty-note">Schedule coming soon.</p>
		{/if}
	</div>
</section>

<style>
	.schedule-section {
		padding: 4rem 1rem;
		background: #f9fafb;
	}
	.container {
		max-width: 800px;
		margin: 0 auto;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 3rem;
		color: #111827;
	}
	.schedule-table {
		width: 100%;
		border-collapse: collapse;
		background: white;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}
	.schedule-table th {
		background: var(--primary, #7c3aed);
		color: white;
		padding: 1rem;
		text-align: left;
		font-weight: 600;
	}
	.schedule-table td {
		padding: 1rem;
		border-bottom: 1px solid #f3f4f6;
		color: #374151;
	}
	.schedule-table tr:last-child td {
		border-bottom: none;
	}
	.schedule-table tr:hover {
		background: #f9fafb;
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
