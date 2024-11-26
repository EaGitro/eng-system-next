export function simpleHash(str: string) {
	let res = "";
	const asciiTable = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
	];
	const asciiLen = asciiTable.length;
	let sum = 0;
	for (const char of str) {
		sum += char.codePointAt(0) as number;
	}
	while (sum > asciiLen) {
		res += asciiTable[sum % asciiLen];
		sum = (sum / asciiLen) | 0;
	}
	res += asciiTable[sum];
	return res;
}

export const HASED_KEY_STARTTEST = "JJ";
