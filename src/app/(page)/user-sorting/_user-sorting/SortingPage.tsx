

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import SubmitGroup from "~/app/(page)/user-sorting/_user-sorting/SubmitGroup";
import { USER_GROUP_ENDPOINT, USER_GROUP_JAPANESE } from "~/app/(page)/user-sorting/_user-sorting/const";
import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { USER_GROUP } from "~/rules/prisma";

export default async function SortingPage({ group }: { group: Exclude<typeof USER_GROUP[keyof typeof USER_GROUP], typeof USER_GROUP.UNTOUCHED> }) {

	const session = await getServerSession(authOptions);

	if (!session) {
		// セッションがない場合はリダイレクト
		const params = new URLSearchParams()
		params.set("redirect", `/user-sorting/${USER_GROUP_ENDPOINT[group]}`)
		redirect(`/login?${params.toString()}`);
	}
	const userId = session.user.id
	const userGroup = await prisma.userGroup.findFirst({
		where: { userId }
	})
	return (
		<div>
			{(() => {
				console.log("userGroup?.group",userGroup?.group)
				switch (userGroup?.group) {
					case USER_GROUP.UNTOUCHED:
					case undefined:
						return (
							<ShadcnH2>
								ここは{USER_GROUP_JAPANESE[group]}ユーザのための組み分けページです。それ以外の方は監督者に申し出てください。
							</ShadcnH2>
						)
					case USER_GROUP.COMPARISON:
					case USER_GROUP.PAPER:
					case USER_GROUP.SYSTEM:
						return (
							<ShadcnH2>
								すでに {Object.keys(USER_GROUP).find(key => USER_GROUP[key as keyof typeof USER_GROUP] === userGroup.group)}
								に割り当てられています
							</ShadcnH2>
						)
					default:
						return (
							<ShadcnH2>
								予期せぬエラーです.{userGroup?.group}
							</ShadcnH2>
						)

				}

				
			})()}
			<SubmitGroup group={group}/>
		</div>
	)
}
