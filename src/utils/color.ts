import {
	GRAPH_NODE_HSL_LIGHTNESS_SLICE,
	GRAPH_NODE_HSL_SATURATION_SLICE,
	defaultnodecolorhsl,
} from "~/rules/graph";

function hslToHex(h: number, s: number, l: number) {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n: number) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0"); // convert to Hex and prefix "0" if needed
	};
	return `${f(0)}${f(8)}${f(4)}`;
}

export function pos2color(pos: "n" | "v" | "a" | "r", level: number) {
	const level_ = level > 5 ? 5 : level;

	let [h, s, l] = defaultnodecolorhsl[pos];
	l -= level_ * GRAPH_NODE_HSL_LIGHTNESS_SLICE;
	s += level_ * GRAPH_NODE_HSL_SATURATION_SLICE;
	return hslToHex(h, s, l);
}
