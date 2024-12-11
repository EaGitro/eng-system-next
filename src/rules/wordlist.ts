/* eslint-disable sort-keys-custom-order/object-keys */

/**
 * These word lists are from Schmitt(2000).
 *
 *   Schmitt, N. (2020). Vocabulary in language teaching. Cambridge university press.
 *
 * {@link https://isbnsearch.org/isbn/0521660483}
 */

export const WORD_LIST_ORDERED = [
	// {
	// 	words: [
	// 		"antics",
	// 		"batch",
	// 		"connoisseur",
	// 		"foreboding",
	// 		"haunch",
	// 		"scaffold",
	// 	],
	// 	choices: [
	// 		undefined,
	// 		"foolish behavior",
	// 		"a group of things",
	// 		"person with a good knowledge of art or music",
	// 		null,
	// 	],
	// },
	{
		words: ["auspices", "dregs", "hostage", "jumble", "saliva", "truce"],
		choices: [
			undefined,
			"confused mixture",
			"natural liquid present in the mouth",
			"worst and most useless parts of anything",
			null,
		],
	},
	{
		words: ["casualty", "flurry", "froth", "revelry", "rut", "seclusion"],
		choices: [
			undefined,
			"someone killed or injured",
			"being away from other people",
			"noisy and happy celebration",
			null,
		],
	},
	{
		words: [
			"apparition",
			"botany",
			"expulsion",
			"insolence",
			"leash",
			"puddle",
		],
		choices: [
			undefined,
			"ghost",
			"study of plants",
			"small pool of water",
			null,
		],
	},
	// {
	// 	words: [
	// 		"arsenal",
	// 		"barracks",
	// 		"deacon",
	// 		"felicity",
	// 		"predicament",
	// 		"spore",
	// 	],
	// 	choices: [
	// 		undefined,
	// 		"happiness",
	// 		"difficult situation",
	// 		"minister in a church",
	// 		null,
	// 	],
	// },
	// {
	// 	words: ["acquiesce", "bask", "crease", "demolish", "overhaul", "rape"],
	// 	choices: [
	// 		undefined,
	// 		"to accept without protest",
	// 		"sit or lie enjoying warmth",
	// 		"make a fold on cloth or paper",
	// 		null,
	// 	],
	// },
	{
		words: ["blaspheme", "endorse", "nurture", "skid", "squint", "straggle"],
		choices: [
			undefined,
			"slip or slide",
			"give care and food to",
			"speak badly about God",
			null,
		],
	},
	// {
	// 	words: ["clinch", "jot", "mutilate", "smolder", "topple", "whiz"],
	// 	choices: [
	// 		undefined,
	// 		"move very fast",
	// 		"injure or damage",
	// 		"burn slowly without flame",
	// 		null,
	// 	],
	// },
	// {
	// 	words: ["auxiliary", "candid", "luscious", "morose", "pallid", "pompous"],
	// 	choices: [
	// 		undefined,
	// 		"bad-tempered on",
	// 		"full of self-importance",
	// 		"helping, adding support",
	// 		null,
	// 	],
	// },
	// {
	// 	words: ["dubious", "impudent", "languid", "motley", "opaque", "primeval"],
	// 	choices: [
	// 		undefined,
	// 		"rude",
	// 		"very ancient",
	// 		"of many different kinds",
	// 		null,
	// 	],
	// },
] as const;

