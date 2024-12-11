import type { STAGE_STATE } from "~/app/(page)/test/_test-page/const";
import type { Expand } from "~/app/types/utils";
import type { TEST } from "~/rules/prisma";
import type { WORD_LIST_ANSWERS } from "~/rules/wordlist";

export type tWORD_LIST = readonly string[];
export type TEST_DATA = readonly {
	// [word: string]: string
	/* eslint-disable sort-keys-custom-order/type-keys */
	words: readonly string[];
	choices: readonly [undefined, string, string, string, null];
	/* eslint-enable sort-keys-custom-order/type-keys */
}[];
// export type TEST_DATA = {
//     [word: string]: {
//         sentence: string,
//         choices: readonly[string, string, string, string]
//     }
// }
export type TEST_ANS = typeof WORD_LIST_ANSWERS
// {
// 	[word: string]: tSENTENCE_MATCHI_USER_CHOICE_TABLE.CHOICES | null;
// };

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace tSENTENCE_MATCH_USER_CHOICE_TABLE {
	export type UNSELECTED = 0
	export type CHOICES = 1 | 2 | 3
	export type NONE_OF_ABOVE = 4
	export type I_DONT_KNOW = 5
	export type tCHOICES =
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.UNSELECTED
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.CHOICES
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.NONE_OF_ABOVE
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.I_DONT_KNOW
}
export type UserChoices = {
	[word: string]: {
		choice:
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.UNSELECTED
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.CHOICES
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.NONE_OF_ABOVE
		| tSENTENCE_MATCH_USER_CHOICE_TABLE.I_DONT_KNOW// 現状は 0-3 ただし未回答とわからないを含めて 0-5 に拡張したい => TODO: ANS も 1-4 に
		isCorrect: boolean;
		isNullAns: boolean; 	// もし答えが null (3つの選択肢以外) なら true
	};
};

export type StageState = (typeof STAGE_STATE)[keyof typeof STAGE_STATE];

export type MatchState = Expand<
	{
		[word: string]: string;
	}[][]
>;

export type KnowledgeRateState = Expand<Record<string, KnowledgeRate>>;
export type KnowledgeRate =
	`${(typeof TEST.KNOWELEDGE_RATE)[keyof typeof TEST.KNOWELEDGE_RATE]}`;


export type TestResult = {
	date: number,
	knowledgeRates: KnowledgeRateState,
	mailaddr:string,
	userChoices: UserChoices,
	userId:string,
}