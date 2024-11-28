"use client";

import { useRef, useState } from "react";

import type {
	KnowledgeRateState,
	StageState,
	TEST_ANS,
	TEST_DATA,
	TestResult,
	tWORD_LIST,
	UserChoices,
} from "~/app/(page)/test/_test-page/type";

import CpCodeBlock from "~/app/(page)/test/_test-page/CpCodeBlock";
import Introduction from "~/app/(page)/test/_test-page/Introduction";
import SentenceMatch from "~/app/(page)/test/_test-page/SentenceMatch";
import WordCheck from "~/app/(page)/test/_test-page/WordCheck";
import { STAGE_STATE } from "~/app/(page)/test/_test-page/const";
import {
	ShadcnH2,
	ShadcnH3,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import { Badge } from "~/components/ui/badge";
import { localStorageTestResultKey } from "~/rules/localStorage";


export default function TestPage({
	mailaddr,
	prePost,
	testAns,
	testData,
	 
	userId,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	wasInterrupted,
	wordList,
}: {
	mailaddr?:string;
	prePost: "pre" | "post";
	testAns: TEST_ANS;
	testData: TEST_DATA;
	userId: string;
	wasInterrupted?: boolean
	wordList: tWORD_LIST;
}) {
	const topRef = useRef<HTMLDivElement>(null);
	const [stage, setStage] = useState<StageState>(STAGE_STATE.INTRO);
	 
	const [knowledgeRates, setKnoweledgeRates] = useState<KnowledgeRateState>({});
	 
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
	const [matches, setMatches] = useState<UserChoices>({});
	const [testResult, setTestResult] = useState<TestResult>()
	const words = wordList;
	const handleStart = () => {
		setStage(STAGE_STATE.WORD_CHECK);
		scrolleTop()
	};

	const handleWordCheckComplete = (results: KnowledgeRateState) => {
		setKnoweledgeRates(results);
		setStage(STAGE_STATE.MATCHING);
		scrolleTop();
	};
	const handleMatchingComplete = (matchResults: UserChoices) => {
		setMatches(matchResults);
		setStage(STAGE_STATE.COMPLETE);
		console.log(matchResults);

		const dateNow = Date.now()
		const testRestResultTmp:TestResult = ({
			date: dateNow,
			knowledgeRates:knowledgeRates,
			mailaddr:mailaddr??"",
			userChoices:matchResults,
			userId:userId,
		})
		setTestResult(testRestResultTmp)
		localStorage.setItem(localStorageTestResultKey(dateNow),JSON.stringify(testRestResultTmp))
		scrolleTop();
	};

	const scrolleTop = () => {
		topRef.current?.scrollIntoView()
	}


	return (
		<div className="to-blue-100 bg-gradient-to-br from-indigo-50 " ref={topRef}>
			<div className={"flex items-center justify-center mt-3"}>
				<ShadcnH2>{prePost === "pre" ? "事前" : "事後"} テスト</ShadcnH2>
			</div>
			{(stage === STAGE_STATE.WORD_CHECK || stage === STAGE_STATE.MATCHING) && (
				<div className={"flex items-center justify-center gap-4"}>
					<Badge
						variant={stage === STAGE_STATE.WORD_CHECK ? "default" : "secondary"}
					>
						1. 知識チェック
					</Badge>
					<Badge
						variant={stage === STAGE_STATE.MATCHING ? "default" : "secondary"}
					>
						2. マッチング問題
					</Badge>
				</div>
			)}
			<div
				className={
					"rounded-lg border text-card-foreground shadow-sm p-8 bg-white/50 backdrop-blur-sm m-5 max-w-4xl  mx-auto "
				}
			>
				{(() => {
					switch (stage) {
						case STAGE_STATE.INTRO:
							return (
								<Introduction
									onResume={() => setStage(STAGE_STATE.RESUME)}
									onStart={handleStart}
								/>
							);
						case STAGE_STATE.WORD_CHECK:
							return (
								<WordCheck onComplete={handleWordCheckComplete} words={words} />
							);
						case STAGE_STATE.MATCHING:
							return (
								<SentenceMatch
									onComplete={handleMatchingComplete}
									testAns={testAns}
									testData={testData}
								// wordList={wordList}
								/>
							);
							// case STAGE_STATE.RESUME:
							//     return (
							//         <ResumeQuiz onResume={handleResume} onBack={() => setStage('intro')} />
							//     )

						case STAGE_STATE.COMPLETE:
							return (
								<div>
									<ShadcnH3>完了！</ShadcnH3>
									<ShadcnP>
										Thank you for completing the vocabulary quiz!
									</ShadcnP>
									<ShadcnP>
										以下のコードをダウンロードまたはコピーし、監督者に渡してください。ご協力ありがとうございます。
									</ShadcnP>
									<CpCodeBlock code={JSON.stringify(testResult)} prePost={prePost} />
								</div>
							);
						default:
							break;
					}
				})()}
			</div>
		</div>
	);
}
