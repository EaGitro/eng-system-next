import { useState } from "react";

import type {
	KnowledgeRate,
	KnowledgeRateState,
} from "~/app/(page)/test/_test-page/type";

import TimerTimeLeft from "~/app/(page)/test/_test-page/TimerTimeLeft";
import {
	KNOWLEDGE_LEVELS,
	TEST_TIMELIMIT_SEC,
} from "~/app/(page)/test/_test-page/const";
import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { TEST } from "~/rules/prisma";

export default function WordCheck({
	onComplete,
	words,
}: {
	onComplete: (results: Record<string, KnowledgeRate>) => void;
	words: readonly string[];
}) {
	const [wordKnowledge, setWordKnowledge] = useState<KnowledgeRateState>({});

	const handleSubmit = () => {
		for (const word of words) {
			if (wordKnowledge[word] === undefined) {
				setWordKnowledge((prev) => ({
					...prev,
					[word]: `${TEST.KNOWELEDGE_RATE.UNTOUCHED}`,
				}));
			}
		}
		onComplete(wordKnowledge);
	};
	const handleWordKnowledgeChange = (word: string, value: KnowledgeRate) => {
		setWordKnowledge((prev) => ({
			...prev,
			[word]: value,
		}));
	};

	return (
		<div className={"max-w-4xl mx-auto space-y-6 relative pb-16 "}>
			<div className="space-y-3">
				{words.map((word) => (
					<div
						className="bg-white p-3 rounded-lg shadow-sm hover:shadow transition-shadow min-h-40 content-center"
						key={word}
					>
						<div className="flex items-center gap-8">
							<div className="w-32 font-medium text-gray-900">
								<strong>{word}</strong>
							</div>
							<RadioGroup
								className="flex flex-1 items-center gap-8"
								onValueChange={(value: KnowledgeRate) =>
									handleWordKnowledgeChange(word, value)
								}
								value={wordKnowledge[word]}
							>
								{KNOWLEDGE_LEVELS.map((level) => (
									<div className="flex items-center gap-2" key={level.value}>
										<RadioGroupItem
											className="cursor-pointer"
											id={`${word}-${level.value}`}
											value={`${level.value}`}
										/>
										<label
											className="text-sm text-gray-600 cursor-pointer"
											htmlFor={`${word}-${level.value}`}
										>
											{level.label}
										</label>
									</div>
								))}
							</RadioGroup>
						</div>
					</div>
				))}
			</div>
			<TimerTimeLeft
				handleSubmit={handleSubmit}
				totalSec={TEST_TIMELIMIT_SEC.WORD_CHECK}
			/>
			<Button
				className="w-full mt-6"
				disabled={Object.keys(wordKnowledge).length !== words.length}
				onClick={handleSubmit}
			>
				語彙テストへ
			</Button>
		</div>
	);
}
