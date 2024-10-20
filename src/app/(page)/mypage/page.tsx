import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import {
	ShadcnH1,
	ShadcnH2,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/lib/auth"; // authOptionsはnext-auth設定をインポート

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
		} else if (currentHour >= 12 && currentHour < 17) {
			return "こんにちは！";
		} else if (currentHour >= 17 && currentHour < 21) {
			return "こんばんは！";
		} else {
			return "遅くまで頑張ってますね！";
		}
	}

	return (
		<div className="p-4">
			<ShadcnH1>英語学習アプリ(仮)</ShadcnH1>
			<ShadcnH2>
				{getGreeting()} {session.user?.name} さん！
			</ShadcnH2>
			<ShadcnP>
				<Button>
					<a href="/learning/words">単語学習へ</a>
				</Button>
			</ShadcnP>
			<ShadcnP>
				<Button>
					<a href="/learning/graph">学習した単語を見る</a>
				</Button>
			</ShadcnP>
			<p>
				<LogoutButton></LogoutButton>
			</p>
		</div>
	);
}
