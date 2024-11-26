export const WORDLIST_SECTION_TOTAL = 6;

/**
 * This word lists is from Schmitt(2000).
 *
 *   Schmitt, N. (2020). Vocabulary in language teaching. Cambridge university press.
 *
 * {@link https://isbnsearch.org/isbn/0521660483}
 */

export const CommonWords = {
	"1": [
		["birth", "dust", "operation", "row", "sport", "victory"],
		["choice", "crop", "flesh", "salary", "secret", "temperature"],
		["cap", "education", "journey", "parent", "scale", "trick"],
		["attack", "charm", "lack", "pen", "shadow", "treasure"],
		["adopt", "climb", "examine", "pour", "satisfy", "surround"],
		["bake", "connect", "inquire", "limit", "recognize", "wander"],
		["burst", "concern", "deliver", "fold", "improve", "urge"],
		["original", "private", "royal", "slow", "sorry", "total"],
	],
	"2": [
		["betray", "dispose", "embrace", "injure", "proclaim", "scare"],
		["encounter", "illustrate", "inspire", "plead", "seal", "shift"],
		["assist", "bother", "condemn", "erect", "trim", "whirl"],
		["dim", "junior", "magnificent", "maternal", "odd", "weary"],
	],
	"3": [
		["alcohol", "apron", "hip", "lure", "mess", "phase"],
		["apparatus", "compliment", "ledge", "revenue", "scrap", "tile"],
		["blend", "devise", "hug", "lease", "plague", "reject"],
		["bleed", "collapse", "precede", "reject", "skip", "tease"],
		["gloomy", "gross", "infinite", "limp", "slim", "vacant"],
	],
	"4": [
		["antics", "batch", "connoisseur", "foreboding", "haunch", "scaffold"],
		["apparition", "botany", "expulsion", "insolence", "leash", "puddle"],
		["acquiesce", "bask", "crease", "demolish", "overhaul", "rape"],
		["blaspheme", "endorse", "nurture", "skid", "squint", "straggle"],
		["clinch", "jot", "mutilate", "smolder", "topple", "whiz"],
	],
};

export const CommonWordsAnses: { [word: string]: string }[] = [
	{
		birth: "being born",
		dust: "",
		operation: "",
		row: "",
		sport: "game",
		victory: "winning",
	},
	{
		choice: "",
		crop: "",
		flesh: "meat",
		salary: "money paid regularly for doing a job",
		secret: "",
		temperature: "heat",
	},
	{
		cap: "",
		education: "teaching and learning",
		journey: "going to a far place",
		parent: "",
		scale: "numbers to measure with",
		trick: "",
	},
	{
		attack: "",
		charm: "pleasing quality",
		lack: "not having something",
		pen: "",
		shadow: "",
		treasure: "gold and silver",
	},
	{
		adopt: "",
		climb: "go up",
		examine: "look at closely",
		pour: "",
		satisfy: "",
		surround: "be on every side",
	},
	{
		bake: "",
		connect: "join together",
		inquire: "",
		limit: "keep within a certain size",
		recognize: "",
		wander: "walk without purpose",
	},
	{
		burst: "break open",
		concern: "",
		deliver: "take something to someone",
		fold: "",
		improve: "make better",
		urge: "",
	},
	{
		original: "first",
		private: "not public",
		royal: "",
		slow: "",
		sorry: "",
		total: "all added together",
	},
	{
		betray: "",
		dispose: "",
		embrace: "",
		injure: "hurt seriously",
		proclaim: "say publicly",
		scare: "frighten",
	},
	{
		encounter: "meet",
		illustrate: "",
		inspire: "",
		plead: "beg for help",
		seal: "close completely",
		shift: "",
	},
	{
		assist: "help",
		bother: "",
		condemn: "",
		erect: "",
		trim: "cut neatly",
		whirl: "spin around quickly",
	},
	{
		dim: "not clearly lit",
		junior: "",
		magnificent: "wonderful",
		maternal: "",
		odd: "strange",
		weary: "",
	},
	{
		alcohol: "",
		apron: "cloth worn in front to protect your clothes",
		hip: "",
		lure: "",
		mess: "state of untidiness or dirtiness",
		phase: "stage of development",
	},
	{
		apparatus: "set of instruments or machinery",
		compliment: "expression of admiration",
		ledge: "",
		revenue: "money received by the government",
		scrap: "",
		tile: "",
	},
	{
		blend: "mix together",
		devise: "plan or invent",
		hug: "hold tightly in your arms",
		lease: "",
		plague: "",
		reject: "",
	},
	{
		bleed: "",
		collapse: "fall down suddenly",
		precede: "come before",
		reject: "",
		skip: "move with quick steps and jumps",
		tease: "",
	},
	{
		gloomy: "dark or sad",
		gross: "",
		infinite: "without end",
		limp: "",
		slim: "",
		vacant: "empty",
	},
	{
		antics: "foolish behavior",
		batch: "a group of things",
		connoisseur: "person with a good knowledge of art or music",
		foreboding: "",
		haunch: "",
		scaffold: "",
	},
	{
		apparition: "ghost",
		botany: "study of plants",
		expulsion: "",
		insolence: "",
		leash: "",
		puddle: "small pool of water",
	},
	{
		acquiesce: "to accept without protest",
		bask: "sit or lie enjoying warmth",
		crease: "make a fold on cloth or paper",
		demolish: "",
		overhaul: "",
		rape: "",
	},
	{
		blaspheme: "speak badly about God",
		endorse: "",
		nurture: "give care and food to",
		skid: "slip or slide",
		squint: "",
		straggle: "",
	},
	{
		clinch: "",
		jot: "",
		mutilate: "injure or damage",
		smolder: "burn slowly without flame",
		topple: "",
		whiz: "move very fast",
	},
];

