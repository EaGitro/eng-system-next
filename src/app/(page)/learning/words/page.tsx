import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CardLearning from "~/components/CardLearning";
import { authOptions } from "~/lib/auth";
import WatchUser from "~/components/WatchUser";

export default async function Words() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		redirect("/login");
	}


	return (
		<>
			{
				session && (
					<WatchUser userId={session.user.id} />
				)
			}
			<CardLearning userId={session.user.id}></CardLearning>
			{/* <a href="/learning/graph">学習を終わる</a> */}
		</>
	);
}
