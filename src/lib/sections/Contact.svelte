<script>
	let {
		section,
		content,
		editable = false,
		onElementSelect = () => {},
	} = $props();

	const layout = $derived(section.layout || "default");

	function selectElement(path, event) {
		if (!editable) return;
		onElementSelect(path, event);
	}
</script>

<section
	class="contact-section"
	class:form-right={layout === "form-right"}
	class:form-left={layout === "form-left"}
	class:simple={layout === "simple"}
>
	<div class="container">
		{#if section.title}<h2 class="section-title">{section.title}</h2>{/if}
		{#if !section.title}<h2 class="section-title">Contact Us</h2>{/if}
		<div class="contact-grid">
			<div class="contact-info" class:form-left={layout === "form-left"}>
				<div class="contact-details">
					{#if content.email}
						<p
							data-editable={editable ? "email" : undefined}
							class:editable
							onclick={(e) => selectElement("email", e)}
						>
							<span aria-hidden="true">✉</span>
							{content.email}
						</p>
					{/if}
					{#if content.phone}
						<p
							data-editable={editable ? "phone" : undefined}
							class:editable
							onclick={(e) => selectElement("phone", e)}
						>
							<span aria-hidden="true">☏</span>
							{content.phone}
						</p>
					{/if}
					{#if content.address}
						<p
							data-editable={editable ? "address" : undefined}
							class:editable
							onclick={(e) => selectElement("address", e)}
						>
							<span aria-hidden="true">◉</span>
							{content.address}
						</p>
					{/if}
					{#if content.hours}
						<p
							data-editable={editable ? "hours" : undefined}
							class:editable
							onclick={(e) => selectElement("hours", e)}
						>
							<span aria-hidden="true">◷</span>
							{content.hours}
						</p>
					{/if}
				</div>
				{#if content.whatsappNumber}
					<a
						href={`https://wa.me/${content.whatsappNumber}`}
						target="_blank"
						rel="noopener noreferrer"
						class="whatsapp-button"
						data-editable={editable ? "whatsappNumber" : undefined}
						class:editable
						onclick={(e) => selectElement("whatsappNumber", e)}
					>
						Chat on WhatsApp
					</a>
				{/if}
			</div>
			{#if layout !== "simple"}
				<div
					class="contact-form-wrapper"
					class:right={layout === "form-right"}
					class:left={layout === "form-left"}
				>
					<form
						class="contact-form"
						onsubmit={(e) => e.preventDefault()}
					>
						<input
							type="text"
							name="name"
							placeholder="Name"
							class="form-input"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							class="form-input"
						/>
						<textarea
							name="message"
							placeholder="Message"
							rows="4"
							class="form-input"
						></textarea>
						<button
							type="submit"
							class="submit-button"
							style="background-color: {content.primaryColor};"
							>Send Message</button
						>
					</form>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-section {
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
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}
	.contact-details p {
		margin-bottom: 0.75rem;
		color: #374151;
		font-size: 1.05rem;
	}
	.contact-details span {
		margin-right: 0.5rem;
	}
	.editable {
		cursor: pointer;
	}
	.editable:hover {
		outline: 2px dashed #7c3aed;
		outline-offset: 2px;
		border-radius: 4px;
	}
	.whatsapp-button {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.75rem 1.5rem;
		background: #25d366;
		border-radius: 9999px;
		color: white;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.2s;
	}
	.whatsapp-button:hover {
		transform: scale(1.05);
	}
	.contact-form-wrapper {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}
	.form-input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}
	.submit-button {
		width: 100%;
		padding: 0.75rem;
		border: none;
		border-radius: 0.5rem;
		color: white;
		font-weight: 600;
		cursor: pointer;
	}
	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
		.section-title {
			font-size: 1.75rem;
		}
	}
</style>
