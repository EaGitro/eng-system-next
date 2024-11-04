export type LemmaNode = {
	data: {
		id: `lemma+${string}`;
		label: string;
		lemma: string;
		nodeType: "lemma";
		wordids: number[];
		levels: number[];
		active: boolean
	};
};

export type SynoNode = {
	data: {
        id: `synset+${string}`;
        label: string;
        nodeType: "syno";
        color: string;
        shape: string;
        level: number;
        active: boolean;
    };
}

export type VocabNode = {
	data: {
		id: string;
		label: string;
		lemma: string;
		wordid: number;
		nodeType: "vocab";
		level: number;
		active: boolean
	};
};
