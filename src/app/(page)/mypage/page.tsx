import { getServerSession } from "next-auth";
import Link from "~/components/Link";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import {
	ShadcnH1,
	ShadcnH2,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/lib/auth"; // authOptionsはnext-auth設定をインポート
import WatchUser from "~/components/WatchUser";

export default async function ProtectedPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		redirect("/login");
	}



	function getGreeting(): string {
		const currentHour = new Date().getHours();

		if (currentHour >= 5 && currentHour < 12) {
			return "おはようございます！";
		} else if (currentHour >= 12 && currentHour < 16) {
			return "こんにちは！";
		} else if (currentHour >= 16 && currentHour < 21) {
			return "こんばんは！";
		} else {
			return "遅くまで頑張ってますね！";
		}
	}

	return (
		<>
			{
				session && (
					<WatchUser userId={session.user.id} />
				)
			}
			<div className="p-4">
				{/* <ShadcnH1>英語学習アプリ(仮)</ShadcnH1> */}
				<ShadcnH2>
					{getGreeting()} {session.user?.name} さん！
				</ShadcnH2>

				<ShadcnP>
					<Link userId={session.user.id} href={"/learning/words"}>
						<Button>
							単語学習へ
						</Button>
					</Link>
				</ShadcnP>


				<ShadcnP>
					<Link userId={session.user.id} href={"/learning/graph"}>
						<Button>
							学習した単語を見る
						</Button>
					</Link>
				</ShadcnP>
			</div>
			<div className={"absolute inset-x-0 bottom-0"}>
				このアプリケーションは日本語WordNetを使用しています。<br />
				<a href="https://bond-lab.github.io/wnja/index.ja.html" className={"underline"}>
					日本語ワードネット (v1.1) © 2009-2011 NICT, 2012-2015 Francis Bond and 2016-2024 Francis Bond, Takayuki Kuribayashi
				</a>
			</div>
		</>
	);
}
