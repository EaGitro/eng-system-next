"use client";

import type { LocalstorageWordinfoKey } from "~/app/types/localstorageTypes";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { WordData } from "~/app/types/wordnet";

import {
	localStorageWordinfokeyPrefix,
	localStorageWordinfokeyskey,
} from "~/rules/localStorage";

export function setLocalstorageWordinfos(wordInfos: WordInfosType) {
	for (const wordid in wordInfos) {
		const key: LocalstorageWordinfoKey = `${localStorageWordinfokeyPrefix}${wordid as unknown as number}`;
		localStorage.setItem(key, JSON.stringify(wordInfos[wordid]));
		const keyarrstr = localStorage.getItem(localStorageWordinfokeyskey);
		let newKeyarrstr = "";
		if (keyarrstr) {
			newKeyarrstr = createKeys(keyarrstr, wordid);
		} else {
			newKeyarrstr = `[${wordid}]`;
		}
		localStorage.setItem(localStorageWordinfokeyskey, newKeyarrstr);
	}
}

export function getLocalstorageWordinfo(wordid: number): {
	exists: boolean;
	wordInfo: WordData[0] | {};
} {
	const key: LocalstorageWordinfoKey = `${localStorageWordinfokeyPrefix}${wordid}`;
	const wordInfoStr = localStorage.getItem(key);
	return {
		exists: !!wordInfoStr,
		wordInfo: wordInfoStr ? JSON.parse(wordInfoStr) : {},
	};
}

export function getLocalstorageAllWordinfos() {
	const localStorageKeys = Object.keys(localStorage);
	const reg = new RegExp(`${localStorageWordinfokeyPrefix}*`);
	localStorageKeys.forEach((key) => {
		// reg.test(key) &&
	});
}

export function getLocalstorageAllWordinfoKeys() {}

function createKeys(keyarrstr: string, newkey: string) {
	const newstr = keyarrstr.slice(0, keyarrstr.length - 1);
	return `${newstr},${newkey}]`;
}
