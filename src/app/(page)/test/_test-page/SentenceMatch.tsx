import { useState } from "react";

import type { TEST_ANS, TEST_DATA, tSENTENCE_MATCH_USER_CHOICE_TABLE, UserChoices } from "~/app/(page)/test/_test-page/type";
import type { Expand, ObjectEntriesOf } from "~/app/types/utils";

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
		const matchResults: UserChoices = Object.fromEntries((Object.entries(testAns) as ObjectEntriesOf<typeof testAns>)
			.map(([key, v]) => ([
				key,
				{
					choice: ((matches[key] ? matches[key] : SENTENCE_MATCH_USER_CHOICE_TABLE.UNSELECTED) as tSENTENCE_MATCH_USER_CHOICE_TABLE.tCHOICES),
					isCorrect: matches[key] == (v.num??4)
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
