<div class="utility">
	<ul>
		<li>UX/UI Engineer</li>
		<li>Los Angeles, CA</li>
	</ul>
</div>

<style>
	div.utility {
		grid-column: full;
		grid-row: utility;
		display: grid;
		grid-template-columns: subgrid;
		padding-block: var(--space-2);
	}

	ul {
		grid-column: content;
		display: grid;
		grid-template-columns: subgrid;
		align-items: center;
	}

	li {
		color: var(--soft-black);
		font-weight: 600;
		font-size: var(--font-sm);
		grid-column: span 3;
	}
</style>
