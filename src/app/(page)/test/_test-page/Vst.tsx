/* eslint-disable @typescript-eslint/no-unused-vars */


import type {
	TEST_ANS,
	TEST_DATA,
	tWORD_LIST,
	UserChoices,
} from "~/app/(page)/test/_test-page/type";
/* eslint-disable no-unused-vars */

import TimerTimeLeft from "~/app/(page)/test/_test-page/TimerTimeLeft";

export default function Vst({
	onComplete,
	testAns,
	testData,
	wordList,
}: {
/* eslint-enable no-unused-vars */
	onComplete: (results: UserChoices) => void;
	testAns: TEST_ANS;
	testData: TEST_DATA;
	wordList: tWORD_LIST;
}) {
	// const [userChoices, setUserChoices] = useState<UserChoices>({});
	// const onChoiceChange = (choice: string) => {
	// 	const [word, ans] = choice.split("-");
	// 	const correct = `${testAns[word]}` === ans;
	// 	setUserChoices((prev) => {
	// 		const newVal = { ...prev };
	// 		newVal[word] = {
	// 			choice: Number(ans),
	// 			isCorrect: correct,
	// 		};
	// 		return newVal;
	// 	});
	// };
	// const onHandleSubmit = () => {
	// 	setUserChoices((prev) => {
	// 		const newChoices: UserChoices = {};
	// 		for (const word of wordList) {
	// 			if (word in prev) {
	// 				newChoices[word] = prev[word];
	// 			} else {
	// 				newChoices[word] = {
	// 					choice: 0, 
	// 					isCorrect: false,
	// 				};
	// 			}
	// 		}
	// 		return newChoices;
	// 	});
	// 	onComplete(userChoices);
	// };
	return (
		<div className={"max-w-4xl mx-auto space-y-6 relative pb-16 "}>
			{/* {wordList.map((word, i) => (
				<div
					key={word}
					className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow min-h-40 content-center"
				>
					<ShadcnP>{[`${i + 1}.`, <strong>{word}</strong>]}</ShadcnP>
					<ShadcnMuted>{testData[word].sentence}</ShadcnMuted>
					<RadioGroup defaultValue="" onValueChange={onChoiceChange}>
						{testData[word].choices.map((choice, i) => (
							<div className="flex items-center space-x-2">
								<RadioGroupItem value={`${word}-${i}`} id={choice} />
								<Label htmlFor={choice}>{choice}</Label>
							</div>
						))}
					</RadioGroup>
				</div>
			))} */}
			{/* <TimerTimeLeft handleSubmit={onHandleSubmit} totalSec={1800} /> */}
		</div>
	);
}
