<script lang="ts">
	import { onMount } from 'svelte';

	// The page is prerendered, so the clock is filled in on the client where the
	// browser's own time zone is available.
	let now: Date | null = $state(null);

	onMount(() => {
		now = new Date();
		const tick = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(tick);
	});

	const dayTime = new Intl.DateTimeFormat(undefined, {
		weekday: 'long',
		hour: 'numeric',
		minute: '2-digit',
		timeZoneName: 'short'
	});
	const year = new Intl.DateTimeFormat(undefined, { year: 'numeric' });

	const localTime = $derived(now ? `${dayTime.format(now)} ${year.format(now)}` : '');
</script>

<ul>
	<li><a target="_blank" href="https://github.com/kyleconkright">GitHub</a></li>
	<li><a target="_blank" href="https://linkedin.com/in/kyleconkright">LinkedIn</a></li>
	<li>
		<a target="_blank" href="https://www.producthunt.com/products/other-supply?launch=other-supply"
			>Product Hunt</a
		>
	</li>
	<li>
		{#if now}
			<time datetime={now.toISOString()}>{localTime}</time>
		{/if}
	</li>
</ul>

<style>
	ul {
		font-size: var(--font-sm);
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
		padding-block: var(--space-2);
	}
	li {
		grid-column: span 3;
		font-weight: 600;
		color: var(--soft-black);
	}
</style>
