import type { WordData } from "./wordnet";

export type WordInfosType = {
	[k: number]: WordData[0];
};

export type WordInfosContextType = [
	WordInfos: WordInfosType,
	SetWordInfos: React.Dispatch<React.SetStateAction<WordInfosType>>,
];
