<dl>
	<div>
		<dt>Current</dt>
		<dd></dd>
		<dd><a href="#">Splice</a></dd>
	</div>
	<div>
		<dt>Previous</dt>
		<dd><a href="#">HitRecord</a></dd>
		<dd><a href="#">Event Farm</a></dd>
		<dd><a href="#">Hulu</a></dd>
		<dd>Tour Manager</dd>
		<dd>Highlights</dd>
		<dd>Lowlights</dd>
	</div>
</dl>

<style>
	dl {
		grid-column: content;
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
