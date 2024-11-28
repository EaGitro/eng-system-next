"use client"
import { useState } from "react";

import { Check, Loader } from "lucide-react";

import type { SubmitGroupResponse } from "~/app/(page)/user-sorting/_user-sorting/type";
import type { USER_GROUP } from "~/rules/prisma";

import { USER_GROUP_JAPANESE } from "~/app/(page)/user-sorting/_user-sorting/const";
import { ShadcnInlinecode } from "~/components/shadcnCustomized/Typography";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { HASHED_KEY_SUBMIT_GROUP, simpleHash } from "~/utils/secret";

export default function SubmitGroup({ group }: { group: Exclude<typeof USER_GROUP[keyof typeof USER_GROUP], typeof USER_GROUP.UNTOUCHED> }) {
	const [submitPw, setSubmitPw] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [loading, setloading] = useState(false)
	const [receivedGroup, setReceivedGroup] = useState<number | -1>(-1)
	const onSubmit = async (group: Exclude<typeof USER_GROUP[keyof typeof USER_GROUP], typeof USER_GROUP.UNTOUCHED>) => {
		const baseUrl = "/api/user-data/submit-group"
		const params = new URLSearchParams();
		params.append("group", `${group}`);
		setloading(true);
		const res: SubmitGroupResponse = await (await fetch(`${baseUrl}?${params.toString()}`)).json()
		setloading(false)
		if (res.group === undefined) {
			setReceivedGroup(-1)
			setErrMsg(res.message)
		} else {
			setReceivedGroup(res.group)
		}
	}
	return (
		<div className="w-full">

			{loading && (<Loader className="absolute inset-0 m-auto animate-spin" size={100} />)}
			
			{(() => {
				console.log({ receivedGroup })
				switch (receivedGroup) {
					case -1:
						return (
							<>
								<Input
									onChange={(e) => setSubmitPw(e.target.value)}
									placeholder="Password"
									type="text"
									value={submitPw}
								/>
								<Button
									className="w-full"
									disabled={!(HASHED_KEY_SUBMIT_GROUP === simpleHash(submitPw))}
									onClick={async () => {
										await onSubmit(group)
									}}
								>
									組み分けを決定する
								</Button>
							</>
						)

					case group:
						return (
							<Badge
								variant={"outline"}

							>
								グループ「{USER_GROUP_JAPANESE[group]}」に正常に組み分けされました <Check />
							</Badge>
						)

					default:
						return (
							<div>
								予期せぬエラーが発生しました
								<div>
									got value: <ShadcnInlinecode>{receivedGroup}</ShadcnInlinecode> <hr />
									msg: <ShadcnInlinecode>{errMsg}</ShadcnInlinecode>
								</div>
							</div>
						);
				}
			})()}

		</div>
	)
}