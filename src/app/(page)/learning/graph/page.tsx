import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import type { WnjpId2JpnSynos, WnjpId2Words } from "~/app/types/wordnet";

import CytoscapeGraph from "~/components/CytoscapeGraph";
import WatchUser from "~/components/WatchUser";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { nextFetchCache } from "~/rules/fetchCache";

export default async function Graph() {
	const session = await getServerSession(authOptions);
	console.log("===learning graph====", session);
	if (!session) {
		// セッションがない場合は `/login` にリダイレクト
		redirect("/login");
	}
	const userId = session?.user.id;

	const vocab = await prisma.userVocab.findMany({
		where: { userId },
	});
	const userSynset = await prisma.userSynset.findMany({
		where: { userId },
	});

	const userRelation = await prisma.userWordSynsetRelation.findMany({
		where: { userId },
	});

	// const [vocabs, userSynsets, userRelations] = await Promise.all([
	//     vocab,
	//     userSynset,
	//     userRelation
	// ])
	console.log("===========================================");
	console.log(
		"vocab",
		vocab,
		"userSynset",
		userSynset,
		"userRelation",
		userRelation,
	);
	console.log("===========================================");

	// words (wordid => word)
	const words: WnjpId2Words = await fetch(
		`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wordids2words`,
		{
			body: JSON.stringify(vocab.map((x) => x.wordId)),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			...nextFetchCache,
		},
	).then((x) => x.json());

	// synsets (synsetid => synset)
	// DEPLICATED
	// const synsets: WnjpId2Synsets = await fetch(process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/synsetids2synsetdefs", {
	//     method: "POST",
	//     headers: {
	//         'Content-Type': 'application/json',
	//     },
	//     body: JSON.stringify(userSynset.map((x) => x.synsetId))
	// }).then((x) => x.json())

	// synsets (synsetid => synonims (jpn))
	const jpnSynos: WnjpId2JpnSynos = await fetch(
		`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/synsetids2synos`,
		{
			body: JSON.stringify({ synsetids: userSynset.map((x) => x.synsetId) }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			...nextFetchCache,
		},
	).then((x) => x.json());

	console.log({ synsetids: userSynset.map((x) => x.synsetId) });

	return (
		<>
			{session && <WatchUser userId={session.user.id} />}
			{/* <a href="/mypage">MYPAGE へ </a> */}
			<CytoscapeGraph
				jpnSynos={jpnSynos}
				relations={userRelation}
				userId={userId}
				userSynsets={userSynset}
				vocabs={vocab}
				words={words}
			/>
		</>
	);
}
