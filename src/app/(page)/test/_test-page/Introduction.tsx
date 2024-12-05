import React, { useState } from "react";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

import MatchingTable from "~/app/(page)/test/_test-page/MatchingTable";
import { TEST_TIMELIMIT_SEC } from "~/app/(page)/test/_test-page/const";
import {
	ShadcnH3,
	ShadcnH4,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import { shadcnList } from "~/components/shadcnCustomized/TypographyClassName";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
	HASHED_KEY_STARTTEST,
	simpleHash,
} from "~/utils/secret";

export default function Introduction({
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	onResume,
	onStart,
}: {
	onResume: () => void;
	onStart: () => void;
}) {
	const [startPassword, setStartPassword] = useState("");

	const dummyWordList = {
		choices: [
			undefined,
			"part of a house",
			"animal with four legs",
			"something used for writing",
			null
		],
		words: ["business", "clock", "horse", "pencil", "shoe", "wall"]
	} as const

	return (
		<>
			<ShadcnH3>説明・注意事項</ShadcnH3>
			<ShadcnP>
				{[
					<React.Fragment key={1}>
						これからテストを始めます。以下の注意に従って進めてください。
						<strong> 合図があるまで始めないでください。</strong>
					</React.Fragment>,
				]}
			</ShadcnP>
			<ul className={shadcnList}>
				<li>
					このテストは「知識チェック」と「マッチング問題」の2部構成になっています。
				</li>
				<li>
					{" "}
					<strong>
						{" "}
						それぞれ{TEST_TIMELIMIT_SEC.WORD_CHECK / 60}分と
						{TEST_TIMELIMIT_SEC.MATCHING / 60}分の制限時間があります
					</strong>
					。 制限時間を過ぎると自動的に解答が送信されます。
					<ul className={shadcnList}>
						<li>
							途中でやめることはできません。また{" "}
							<strong>
								「知識チェック」問題が終了後、直ちに「マッチング問題」がスタートします
							</strong>
							。
						</li>
					</ul>
				</li>
				<li>
					{" "}
					<strong>
						{" "}
						全ての試験が終わるまで、ページのリロードやページの遷移、ブラウザを閉じる等の行為はご遠慮ください{" "}
					</strong>
					。
				</li>
				<li>
					単語帳やネットで調べる等の<strong>カンニングは禁止です</strong>。
				</li>
				<li>
					このテストの結果を本研究以外に使用することはありません。また個人がわかるように外部に公開することもありません。
				</li>
			</ul>
			<ShadcnH4>「知識チェック」問題</ShadcnH4>
			<ShadcnP>
				{[
					"ここではあなたが持つ単語の知識の深さ、つまりあなたがどれだけその単語を使うことが出来るか、を測ります。",
					"以下の4つの選択肢の中から最も当てはまるものを選んでください",
				]}
			</ShadcnP>

			<ol className={shadcnList}>
				<li>その単語を見たことがない</li>
				<li>見たことはあるが、意味はよくわからない</li>
				<li>意味は分かるが、自分で使うことはできない</li>
				<li>その単語を文章中で使うことができる</li>
			</ol>

			<ShadcnH4>「マッチング問題」</ShadcnH4>
			<ShadcnP>
				ここでもあなたが持つ単語の知識を測ります。
			</ShadcnP>
			<ul className={shadcnList}>
				<li>
					以下のようなテーブルがあるので、意味が最も近い、単語(縦)と選択肢(横)の正しい組み合わせを選んでください。
				</li>
				<li>
					単語がどの選択肢にも当てはまらないと思ったら、<strong>None of the above</strong>を選んでください。
				</li>
				<li>
					None of the above 以外は重複して選ぶことが出来ません。
					<ul className={shadcnList}>
						<li>
							もし選択を解除したい場合は一度 None of above を選択してから選んでください
						</li>
					</ul>
				</li>
				<li>
					推測をしてもいいですが、当てずっぽうに答えないでください。わからない場合は「わからない」を選択してください。
				</li>
			</ul>

			<MatchingTable
				className={"bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow min-h-40 content-center"}
				secData={dummyWordList}
				setMatch={function (value: React.SetStateAction<Record<string, number>>): void {
					console.log(value)
				}}
			/>

			<details className={"my-3"}>
				<summary>上記の解答</summary>
				<ul className={shadcnList}>
					<li>wall: 「壁」なので「家の一部」</li>
					<li>business: 該当なし</li>
					<li>clock: 該当なし</li>
					<li>horse: 「馬」なので「四本足の動物」</li>
					<li>pencil: 「鉛筆」なので「書くときに使われるもの」</li>
					<li>shoe: 該当なし</li>
				</ul>
				<Image
					alt={"answer"}
					height={793}
					src={"/img/sentence-match-test-ans.PNG"}
					style={{
						height: "auto",
						minWidth: 100,
						width: "100%",
					}}
					width={1669}
				/>
			</details>
			<div className="my-4" />
			<div>
				<Input
					onChange={(e) => setStartPassword(e.target.value)}
					placeholder="Password"
					type="text"
					value={startPassword}
				/>
				<Button
					className="w-full group"
					disabled={!(HASHED_KEY_STARTTEST === simpleHash(startPassword))}
					onClick={onStart}
				>
					start!
					<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
				</Button>
			</div>
		</>
	);
}
