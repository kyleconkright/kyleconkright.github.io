import adapter from '@sveltejs/adapter-static';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		// Must come before the SvelteKit plugin.
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			paths: {
				// Set by the deploy workflow to '/<repo-name>' when the site is served
				// from a project page rather than <user>.github.io.
				base: process.env.BASE_PATH as '' | `/${string}` | undefined
			},

			// Prerenders every route to static HTML for GitHub Pages.
			// fallback replaces the default GitHub 404 page.
			adapter: adapter({
				fallback: '404.html'
			}),

			prerender: {
				// The work nav links to sections that are still commented out in
				// Content.svelte. Warn rather than fail until they land.
				handleMissingId: 'warn'
			},
			preprocess: vitePreprocess()
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
