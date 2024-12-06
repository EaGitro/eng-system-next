"use client"
import { useState } from "react";

import { Loader } from "lucide-react";
import { redirect } from "next/navigation";

import type { SubmitGroupResponse } from "~/app/(page)/user-sorting/_user-sorting/type";


import { HASHED_KEY_DEV_GROUP, SESSION_STORAGE_DEV_HASSESSION_KEY } from "~/app/(page)/dev/_dev/const";
import { ShadcnInlinecode } from "~/components/shadcnCustomized/Typography";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {  simpleHash } from "~/utils/secret";

export default function SubmitGroup({ group }: { group: 4 }) {
	const [submitPw, setSubmitPw] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [loading, setloading] = useState(false)
	const [receivedGroup, setReceivedGroup] = useState<number | -1>(-1)
	const onSubmit = async (group: 4) => {
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
									disabled={!(HASHED_KEY_DEV_GROUP === simpleHash(submitPw))}
									onClick={async () => {
										await onSubmit(group)
									}}
								>
									送信する
								</Button>
							</>
						)

					case group:
						// return (
						// 	<Badge
						// 		variant={"outline"}

						// 	>
						// 		正常に処理が終了しました <Check />
                
						// 	</Badge>
						// )
						sessionStorage.setItem(SESSION_STORAGE_DEV_HASSESSION_KEY, String(Date.now()))
						redirect("/dev")
						break;

					default:
						return (
							<div>
								予期せぬエラーが発生しました
								<div>
									got value: <ShadcnInlinecode>{receivedGroup}</ShadcnInlinecode> <br />
									msg: <ShadcnInlinecode>{errMsg}</ShadcnInlinecode>
								</div>
							</div>
						);
				}
			})()}

		</div>
	)
}