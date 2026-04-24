<script>
	let { value, multiline = false, color = "", class: className = "" } = $props();
</script>

{#if multiline}
	<p class={className} style={color ? `color: ${color}` : ''}>{value}</p>
{:else}
	<span class={className} style={color ? `color: ${color}` : ''}>{value}</span>
{/if}
