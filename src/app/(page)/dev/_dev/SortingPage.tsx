

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import SubmitGroup from "~/app/(page)/dev/_dev/SubmitGroup";
import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { USER_GROUP } from "~/rules/prisma";

export default async function SortingPage({ group }: { group: 4 }) {

	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合はリダイレクト
		const params = new URLSearchParams()
		params.set("redirect", `/dev`)
		redirect(`/login?${params.toString()}`);
	}
	const userId = session.user.id
	const userGroup = await prisma.userGroup.findFirst({
		where: { userId }
	})
	return (
		<div>
			{(() => {
				console.log("userGroup?.group", userGroup?.group)
				switch (userGroup?.group) {
					case USER_GROUP.UNTOUCHED:
					case undefined:
						return (
							<ShadcnH2>
								開発者用ページです
							</ShadcnH2>
						)
					case USER_GROUP.COMPARISON:
					case USER_GROUP.PAPER:
					case USER_GROUP.SYSTEM:
						redirect("/mypage")
						break;
					default:
						return (
							<ShadcnH2>
								予期せぬエラーです.{userGroup?.group}
							</ShadcnH2>
						)

				}


			})()}
			<SubmitGroup group={group} />
		</div>
	)
}
