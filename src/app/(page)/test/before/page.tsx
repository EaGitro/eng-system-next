import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/lib/auth";

export async function Page(){
    const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合は /login にリダイレクト
		redirect("/login");
	}

    


}