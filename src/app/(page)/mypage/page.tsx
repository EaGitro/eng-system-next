import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "~/components/LogoutButton";
import { authOptions } from "~/lib/auth"; // authOptionsはnext-auth設定をインポート

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // セッションがない場合は /login にリダイレクト
    redirect("/login");
  }

  return (
    <div>
      <h1>Hello {session.user?.name}</h1>
      <p>Welcome, {session.user?.name}!</p>
      <p><a href="/learning/words">単語学習へ</a></p>
      <p><a href="/learning/graph">学習した単語を見る</a></p>
      <p><LogoutButton></LogoutButton></p>

    </div>
  );
}