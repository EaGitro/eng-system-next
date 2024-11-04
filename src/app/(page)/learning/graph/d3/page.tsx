// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { WnjpId2JpnSynos, WnjpId2Words } from "~/app/types/wordnet";
// import { authOptions } from "~/lib/auth";
// import { nextFetchCache } from "~/rules/fetchCache";

// export async function D3Graph() {
//     const session = await getServerSession(authOptions);
// 	console.log("===learning graph====", session);
// 	if (!session) {
// 	    // セッションがない場合は `/login` にリダイレクト
// 	    redirect("/login");
// 	}
// 	const userId = session?.user.id;
// 	const prisma = new PrismaClient();
// 	const vocab = await prisma.userVocab.findMany({
// 		where: { userId },
// 	});
// 	const userSynset = await prisma.userSynset.findMany({
// 		where: { userId },
// 	});

// 	const userRelation = await prisma.userWordSynsetRelation.findMany({
// 		where: { userId },
// 	});

// 	const words: WnjpId2Words = await fetch(
// 		process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/wordids2words",
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(vocab.map((x) => x.wordId)),
// 			...nextFetchCache
// 		},
// 	).then((x) => x.json());

// 	const jpnSynos: WnjpId2JpnSynos = await fetch(
// 		process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/synsetids2synos",
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({ synsetids: userSynset.map((x) => x.synsetId) }),
// 			...nextFetchCache
// 		},
// 	).then((x) => x.json());

// return<></>
    
// }

export default function Page(){
	return <div></div>
}