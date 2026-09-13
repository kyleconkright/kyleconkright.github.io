export interface Section {
	/** Anchor target, also the nav link's href. */
	id: string;
	label: string;
	group: 'current' | 'previous';
}

export const sections: Section[] = [
	{ id: 'splice', label: 'Splice', group: 'current' },
	{ id: 'hitrecord', label: 'HitRecord', group: 'previous' },
	{ id: 'event-farm', label: 'Event Farm', group: 'previous' },
	{ id: 'hulu', label: 'Hulu', group: 'previous' },
	{ id: 'tour-manager', label: 'Tour Manager', group: 'previous' },
	{ id: 'highlights', label: 'Highlights', group: 'previous' },
	{ id: 'lowlights', label: 'Lowlights', group: 'previous' }
];

export const current = sections.filter((section) => section.group === 'current');
export const previous = sections.filter((section) => section.group === 'previous');
