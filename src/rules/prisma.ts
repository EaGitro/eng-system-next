export const LEVEL_BOUNDARIES = {
	LEARNING_LEVEL_LIMIT: 5,
} as const;

export const TEST = {
/* eslint-disable sort-keys-custom-order/object-keys */
	STATUS: {
		UNTOUCHED: 0,
		IN_PROGRESS: 1,
		COMPLETED: 2,
	} as const,
	KNOWELEDGE_RATE: {
		UNTOUCHED: 0,
		NEVER_SEEN: 1,
		SEEN: 2,
		UNDERSTAND: 3,
		CAN_USE: 4,
	} as const,
	MATCH_STATUS: {
		UNTOUCHED: 0,
		CORRECT: 1,
		INCORRECT: 2,
	} as const,
/* eslint-enable sort-keys-custom-order/object-keys */
} as const;

export const USER_GROUP = {
	COMPARISON: 2,
	PAPER: 3,
	SYSTEM: 1,
	UNTOUCHED: 0,
} as const;
