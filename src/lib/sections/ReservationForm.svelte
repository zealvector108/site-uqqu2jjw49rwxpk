<script>
	import EditableText from "$lib/components/EditableText.svelte";

	let {
		section,
		content,
		editable = false,
		onUpdate,
		onElementSelect = () => {},
	} = $props();

	function selectElement(elementId, element) {
		if (editable) {
			onElementSelect(elementId, element);
		}
	}
</script>

<section class="reservation-section">
	<div class="container">
		<EditableText
			value={section.title || "Make a Reservation"}
			{editable}
			onupdate={(v) => onUpdate({ ...section, title: v })}
			class="section-title"
			style="color: {content.primaryColor};"
		/>
		<form
			class="reservation-form"
			class:editable
			data-editable="reservation-form"
			onclick={() => selectElement("reservation-form", section)}
			onsubmit={(e) => e.preventDefault()}
		>
			<div class="form-grid">
				<input
					type="text"
					name="name"
					placeholder="Full Name"
					class="form-input"
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					class="form-input"
					required
				/>
				<input
					type="tel"
					name="phone"
					placeholder="Phone"
					class="form-input"
				/>
				<input type="date" name="date" class="form-input" required />
				<input type="time" name="time" class="form-input" required />
				<select name="guests" class="form-input">
					<option>1 guest</option>
					<option>2 guests</option>
					<option>3 guests</option>
					<option>4+ guests</option>
				</select>
			</div>
			<textarea
				name="requests"
				placeholder="Special requests"
				class="form-textarea"
				rows="3"
			></textarea>
			<button
				type="submit"
				class="form-submit"
				style="background-color: {content.primaryColor};"
				>Reserve Table</button
			>
		</form>
	</div>
</section>

<style>
	.reservation-section {
		padding: 4rem 1rem;
		background: #f9fafb;
	}
	.container {
		max-width: 700px;
		margin: 0 auto;
	}
	.section-title {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 2rem;
		color: #111827;
	}
	.reservation-form {
		background: white;
		padding: 2.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}
	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
	}
	.form-textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		margin-top: 1rem;
	}
	.form-submit {
		width: 100%;
		padding: 1rem;
		border: none;
		border-radius: 0.5rem;
		color: white;
		font-weight: 600;
		font-size: 1.125rem;
		cursor: pointer;
		margin-top: 1rem;
	}
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed var(--primary, #7c3aed);
		outline-offset: 4px;
	}
	@media (max-width: 768px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
