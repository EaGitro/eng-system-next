import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import CardLearning from "~/components/CardLearning";
import WatchUser from "~/components/WatchUser";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { WORD_LIST_ORDERED_EXTENDED } from "~/rules/wordlist";

export default async function Words() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		redirect("/login");
	}

	const userGroup = await prisma.userGroup.findUnique({
		where: {
			userId: session.user.id
		}
	})

	if (!userGroup) redirect("/login");
	if (userGroup.group < 4) {
		redirect("/learning/words")
	}

	return (
		<>
			{session && <WatchUser userId={session.user.id} />}
			<CardLearning userId={session.user.id} wordList={WORD_LIST_ORDERED_EXTENDED}/>
			{/* <a href="/learning/graph">学習を終わる</a> */}
		</>
	);
}
