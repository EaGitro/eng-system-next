import type { YYYYMMDD } from "~/app/types/utils";

export type ContinuousData = {
	date: YYYYMMDD;
	learnedVocabs: number;
	learnedSynsets: number;
	learnedRelations: number;
	test: number;
}[];
