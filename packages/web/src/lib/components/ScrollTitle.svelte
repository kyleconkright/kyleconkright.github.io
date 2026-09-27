<script lang="ts">
	import type { Snippet } from 'svelte';

	import { gsap, SplitText } from '$lib/gsap';
	import { getScroller } from '$lib/scripts/scroller';

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

	let revealed = $state(false);
	const pending = $derived(reveal === 'load' && !revealed);

	let title: HTMLHeadingElement;

	$effect(() => {
		let scrollerEl: HTMLElement | undefined;

		if (reveal === 'scroll') {
			scrollerEl = scroller?.element;
			if (scroller && !scrollerEl) return;
		}

		let media: ReturnType<typeof gsap.matchMedia> | undefined;
		let cancelled = false;

		document.fonts.ready.then(() => {
			if (cancelled) return;

			media = gsap.matchMedia();

			media.add('(prefers-reduced-motion: no-preference)', () => {
				const split = SplitText.create(title, { type: 'chars, words' });

				gsap.set(split.chars, {
					color: () => `hsl(${gsap.utils.random(180, 260)} 60% 55%)`,
					fontWeight: 900
				});

				gsap.from(split.chars, {
					ease: 'back.out(1.2)',
					stagger: { each: 0.05, from: 'random' },
					yPercent: 'random(-140, -60)',
					opacity: 0,
					duration: 1
				});

				gsap.to(split.chars, {
					rotation: 'random(-3, 3)',
					ease: 'elastic.out(1, 0.4)',
					duration: 1.2,
					stagger: { each: 0.05, from: 'random' }
				});

				// gsap.to(split.chars, { fontWeight: 'random(300, 700)' });

				// return () => split.revert();
			});

			revealed = true;
		});

		return () => {
			cancelled = true;
			media?.revert();
		};
	});
</script>

<h2 bind:this={title} class:pending>{@render children()}</h2>
<h3>Have I really been at it for this long? A brief history of somehow making this a career.</h3>

<style>
	h2 {
		grid-column: 1 / -1;
		font-family: 'Antonio-Variable';
		font-size: 7rem;
		align-self: center;
		letter-spacing: -0.35rem;
	}

	h3 {
		grid-column: 1;
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
