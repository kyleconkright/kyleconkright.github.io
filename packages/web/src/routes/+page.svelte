<script lang="ts">
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
		<header>
			<h1>Kyle Conkright</h1>
		</header>
		<WorkNav></WorkNav>
	</main>
	<footer>
		<Footer></Footer>
	</footer>
</div>

<style>
	div.app {
		min-height: 100dvh;
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
		background: var(--grain), light-dark(var(--bg), var(--black));
		border-radius: 0.625rem;
		corner-shape: squircle;
		padding: var(--space-2);
		margin-inline: calc(var(--space-2) * -1);
	}

	header {
		grid-column: content;
	}

	footer {
		grid-row: footer;
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
	}
</style>
