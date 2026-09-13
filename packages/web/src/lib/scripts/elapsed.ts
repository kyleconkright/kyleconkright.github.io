const WEEK = 7 * 24 * 60 * 60 * 1000;

export interface Elapsed {
	years: number;
	weeks: number;
}

export function elapsed(startUTC: number, now: number = Date.now()): Elapsed {
	const start = new Date(startUTC);

	let years = new Date(now).getUTCFullYear() - start.getUTCFullYear();
	const anniversary = new Date(startUTC);
	anniversary.setUTCFullYear(start.getUTCFullYear() + years);

	if (anniversary.getTime() > now) {
		years -= 1;
		anniversary.setUTCFullYear(anniversary.getUTCFullYear() - 1);
	}

	return { years, weeks: Math.floor((now - anniversary.getTime()) / WEEK) };
}