export const WORD_LIST_ANSWERS = {
	antics: {
		num: 1,
		meaning: "foolish behavior",
	},
	batch: {
		num: 2,
		meaning: "a group of things",
	},
	connoisseur: {
		num: 3,
		meaning: "person with a good knowledge of art or music",
	},
	foreboding: {
		num: null,
		meaning: null,
	},
	haunch: {
		num: null,
		meaning: null,
	},
	scaffold: {
		num: null,
		meaning: null,
	},
	auspices: {
		num: null,
		meaning: null,
	},
	dregs: {
		num: 3,
		meaning: "worst and most useless parts of anything",
	},
	hostage: {
		num: null,
		meaning: null,
	},
	jumble: {
		num: 1,
		meaning: "confused mixture",
	},
	saliva: {
		num: 2,
		meaning: "natural liquid present in the mouth",
	},
	truce: {
		num: null,
		meaning: null,
	},
	casualty: {
		num: 1,
		meaning: "someone killed or injured",
	},
	flurry: {
		num: null,
		meaning: null,
	},
	froth: {
		num: null,
		meaning: null,
	},
	revelry: {
		num: 3,
		meaning: "noisy and happy celebration",
	},
	rut: {
		num: null,
		meaning: null,
	},
	seclusion: {
		num: 2,
		meaning: "being away from other people",
	},
	apparition: {
		num: 1,
		meaning: "ghost",
	},
	botany: {
		num: 2,
		meaning: "study of plants",
	},
	expulsion: {
		num: null,
		meaning: null,
	},
	insolence: {
		num: null,
		meaning: null,
	},
	leash: {
		num: null,
		meaning: null,
	},
	puddle: {
		num: 3,
		meaning: "small pool of water",
	},
	arsenal: {
		num: null,
		meaning: null,
	},
	barracks: {
		num: null,
		meaning: null,
	},
	deacon: {
		num: 3,
		meaning: "minister in a church",
	},
	felicity: {
		num: 1,
		meaning: "happiness",
	},
	predicament: {
		num: 2,
		meaning: "difficult situation",
	},
	spore: {
		num: null,
		meaning: null,
	},
	acquiesce: {
		num: 1,
		meaning: "to accept without protest",
	},
	bask: {
		num: 2,
		meaning: "sit or lie enjoying warmth",
	},
	crease: {
		num: 3,
		meaning: "make a fold on cloth or paper",
	},
	demolish: {
		num: null,
		meaning: null,
	},
	overhaul: {
		num: null,
		meaning: null,
	},
	rape: {
		num: null,
		meaning: null,
	},
	blaspheme: {
		num: 3,
		meaning: "speak badly about God",
	},
	endorse: {
		num: null,
		meaning: null,
	},
	nurture: {
		num: 2,
		meaning: "give care and food to",
	},
	skid: {
		num: 1,
		meaning: "slip or slide",
	},
	squint: {
		num: null,
		meaning: null,
	},
	straggle: {
		num: null,
		meaning: null,
	},
	clinch: {
		num: null,
		meaning: null,
	},
	jot: {
		num: null,
		meaning: null,
	},
	mutilate: {
		num: 2,
		meaning: "injure or damage",
	},
	smolder: {
		num: 3,
		meaning: "burn slowly without flame",
	},
	topple: {
		num: null,
		meaning: null,
	},
	whiz: {
		num: 1,
		meaning: "move very fast",
	},
	auxiliary: {
		num: 3,
		meaning: "helping, adding support",
	},
	candid: {
		num: null,
		meaning: null,
	},
	luscious: {
		num: null,
		meaning: null,
	},
	morose: {
		num: 1,
		meaning: "bad-tempered",
	},
	pallid: {
		num: null,
		meaning: null,
	},
	pompous: {
		num: 2,
		meaning: "full of self-importance",
	},
	dubious: {
		num: null,
		meaning: null,
	},
	impudent: {
		num: 1,
		meaning: "rude",
	},
	languid: {
		num: null,
		meaning: null,
	},
	motley: {
		num: 3,
		meaning: "of many different kinds",
	},
	opaque: {
		num: null,
		meaning: null,
	},
	primeval: {
		num: 2,
		meaning: "very ancient",
	},
} as const;


export const WORD_LIST_ORDERED_EXTENDED = [
	{
		words: [
			"antics",
			"batch",
			"connoisseur",
			"foreboding",
			"haunch",
			"scaffold",
		],
		choices: [
			undefined,
			"foolish behavior",
			"a group of things",
			"person with a good knowledge of art or music",
			null,
		],
	},
	{
		words: ["auspices", "dregs", "hostage", "jumble", "saliva", "truce"],
		choices: [
			undefined,
			"confused mixture",
			"natural liquid present in the mouth",
			"worst and most useless parts of anything",
			null,
		],
	},
	{
		words: ["casualty", "flurry", "froth", "revelry", "rut", "seclusion"],
		choices: [
			undefined,
			"someone killed or injured",
			"being away from other people",
			"noisy and happy celebration",
			null,
		],
	},
	{
		words: [
			"apparition",
			"botany",
			"expulsion",
			"insolence",
			"leash",
			"puddle",
		],
		choices: [
			undefined,
			"ghost",
			"study of plants",
			"small pool of water",
			null,
		],
	},
	{
		words: [
			"arsenal",
			"barracks",
			"deacon",
			"felicity",
			"predicament",
			"spore",
		],
		choices: [
			undefined,
			"happiness",
			"difficult situation",
			"minister in a church",
			null,
		],
	},
	{
		words: ["acquiesce", "bask", "crease", "demolish", "overhaul", "rape"],
		choices: [
			undefined,
			"to accept without protest",
			"sit or lie enjoying warmth",
			"make a fold on cloth or paper",
			null,
		],
	},
	{
		words: ["blaspheme", "endorse", "nurture", "skid", "squint", "straggle"],
		choices: [
			undefined,
			"slip or slide",
			"give care and food to",
			"speak badly about God",
			null,
		],
	},
	{
		words: ["clinch", "jot", "mutilate", "smolder", "topple", "whiz"],
		choices: [
			undefined,
			"move very fast",
			"injure or damage",
			"burn slowly without flame",
			null,
		],
	},
	{
		words: ["auxiliary", "candid", "luscious", "morose", "pallid", "pompous"],
		choices: [
			undefined,
			"bad-tempered on",
			"full of self-importance",
			"helping, adding support",
			null,
		],
	},
	{
		words: ["dubious", "impudent", "languid", "motley", "opaque", "primeval"],
		choices: [
			undefined,
			"rude",
			"very ancient",
			"of many different kinds",
			null,
		],
	},
] as const;

