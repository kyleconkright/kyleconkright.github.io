<script lang="ts">
	import { current, previous } from '$lib/data/sections';
</script>

<dl>
	<div>
		<dt>Current</dt>
		<dd></dd>
		{#each current as section (section.id)}
			<dd><a href="#{section.id}">{section.label}</a></dd>
		{/each}
	</div>
	<div>
		<dt>Previous</dt>
		{#each previous as section (section.id)}
			<dd><a href="#{section.id}">{section.label}</a></dd>
		{/each}
	</div>
</dl>

<style>
	dl {
		grid-column: 1 / 4;
		grid-row: 2;
		display: grid;
		gap: var(--page-grid-gap);
		grid-template-columns: subgrid;
	}

	dl div {
		grid-column: 1 / 3;
	}

	dt {
		/* font-weight: 600; */
	}
</style>
