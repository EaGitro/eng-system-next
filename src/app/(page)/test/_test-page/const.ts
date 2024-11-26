
import { TEST } from "~/rules/prisma";


export const STAGE_STATE = {
	/* eslint-disable sort-keys-custom-order/object-keys */
	INTRO: "intro",
	RESUME: "resume",
	WORD_CHECK: "wordCheck",
	MATCHING: "matching",
	COMPLETE: "complete",
	/* eslint-enable sort-keys-custom-order/object-keys */
} as const;

export const TEST_TIMELIMIT_SEC = {
	MATCHING: 60 * 8,
	WORD_CHECK: 60 * 10,
} as const;

export const KNOWLEDGE_LEVELS = [
	{ label: "その単語を見たことがない", value: TEST.KNOWELEDGE_RATE.NEVER_SEEN },
	{
		label: "見たことはあるが、意味はよくわからない",
		value: TEST.KNOWELEDGE_RATE.SEEN,
	},
	{
		label: "意味は分かるが、自分で使うことはできない",
		value: TEST.KNOWELEDGE_RATE.UNDERSTAND,
	},
	{
		label: "その単語を文章で使うことができる",
		value: TEST.KNOWELEDGE_RATE.CAN_USE,
	},
] as const;

export const SENTENCE_MATCH_USER_CHOICE_TABLE = {
	/* eslint-disable sort-keys-custom-order/object-keys */
	UNSELECTED: 0,
	1: 1, 2: 2, 3: 3,
	NONE_OF_ABOVE: 4,
	I_DONT_KNOW: 5,
	/* eslint-enable sort-keys-custom-order/object-keys */
} as const 
