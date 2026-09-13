/**
 * Rasterises a CSS colour to an `rgb()` string.
 *
 * GSAP's colour plugin only parses the legacy notations. Handed an `oklch()`
 * value — which is what `--bg` resolves to — it reads the channels as zero,
 * animates towards transparent black, then writes the original string back on
 * the final frame, so the text fades out and snaps back. Giving a tween an
 * endpoint in sRGB avoids that entirely.
 */
export function srgb(color: string): string {
	const context = document.createElement('canvas').getContext('2d', {
		willReadFrequently: true
	});

	if (!context) return color;

	context.fillStyle = color;
	context.fillRect(0, 0, 1, 1);

	const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
	return `rgb(${r}, ${g}, ${b})`;
}
