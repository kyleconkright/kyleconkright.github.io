<script lang="ts">
	import Content from '$lib/components/Content.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import UtilityData from '$lib/components/UtilityData.svelte';
	import WorkNav from '$lib/components/WorkNav.svelte';
</script>

<svelte:head>
	<title>Kyle Conkright — UX/UI Engineer</title>
	<meta
		name="description"
		content="Kyle Conkright is a UX/UI engineer in Los Angeles. Currently at Splice; previously HitRecord, Event Farm, and Hulu."
	/>
</svelte:head>

<div class="app">
	<UtilityData></UtilityData>
	<main>
		<h1>Kyle Conkright</h1>
		<WorkNav></WorkNav>
		<Content></Content>
	</main>
	<footer>
		<Footer></Footer>
	</footer>
</div>

<style>
	div.app {
		/* Fixed rather than min-height so the content area, not the page, owns
		   the scrollbar. */
		height: 100dvh;
		display: grid;
		grid-template-columns: var(--page-grid-columns);
		grid-template-rows: [utility-start] min-content [utility-end main-start] 1fr [main-end footer-start] min-content [footer-end];
		column-gap: var(--page-grid-gap);
	}

	main {
		grid-column: content;
		grid-row: main;
		display: grid;
		grid-template-rows: 1fr min-content;
		grid-template-columns: subgrid;
		background: var(--grain), light-dark(white, var(--black));
		border-radius: 0.625rem;
		corner-shape: squircle;
		padding: var(--space-2);
		margin-inline: calc(var(--space-2) * -1);
		min-height: 0;
	}

	h1 {
		grid-row: 1;
		grid-column: content;
	}

	footer {
		grid-row: footer;
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
	}
</style>
