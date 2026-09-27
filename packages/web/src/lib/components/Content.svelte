<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { elapsed } from '$lib/scripts/elapsed';
	import { setScroller } from '$lib/scripts/scroller';

	const tally = elapsed(Date.UTC(2004, 2, 1)); // month is 0-indexed: 2 = March

	// This element owns the scrollbar rather than the page, so the nav, the
	// heading and the footer stay put. ScrollTrigger needs the element itself,
	// which only exists after mount — hand the children a live getter.
	let scroller: HTMLElement | undefined = $state();
	setScroller({
		get element() {
			return scroller;
		}
	});
</script>

<div class="content" bind:this={scroller}>
	<Section id="about" reveal="load">
		{#snippet title()}
			{tally.years} YEARS &amp; {tally.weeks} WEEKS
		{/snippet}

		<p>
			Every job I've held has been in service of musicians. What's changed is how I do the work.
		</p>

		<p>
			I started at Indiana State, finishing a marketing degree in 2006 while already working for MTR
			Management, building websites for musicians and running street team campaigns back when a
			street team was something you organized by hand.
		</p>

		<p>
			Then the road. In July 2006 I went out as tour manager for The Rentals, a fifteen-month run
			that took in Voodoo in New Orleans and Sonorama in Aranda de Duero, Spain. In 2008 I did five
			tours with Eric Hutchinson, opening for Jack's Mannequin, Missy Higgins and Blind Melon before
			moving to headline runs, where I managed the support acts too. That year also brought
			television bookings, The Tonight Show with Jay Leno among them. Tour managing is logistics
			with a hard deadline attached. The truck arrives when it arrives and the show starts at eight.
		</p>

		<p>
			I came off the road in 2009 and spent two years at The Planetary Group as a web developer,
			building sites and online stores for artists. A year at Hulu followed, supervising customer
			service in Santa Monica. The tell is in what I did there. I designed the internal dashboards
			my department watched and worked on the research for adding chat support to hulu.com, which is
			not the job description.
		</p>

		<p>
			From late 2012 I was the front end engineer at Soundfreaq, leading the work across the speaker
			company's web properties while taking freelance projects on the side. Angular and Node apps
			for some clients, hand-rolled Shopify themes for others. In 2015 I made it official with a
			twelve-week immersive at General Assembly.
		</p>

		<p>
			The engineering roles line up neatly after that. Two years at Event Farm. Three at hitRECord,
			Joseph Gordon-Levitt's collaborative production company, which exited to MasterClass in 2022.
			Since December 2021 I've been a senior software engineer at Splice, where the people on the
			other side of my interfaces are producers pulling samples into a session. The day-to-day is
			SvelteKit, Svelte 5, TypeScript and GraphQL.
		</p>

		<p>
			I build my own things too. Other Supply started from an ordinary annoyance. Shopping for
			records online meant a dozen tabs across a dozen shops, so I wrote something that pulls new
			arrivals from all of them into one feed.
		</p>

		<p>
			I live in Los Angeles. Off the clock I'm usually on a long walk in the neighborhood, at a
			Dodgers game, or flipping through the recent arrivals bins of a record store. <span
				aria-hidden="true">&#9632;</span
			>
		</p>
	</Section>

	<!-- Titles only for now. Copy for each one goes in as children, the way the
	     about section above does it. -->
	<!-- {#each sections as section (section.id)}
		<Section id={section.id}>
			{#snippet title()}{section.label}{/snippet}
		</Section>
	{/each} -->
</div>

<style>
	div.content {
		grid-row: 1 / -1;
		grid-column: 4 / -1;
		color: var(--bg);
		overflow-y: auto;
		overscroll-behavior: contain;
		scroll-behavior: smooth;
		/* Grid items floor at min-height: auto, which would push the row open
		   instead of letting this scroll. */
		min-height: 0;
		scrollbar-width: none;
	}

	div.content::-webkit-scrollbar {
		display: none;
	}
</style>
