import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import OperateSessionStorage from "~/app/(page)/dev/_dev/OperateSessionStorage";
import Link from "~/components/Link";
import WatchUser from "~/components/WatchUser";
import { ShadcnH2, ShadcnP } from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/lib/auth"; // authOptionsはnext-auth設定をインポート
import prisma from "~/lib/prisma";


export default async function ProtectedPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		const params = new URLSearchParams()
		params.set("redirect","/dev")
		redirect(`/login?${params.toString()}`);
	}

	const userGroup = await prisma.userGroup.findFirst({
		where: {
			userId: session.user.id
		}
	})



	if (!userGroup) {
		redirect("/dev/entry")
	}

	if(userGroup.group < 4){
		redirect("/mypage")
	}

	function getGreeting(): string {
		const currentHour = new Date().getHours();

		if (currentHour >= 5 && currentHour < 12) {
			return "おはようございます！";
		}
		if (currentHour >= 12 && currentHour < 16) {
			return "こんにちは！";
		}
		if (currentHour >= 16 && currentHour < 21) {
			return "こんばんは！";
		}
		return "遅くまで頑張ってますね！";
	}

	return (
		<>
			{session && <WatchUser userId={session.user.id} />}
			<OperateSessionStorage/>
			<div className="p-4">
				{/* <ShadcnH1>英語学習アプリ(仮)</ShadcnH1> */}
				<ShadcnH2>
					{getGreeting()} {session.user?.name} さん！
				</ShadcnH2>

				{(
					<ShadcnP>
						<Button asChild>
							<Link href={"/dev/learning-words"} userId={session.user.id}>
								単語学習へ
							</Link>
						</Button>
					</ShadcnP>
				)
				}
				{/* { (
					<ShadcnP>
						<Button asChild>
							<Link href={"/learning/graph"} userId={session.user.id}>
								学習した単語を見る
							</Link>
						</Button>
					</ShadcnP>
				)} */}
			</div>
			<div className={"absolute inset-x-0 bottom-0"}>
				このアプリケーションは日本語WordNetを使用しています。
				<br />
				<a
					className={"underline"}
					href="https://bond-lab.github.io/wnja/index.ja.html"
				>
					日本語ワードネット (v1.1) © 2009-2011 NICT, 2012-2015 Francis Bond and
					2016-2024 Francis Bond, Takayuki Kuribayashi
				</a>
			</div>
		</>
	);
}
