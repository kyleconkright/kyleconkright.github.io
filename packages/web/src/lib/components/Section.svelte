<script lang="ts">
	import type { Snippet } from 'svelte';

	import ScrollTitle from './ScrollTitle.svelte';

	interface Props {
		id: string;
		/** Rendered into the animated ClashDisplay heading. */
		title: Snippet;
		/** See ScrollTitle: 'load' is for the section already in view on arrival. */
		reveal?: 'scroll' | 'load';
		children?: Snippet;
	}

	let { id, title, reveal = 'scroll', children }: Props = $props();
</script>

<section {id}>
	<ScrollTitle {reveal}>{@render title()}</ScrollTitle>
	{#if children}
		<div class="body">{@render children()}</div>
	{/if}
</section>

<style>
	section {
		/* Fills the scrollport, and grows past it when the copy is longer. */
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr min-content;
		padding-block-end: var(--space-2);
	}

	div.body {
		column-count: 3;
		column-gap: var(--page-grid-gap);
		align-self: self-end;

		:global(p:first-child) {
			font-weight: 600;
		}

		:global(p:not(:last-of-type)) {
			margin-block-end: var(--space-2);
		}

		:global(p) {
			font-size: var(--text-s1);
		}
	}
</style>
