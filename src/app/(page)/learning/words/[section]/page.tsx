import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import type { WordInfosType } from "~/app/types/statesContextsTypes";

import WordCards from "~/components/WordCards";
import { authOptions } from "~/lib/auth";
import { nextFetchCache } from "~/rules/fetchCache";
import { WORD_LIST_ORDERED } from "~/rules/wordlist";

export default async function Page({
	params,
}: { params: { section: string } }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/mypage");
	}

	// const q = new URLSearchParams({ level: params.level, section: `${Number(params.section) + 1}` })
	// const url = createApiRouteUrl(`/api/word-list?${q}`);
	// console.log("level-section-url",url)
	// const wordList = await (await fetch(url)).json()
	// const wordList = CommonWords[params.level][Number(params.section) + 1];

	const wordList = WORD_LIST_ORDERED[Number(params.section)].words;

	console.log("level-section-wordlist========", wordList);

	/**
	 * [word, wordid, pos][]
	 */
	const wordids: [string, number, string][] = await (
		await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/words2wordids`, {
			body: JSON.stringify(wordList),
			headers: { "Content-Type": "application/json" },
			method: "POST",
			...nextFetchCache,
		})
	).json();

	const wordInfos: WordInfosType = {};
	return (
		<WordCards
			defaultWordInfos={wordInfos}
			userId={session.user.id}
			wordids={wordids}
		/>
	);
}
