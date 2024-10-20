"use client";
import type { WordData } from "~/app/types/wordnet";
import {
	getLocalstorageWordinfo,
	setLocalstorageWordinfos,
} from "~/utils/operateLocalstorage";

// Helper function to fetch WordInfo asynchronously

export async function fetchWordInfo(wordid: number): Promise<WordData[0]> {
	const localWordinfo = getLocalstorageWordinfo(wordid);
	console.log("fetchWordInfo====", localWordinfo);
	if (localWordinfo.exists) return localWordinfo.wordInfo as WordData[0];
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wordid}`,
	);
	const wordInfo = await response.json();
	setLocalstorageWordinfos({ [wordid]: wordInfo });
	return wordInfo;
}
