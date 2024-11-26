import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import TestPage from "~/app/(page)/test/_test-page/TestPage";
import { authOptions } from "~/lib/auth";
import { WORD_LIST_ANSWERS, WORD_LIST_ORDERED } from "~/rules/wordlist";

// import { CommonWords, CommonWordsAnses, OrderedCommonWordsAnses} from "~/rules/wordlist_";

export default async function Page() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		const params = new URLSearchParams()
		params.set("redirect","/test/pre")
		redirect(`/login?${params.toString()}`);
	}

	// const userId = session.user.id;
	// const group = (await prisma.userGroup.findUnique({
	//     where: { userId }
	// }))?.group

	// const pretestStatus = (await prisma.preTestStatus.findUnique({
	//     where: { userId }
	// }))?.status;

	// if (group == USER_GROUP.UNTOUCHED || group == undefined || pretestStatus == TEST.STATUS.COMPLETED) {
	//     return (
	//         <div></div>
	//     )
	// } else if (pretestStatus == TEST.STATUS.IN_PROGRESS) {

	// }
	const userId = session.user.id;
	const mailaddr = session.user?.email??undefined;

	return (
		<>
			<TestPage
				mailaddr={mailaddr}
				prePost={"pre"}
				testAns={
					// Object.fromEntries(
					// 	(
					// 		Object.keys(WORD_LIST_ANSWERS) as (keyof typeof WORD_LIST_ANSWERS)[]
					// 	).map((k) => [k, WORD_LIST_ANSWERS[k].num]),
					// )
					WORD_LIST_ANSWERS
				}
				testData={WORD_LIST_ORDERED}
				userId={userId}
				wordList={WORD_LIST_ORDERED.flatMap((sec) => sec.words)}
			/>
		</>
	);
}
