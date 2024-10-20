import exp from "constants";
import type { Expand } from "./utils";
// type Synset = {
//     synset_id: string;
//     definitions: {
//         [key: number]: {
//             jpn?: string;
//             eng: string;
//         };
//     };
//     examples: {
//         eng: string;
//         jpn?: string;
//     }[];
//     word_synset_freq: number; // Frequency of the word usage in that synset
//     syno_list: {
//         synset_id: string;
//         word_id: number;
//         word: string;
//         lang: string;
//         freq: number;
//     }[];
// };

// export type WordData = Expand<{
//     word: string;
//     pos: string;
//     synsets: Synset[];
// }>[];

export type Pos = "a" | "r" | "n" | "v";

type SynsetDef = {
	[key: string]: {
		eng: string;
		jpn: string;
	};
};

type Synonym = {
	freq: number;
	word: string;
	wordid: number;
};

type Synset = {
	defs: SynsetDef;
	examples: Array<{
		eng: string;
		jpn: string;
	}>;
	freq: number;
	syno_list: Synonym[];
	synsetid: string;
};

type WordEntry = {
	pos: string; // 'n' for noun, 'v' for verb
	synsets: Synset[];
	wordid: number;
};

export type WordData = Expand<WordEntry[]>;

export type WnjpId2Words = {
	[wordid: number]: {
		word: string;
		pos: "a" | "r" | "n" | "v";
	};
};
// DEPLICATED
// export type WnjpId2Synsets = {
//   [synsetid: string]: { "eng": string, "jpn": string }[]
// }

export type WnjpId2JpnSynos = {
	[synsetid: string]: string[];
};

// export type WnjpId2Entity = { Words: Words, Synsets: Synsets }
