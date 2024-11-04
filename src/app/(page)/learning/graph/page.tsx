import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CytoscapeComponent from "react-cytoscapejs";
import type { WnjpId2JpnSynos, WnjpId2Words } from "~/app/types/wordnet";
import CytoscapeGraph from "~/components/CytoscapeGraph";
import { authOptions } from "~/lib/auth";
import { nextFetchCache } from "~/rules/fetchCache";
import WatchUser  from "~/components/WatchUser";

export default async function Graph() {
	const session = await getServerSession(authOptions);
	console.log("===learning graph====", session);
	if (!session) {
	    // セッションがない場合は `/login` にリダイレクト
	    redirect("/login");
	}
	const userId = session?.user.id;
	const prisma = new PrismaClient();
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
		process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/wordids2words",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(vocab.map((x) => x.wordId)),
			...nextFetchCache
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
		process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/synsetids2synos",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ synsetids: userSynset.map((x) => x.synsetId) }),
			...nextFetchCache
		},
	).then((x) => x.json());

	console.log({ synsetids: userSynset.map((x) => x.synsetId) });



	return (
		<>
		{
			session&&(
				<WatchUser userId={session.user.id}/>
			)
		}
			{/* <a href="/mypage">MYPAGE へ </a> */}
			<CytoscapeGraph
				vocabs={vocab}
				userSynsets={userSynset}
				relations={userRelation}
				words={words}
				jpnSynos={jpnSynos}
				userId = {userId}
			/>
		</>
	);
}
