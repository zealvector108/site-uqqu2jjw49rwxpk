<script>
	let { src, class: className = "" } = $props();
</script>

<img
	{src}
	alt=""
	class={className}
	onerror={(e) => (e.target.style.display = "none")}
/>