export const OrderedCommonWordsAnses = {
	"1": [
		{
			words: ["birth", "dust", "operation", "row", "sport", "victory"],
			meanings: ["game", "winning", "being born"],
		},
		{
			words: ["choice", "crop", "flesh", "salary", "secret", "temperature"],
			meanings: ["heat", "meat", "money paid regularly for doing a job"],
		},
		{
			words: ["cap", "education", "journey", "parent", "scale", "trick"],
			meanings: [
				"teaching and learning",
				"numbers to measure with",
				"going to a far place",
			],
		},
		{
			words: ["attack", "charm", "lack", "pen", "shadow", "treasure"],
			meanings: ["gold and silver", "pleasing quality", "not having something"],
		},
		{
			words: ["adopt", "climb", "examine", "pour", "satisfy", "surround"],
			meanings: ["go up", "look at closely", "be on every side"],
		},
		{
			words: ["bake", "connect", "inquire", "limit", "recognize", "wander"],
			meanings: [
				"join together",
				"walk without purpose",
				"keep within a certain size",
			],
		},
		{
			words: ["burst", "concern", "deliver", "fold", "improve", "urge"],
			meanings: ["break open", "make better", "take something to someone"],
		},
		{
			words: ["original", "private", "royal", "slow", "sorry", "total"],
			meanings: ["first ", "not public ", "all added together "],
		},
	],
	"2": [
		{
			words: ["betray", "dispose", "embrace", "injure", "proclaim", "scare"],
			meanings: ["frighten", "say publicly", "hurt seriously"],
		},
		{
			words: ["encounter", "illustrate", "inspire", "plead", "seal", "shift"],
			meanings: ["meet", "beg for help", "close completely"],
		},
		{
			words: ["assist", "bother", "condemn", "erect", "trim", "whirl"],
			meanings: ["help", "cut neatly", "spin around quickly"],
		},
		{
			words: ["dim", "junior", "magnificent", "maternal", "odd", "weary"],
			meanings: ["strange", "wonderful", "not clearly lit"],
		},
	],
	"3": [
		{
			words: ["alcohol", "apron", "hip", "lure", "mess", "phase"],
			meanings: [
				"stage of development",
				"state of untidiness or dirtiness",
				"cloth worn in front to protect your clothes",
			],
		},
		{
			words: ["apparatus", "compliment", "ledge", "revenue", "scrap", "tile"],
			meanings: [
				"expression of admiration",
				"set of instruments or machinery",
				"money received by the government",
			],
		},
		{
			words: ["blend", "devise", "hug", "lease", "plague", "reject"],
			meanings: ["mix together", "plan or invent", "hold tightly in your arms"],
		},
		{
			words: ["bleed", "collapse", "precede", "reject", "skip", "tease"],
			meanings: [
				"come before",
				"fall down suddenly",
				"move with quick steps and jumps",
			],
		},
		{
			words: ["gloomy", "gross", "infinite", "limp", "slim", "vacant"],
			meanings: ["empty", "dark or sad", "without end"],
		},
	],
	"4": [
		{
			words: [
				"antics",
				"batch",
				"connoisseur",
				"foreboding",
				"haunch",
				"scaffold",
			],
			meanings: [
				"foolish behavior",
				"a group of things",
				"person with a good knowledge of art or music",
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
			meanings: ["ghost", "study of plants", "small pool of water"],
		},
		{
			words: ["acquiesce", "bask", "crease", "demolish", "overhaul", "rape"],
			meanings: [
				"to accept without protest",
				"sit or lie enjoying warmth",
				"make a fold on cloth or paper",
			],
		},
		{
			words: ["blaspheme", "endorse", "nurture", "skid", "squint", "straggle"],
			meanings: [
				"slip or slide",
				"give care and food to",
				"speak badly about God",
			],
		},
		{
			words: ["clinch", "jot", "mutilate", "smolder", "topple", "whiz"],
			meanings: [
				"move very fast",
				"injure or damage",
				"burn slowly without flame",
			],
		},
	],
};
