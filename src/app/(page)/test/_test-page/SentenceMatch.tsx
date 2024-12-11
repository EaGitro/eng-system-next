import { useState } from "react";

import type { TEST_ANS, TEST_DATA, tSENTENCE_MATCH_USER_CHOICE_TABLE, UserChoices } from "~/app/(page)/test/_test-page/type";
import type { Expand } from "~/app/types/utils";

import MatchingTable from "~/app/(page)/test/_test-page/MatchingTable";
import TimerTimeLeft from "~/app/(page)/test/_test-page/TimerTimeLeft";
import { SENTENCE_MATCH_USER_CHOICE_TABLE, TEST_TIMELIMIT_SEC } from "~/app/(page)/test/_test-page/const";
import { Button } from "~/components/ui/button";

export default function SentenceMatch({
	className, onComplete, testAns, testData
}: {
	className?: string;
	onComplete: (matchResults: UserChoices) => void;
	testAns: TEST_ANS
	testData: Expand<TEST_DATA>
}) {
	const [matches, setMatches] = useState<Record<string, number>>({});

	console.log(matches)
	const handleSubmit = () => {
		const matchResults: UserChoices = Object.fromEntries(testData.map((v)=>v.words).flat()
			.map((word) => ([
				word,
				{
					choice: ((matches[word] ? matches[word] : SENTENCE_MATCH_USER_CHOICE_TABLE.UNSELECTED) as tSENTENCE_MATCH_USER_CHOICE_TABLE.tCHOICES),
					isCorrect: matches[word] == (testAns[word as keyof typeof testAns].num??4),
					isNullAns:  (testAns[word as keyof typeof testAns].num) === null
				}
			])))
		onComplete(matchResults)
	}

	return (
		<div className={`${className} space-y-3`} >
			{testData.map((sec, i) => (
				<MatchingTable className={"bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow min-h-40 content-center"} key={i} secData={sec} setMatch={setMatches}/>
			))}
			<TimerTimeLeft
				handleSubmit={handleSubmit}
				totalSec={TEST_TIMELIMIT_SEC.MATCHING}
			/>
			<Button
				className="w-full mt-6"
				onClick={handleSubmit}
			// disabled={Object.keys(wordKnowledge).length !== words.length}
			>
				テスト終了!
			</Button>
		</div>
	);
}
