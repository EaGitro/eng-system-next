import type { LemmaNode } from "~/app/types/GraphTypes";

export type WatchVisibilityProp = {
	userId: string;
	email?: string;
	isMobile: boolean;
	data: {
		[key: string]: {
			s: number; // start
			e: number; // end
		}[];
	};
};

export type WatchClickProp<TYPE extends WatchClickType, DATA extends {}> = {
	userId: string;
	email?: string;
	isMobile: boolean;
	data: {
		[key: string]: {
			time: number;
			type: TYPE;
			data: DATA;
		}[];
	};
};

export type WatchClickData<T> = T extends "wordcard-syno"
	? { synsetid: string; wordid: number }
	: T extends "graph-syno"
		? { connNodes: any[]; nodeData: LemmaNode["data"] }
		: never;

export type WatchClickType =
	| "graph-lemma"
	| "graph-syno"
	| "wordcard-syno"
	| "start-wordcard"
	| "return-menu"
	| "start-graph";
