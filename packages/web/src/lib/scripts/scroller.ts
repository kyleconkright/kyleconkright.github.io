import { getContext, setContext } from 'svelte';

const KEY = Symbol('scroller');

export interface ScrollerContext {
	/** The element that owns the scrollbar, once it has been bound. */
	readonly element: HTMLElement | undefined;
}

export function setScroller(context: ScrollerContext) {
	setContext(KEY, context);
}

/**
 * Returns the scroll container the nearest ancestor registered, or undefined
 * when a component is used outside one (ScrollTrigger then falls back to the
 * window, which is the right default).
 */
export function getScroller(): ScrollerContext | undefined {
	return getContext<ScrollerContext | undefined>(KEY);
}
