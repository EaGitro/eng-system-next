export function min(a: number, b: number) {
	return a > b ? b : a
}

export function max(a: number, b: number) {
	return a > b ? a : b
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));