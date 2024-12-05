import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SubmitGroup from "~/app/(page)/dev/_dev/SubmitGroup";
import { authOptions } from "~/lib/auth";

export default async function Page(){
	const session = await getServerSession(authOptions);
  
	if (!session) {
		// セッションがない場合はリダイレクト
		const params = new URLSearchParams()
		params.set("redirect", `/dev/entry`)
		redirect(`/login?${params.toString()}`);
	}
	return(
		<div>
			<SubmitGroup group={4}/>
		</div>
	)
}