export const WORD_LIST_ANSWERS_EXTENDED = {
	antics: {
		num: 1,
		meaning: "foolish behavior",
	},
	batch: {
		num: 2,
		meaning: "a group of things",
	},
	connoisseur: {
		num: 3,
		meaning: "person with a good knowledge of art or music",
	},
	foreboding: {
		num: null,
		meaning: null,
	},
	haunch: {
		num: null,
		meaning: null,
	},
	scaffold: {
		num: null,
		meaning: null,
	},
	auspices: {
		num: null,
		meaning: null,
	},
	dregs: {
		num: 3,
		meaning: "worst and most useless parts of anything",
	},
	hostage: {
		num: null,
		meaning: null,
	},
	jumble: {
		num: 1,
		meaning: "confused mixture",
	},
	saliva: {
		num: 2,
		meaning: "natural liquid present in the mouth",
	},
	truce: {
		num: null,
		meaning: null,
	},
	casualty: {
		num: 1,
		meaning: "someone killed or injured",
	},
	flurry: {
		num: null,
		meaning: null,
	},
	froth: {
		num: null,
		meaning: null,
	},
	revelry: {
		num: 3,
		meaning: "noisy and happy celebration",
	},
	rut: {
		num: null,
		meaning: null,
	},
	seclusion: {
		num: 2,
		meaning: "being away from other people",
	},
	apparition: {
		num: 1,
		meaning: "ghost",
	},
	botany: {
		num: 2,
		meaning: "study of plants",
	},
	expulsion: {
		num: null,
		meaning: null,
	},
	insolence: {
		num: null,
		meaning: null,
	},
	leash: {
		num: null,
		meaning: null,
	},
	puddle: {
		num: 3,
		meaning: "small pool of water",
	},
	arsenal: {
		num: null,
		meaning: null,
	},
	barracks: {
		num: null,
		meaning: null,
	},
	deacon: {
		num: 3,
		meaning: "minister in a church",
	},
	felicity: {
		num: 1,
		meaning: "happiness",
	},
	predicament: {
		num: 2,
		meaning: "difficult situation",
	},
	spore: {
		num: null,
		meaning: null,
	},
	acquiesce: {
		num: 1,
		meaning: "to accept without protest",
	},
	bask: {
		num: 2,
		meaning: "sit or lie enjoying warmth",
	},
	crease: {
		num: 3,
		meaning: "make a fold on cloth or paper",
	},
	demolish: {
		num: null,
		meaning: null,
	},
	overhaul: {
		num: null,
		meaning: null,
	},
	rape: {
		num: null,
		meaning: null,
	},
	blaspheme: {
		num: 3,
		meaning: "speak badly about God",
	},
	endorse: {
		num: null,
		meaning: null,
	},
	nurture: {
		num: 2,
		meaning: "give care and food to",
	},
	skid: {
		num: 1,
		meaning: "slip or slide",
	},
	squint: {
		num: null,
		meaning: null,
	},
	straggle: {
		num: null,
		meaning: null,
	},
	clinch: {
		num: null,
		meaning: null,
	},
	jot: {
		num: null,
		meaning: null,
	},
	mutilate: {
		num: 2,
		meaning: "injure or damage",
	},
	smolder: {
		num: 3,
		meaning: "burn slowly without flame",
	},
	topple: {
		num: null,
		meaning: null,
	},
	whiz: {
		num: 1,
		meaning: "move very fast",
	},
	auxiliary: {
		num: 3,
		meaning: "helping, adding support",
	},
	candid: {
		num: null,
		meaning: null,
	},
	luscious: {
		num: null,
		meaning: null,
	},
	morose: {
		num: 1,
		meaning: "bad-tempered",
	},
	pallid: {
		num: null,
		meaning: null,
	},
	pompous: {
		num: 2,
		meaning: "full of self-importance",
	},
	dubious: {
		num: null,
		meaning: null,
	},
	impudent: {
		num: 1,
		meaning: "rude",
	},
	languid: {
		num: null,
		meaning: null,
	},
	motley: {
		num: 3,
		meaning: "of many different kinds",
	},
	opaque: {
		num: null,
		meaning: null,
	},
	primeval: {
		num: 2,
		meaning: "very ancient",
	},
} as const;