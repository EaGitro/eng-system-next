export type LemmaNode = {
	data: {
		id: string;
		label: string;
		lemma: string;
		nodeType: "lemma";
		wordids: number[]
	};
};

export type VocabNode = {
	data: {
		id: string;
		label: string;
		lemma: string;
		wordid: number;
		nodeType: "vocab";
	};
};
