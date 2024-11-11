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


export const GRAPH_ELEMENTS_DATA = {
    edge: (
        relationId: number,
        word: string,
        synsetId: string
    ) => ({
        id: GRAPH_ELEMENTS_DATA_TEMPLATE.edge.id(relationId),
        source: GRAPH_ELEMENTS_DATA_TEMPLATE.edge.source(word),
        target: GRAPH_ELEMENTS_DATA_TEMPLATE.edge.target(synsetId),
        edgeType: GRAPH_ELEMENTS_DATA_TEMPLATE.edge.edgeType,
    } as const),

    synoNode: (
        synsetId: string,
        jpnSynos: string[],
        color: string,
        shape: string,
        level: number,
        active: boolean
    ) => ({
        id: GRAPH_ELEMENTS_DATA_TEMPLATE.synoNode.id(synsetId), // ユニークなIDを付与
        label: `${jpnSynos.join(",\n")}`,
        nodeType: GRAPH_ELEMENTS_DATA_TEMPLATE.synoNode.nodeType,
        color: color,
        shape: shape,
        level: level,
        active: active
    } as const),

} as const

export const GRAPH_ELEMENTS_DATA_TEMPLATE = {
    edge: {
        id: (relationId: number) => `edge+${relationId}` as const,
        source: (word: string) => `lemma+${word}` as const,
        target: (synsetId: string) => `synset+${synsetId}` as const,
        edgeType: "word2synsets" as const,
    } as const,
    synoNode: {
        id: (synsetId: string) => `synset+${synsetId}` as const,
        nodeType: "syno" as const,
    } as const,

    lemmaNode: {
        id: (word: string) => `lemma+${word}` as const,
        nodeType: "lemma"
    } as const
}