import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import Link from "~/components/Link";
import WatchUser from "~/components/WatchUser";
import { ShadcnH2, ShadcnP } from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/lib/auth"; // authOptionsはnext-auth設定をインポート
import prisma from "~/lib/prisma";
import { USER_GROUP } from "~/rules/prisma";

export default async function ProtectedPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		redirect("/login");
	}

	const userGroup = await prisma.userGroup.findFirst({
		where: {
			userId: session.user.id
		}
	})

	if (!userGroup) {
		redirect("/user-sorting")
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
			<div className="p-4">
				{/* <ShadcnH1>英語学習アプリ(仮)</ShadcnH1> */}
				<ShadcnH2>
					{getGreeting()} {session.user?.name} さん！
				</ShadcnH2>

				{(
					userGroup.group == USER_GROUP.SYSTEM
					|| userGroup.group == USER_GROUP.COMPARISON
				) && (
					<ShadcnP>
						<Link href={"/learning/words"} userId={session.user.id}>
							<Button>単語学習へ</Button>
						</Link>
					</ShadcnP>
				)
				}
				{userGroup.group == USER_GROUP.SYSTEM && (
					<ShadcnP>
						<Link href={"/learning/graph"} userId={session.user.id}>
							<Button>学習した単語を見る</Button>
						</Link>
					</ShadcnP>
				)}
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
