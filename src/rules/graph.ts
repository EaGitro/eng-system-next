export const maxnodecolorhex = {
    v: "#7fffff",
    n: "#7fffbf",
    a: "#ff7f7f",
    r: "#ff7fff"
} as const

export const GRAPH_NODE_HSL_MAX_LEVEL = 5;
export const GRAPH_NODE_HSL_DEFAULT_LIGHTNESS = 90;
export const GRAPH_NODE_HSL_MAX_LIGHTNESS = 75;
export const GRAPH_NODE_HSL_MAX_SATURATION = 100
export const GRAPH_NODE_HSL_DEFAULT_SATURATION = 30;
export const GRAPH_NODE_HSL_LIGHTNESS_SLICE = (GRAPH_NODE_HSL_DEFAULT_LIGHTNESS - GRAPH_NODE_HSL_MAX_LIGHTNESS) / GRAPH_NODE_HSL_MAX_LEVEL;
export const GRAPH_NODE_HSL_SATURATION_SLICE = (GRAPH_NODE_HSL_MAX_SATURATION - GRAPH_NODE_HSL_DEFAULT_SATURATION) / GRAPH_NODE_HSL_MAX_LEVEL;

export const maxnodecolorhsl = {
    v: [180, GRAPH_NODE_HSL_MAX_SATURATION, GRAPH_NODE_HSL_MAX_LIGHTNESS],
    n: [150, GRAPH_NODE_HSL_MAX_SATURATION, GRAPH_NODE_HSL_MAX_LIGHTNESS],
    a: [0, GRAPH_NODE_HSL_MAX_SATURATION, GRAPH_NODE_HSL_MAX_LIGHTNESS],
    r: [300, GRAPH_NODE_HSL_MAX_SATURATION, GRAPH_NODE_HSL_MAX_LIGHTNESS]
} as const
export const defaultnodecolorhsl = {
    v: [180, GRAPH_NODE_HSL_DEFAULT_SATURATION, GRAPH_NODE_HSL_DEFAULT_LIGHTNESS],
    n: [150, GRAPH_NODE_HSL_DEFAULT_SATURATION, GRAPH_NODE_HSL_DEFAULT_LIGHTNESS],
    a: [0, GRAPH_NODE_HSL_DEFAULT_SATURATION, GRAPH_NODE_HSL_DEFAULT_LIGHTNESS],
    r: [300, GRAPH_NODE_HSL_DEFAULT_SATURATION, GRAPH_NODE_HSL_DEFAULT_LIGHTNESS]
} as const


export const pos2shape = {
    v: "concave-hexagon",
    n: "round-rectangle",
    a: "diamond",
    r: "tag"
} as const


export const DEFAULT_LEMMA_NODE_SIZE = 80;
export const DEFAULT_SYNO_NODE_SIZE = 50;
export const SYNO_NODE_SIZE_SLICE = 15;

export const CY_CLASSES = {
    invisible: "invisible",
    active: "active",
    transparent: "transparent"
} as const 