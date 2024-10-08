import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/lib/auth";
import CardLearning from "~/components/CardLearning";


export default async function Words () {
    const session = await getServerSession(authOptions);

    if (!session) {
      // セッションがない場合は /login にリダイレクト
      redirect("/login");
    }

    
  return (
    <>
    <CardLearning></CardLearning>
    {/* <a href="/learning/graph">学習を終わる</a> */}
    </>
  )
}