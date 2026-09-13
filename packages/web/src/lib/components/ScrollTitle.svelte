<script lang="ts">
	import type { Snippet } from 'svelte';

	import { gsap, SplitText } from '$lib/gsap';
	import { getScroller } from '$lib/scripts/scroller';
	import { srgb } from '$lib/scripts/srgb';

	interface Props {
		children: Snippet;
		/**
		 * 'scroll' scrubs the characters in as the title enters the scrollport.
		 * 'load' drops them once on mount, for the title already in view.
		 */
		reveal?: 'scroll' | 'load';
	}

	let { children, reveal = 'scroll' }: Props = $props();

	const scroller = getScroller();

	// A 'load' title ships hidden in the prerendered markup, so the first paint
	// never shows it settled — or set in the fallback face — before it falls.
	// Hiding it from the effect instead would be a frame too late.
	let revealed = $state(false);
	const pending = $derived(reveal === 'load' && !revealed);

	let title: HTMLHeadingElement;

	$effect(() => {
		// Only the scroll reveal needs the container, and reading it is what makes
		// this effect reactive: it goes undefined -> element once bind:this lands,
		// which re-runs the effect. Reading it on the load path too would tear the
		// split down and play the fall a second time.
		let scrollerEl: HTMLElement | undefined;

		if (reveal === 'scroll') {
			// ScrollTrigger has to be pointed at the element that owns the
			// scrollbar rather than the window. Wait for it to bind.
			scrollerEl = scroller?.element;
			if (scroller && !scrollerEl) return;
		}

		let media: ReturnType<typeof gsap.matchMedia> | undefined;
		let cancelled = false;

		// SplitText measures each character, so it has to run against
		// ClashDisplay rather than the fallback face it would otherwise catch.
		document.fonts.ready.then(() => {
			if (cancelled) return;

			media = gsap.matchMedia();

			media.add('(prefers-reduced-motion: no-preference)', () => {
				const split = SplitText.create(title, { type: 'chars, words' });

				// from() takes its endpoint from whatever the characters currently
				// are, so pin them to an sRGB copy of the inherited colour first.
				// Left as oklch, GSAP fades them to transparent and snaps them back.
				gsap.set(split.chars, { color: srgb(getComputedStyle(title).color) });

				const fall = {
					rotation: 'random(-20, 20)',
					color: () => `hsl(${gsap.utils.random(0, 360)} 80% 60%)`,
					ease: 'back.out(1.2)',
					stagger: 0.05
				};

				gsap.from(
					split.chars,
					reveal === 'load'
						? {
								...fall,
								// The title sits flush with the top of the scrollport, which
								// clips everything above it. Keep the drop inside a couple of
								// line heights and fade in, so the fall is seen rather than
								// happening off-screen.
								yPercent: 'random(-140, -60)',
								opacity: 0,
								duration: 1
							}
						: {
								...fall,
								yPercent: 'random(-500, -100)',
								scrollTrigger: {
									trigger: title,
									scroller: scrollerEl,
									// Scattered when the title enters from the bottom, settled
									// by the time it reaches 60%. A title already in view on
									// load is past the end, so it renders settled rather than
									// mid-flight.
									start: 'top bottom',
									end: 'top 60%',
									scrub: 1
								}
							}
				);

				gsap.to(split.chars, { fontWeight: 'random(300, 700)' });

				return () => split.revert();
			});

			// from() renders its start state synchronously, so by now the characters
			// are already lifted and transparent. Reduced motion skips the block
			// above entirely and just uncovers the heading.
			revealed = true;
		});

		return () => {
			cancelled = true;
			media?.revert();
		};
	});
</script>

<h2 bind:this={title} class:pending>{@render children()}</h2>

<style>
	h2 {
		grid-column: 1 / -1;
		font-family: 'ClashDisplay-Variable';
		font-size: var(--text-h1);
		font-weight: 600;
		align-self: center;
	}

	h2.pending {
		visibility: hidden;
		/* Nothing uncovers the heading without JS, so give it a way out. */
		animation: uncover 0s linear 2s forwards;
	}

	@keyframes uncover {
		to {
			visibility: visible;
		}
	}
</style>
