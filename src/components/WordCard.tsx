"use client";
// import React, { useEffect, useState } from 'react';



import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { WordData } from "~/app/types/wordnet";
import type { WordCardClick } from "~/rules/clickdata";

import Bouncing from "~/components/Bouncing";
import { watchClick } from "~/components/WatchUser";
import {
	ShadcnBlockquote,
	ShadcnH2,
	ShadcnH3,
	ShadcnH4,
	ShadcnListCss,
	ShadcnMuted,
} from "~/components/shadcnCustomized/Typography";
import { shadcnH2 } from "~/components/shadcnCustomized/TypographyClassName";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "~/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "~/components/ui/drawer";
import { CLICK_TYPE, CLICK_V2_BASEURL, generateTimestamp } from "~/rules/clickdata";
import { fetchWordInfo } from "~/utils/fetchWordInfo";

// TODO: USE usestate FOR FETCHING
export default function WordCard({
	hasTitle,
	isHovered = true,
	setWordInfos,
	userId,
	word,
	wordInfo,
	wordInfos,
}: {
	hasTitle?: boolean;
	isHovered?: boolean;
	setWordInfos: Dispatch<SetStateAction<WordInfosType>>;
	userId: string;
	word: string;
	wordInfo: WordData[0];
	wordInfos: WordInfosType;
}) {
	console.log(word, isHovered);

	// const [wordInfos, setWordInfos] = isInContext? useContext(WordInfosContext): useState({});

	const [synsetComps, setSynsetComps] = useState<JSX.Element[]>();

	useEffect(() => {
		async function updateWordInfos(wordid: number) {
			if (wordInfos[wordid]) return;
			const response = await fetchWordInfo(wordid);
			setWordInfos((prev) => ({ ...prev, [wordid]: response }));
		}

		setWordInfos((prev) => {
			return prev[wordInfo.wordid]
				? prev
				: { ...prev, [wordInfo.wordid]: wordInfo };
		});

		const synsets = wordInfo.synsets;
		// synsets.sort((a, b) => b.freq - a.freq); // sort synsets in descending order
		console.log({ synsets })
		const synsetComps_ = synsets.map((synset) => {
			const examples: (string | JSX.Element | string[] | JSX.Element[])[] = [];
			synset.examples.forEach((ex) => {
				examples.push(
					<ul className={ShadcnListCss} key={`ul+${ex.eng}`}>
						<li key={ex.eng}>
							<ShadcnBlockquote>{ex.eng}</ShadcnBlockquote>
							<ul className={ShadcnListCss} key={`ul+${ex.jpn}`}>
								<li key={ex.jpn}>
									<ShadcnBlockquote>{ex.jpn}</ShadcnBlockquote>
								</li>
							</ul>
						</li>
					</ul>,
				);
			});
			const synos = synset.syno_list;
			synos.sort((a, b) => b.freq - a.freq); // sort synos in descending order
			const synoComps = synos.map((syno) => {
				return (
					<Drawer key={syno.word}>
						<DrawerTrigger
							onMouseEnter={() => {
								// console.log("trigger onMouseEnter =====")
								// updateWordInfos(syno.wordid);
								// watchClick<"wordcard-syno">(userId, "wordcard-syno", {
								// 	synsetid: synset.synsetid,
								// 	wordid: syno.wordid,
								// });
							}}
						>
							<Bouncing onClick={() => {
								console.log("trigger onMouseEnter =====")
								updateWordInfos(syno.wordid);
								watchClick<"wordcard-syno">(userId, "wordcard-syno", {
									synsetid: synset.synsetid,
									wordid: syno.wordid,
								});

								/**
								 * watching user click
								 */
								fetch(`${CLICK_V2_BASEURL}/${userId}`,
									{
										body: JSON.stringify(
											{
												baseWord: word,
												clickedWord: syno.word,
												date: generateTimestamp(),
												path: location.pathname,
												synsetid: synset.synsetid,
												type: CLICK_TYPE.wordCard
											} as WordCardClick
										),
										headers: {
											"Content-Type": "application/json",
										},
										method: "POST",
									},
								)
							}}>
								<strong>{syno.word}</strong>
							</Bouncing>
						</DrawerTrigger>
						{wordInfos[syno.wordid] && (
							<DrawerContent className="mt-4 h-4/5">
								{
									<DrawerHeader>
										<DrawerTitle className={shadcnH2}>
											{/*<ShadcnH2>*/}
											{`${syno.word} (${wordInfos[syno.wordid].pos})`}
											{/* </ShadcnH2> */}
										</DrawerTitle>
									</DrawerHeader>
								}
								<WordCard
									isHovered={true}
									setWordInfos={setWordInfos}
									userId={userId}
									word={syno.word}
									wordInfo={wordInfos[syno.wordid]}
									wordInfos={wordInfos}
								/>
							</DrawerContent>
						)}
					</Drawer>
				);
				// }
			});

			return (
				<Card key={synset.synsetid}>
					<CardHeader>
						<ShadcnH3>{synset.defs[0].jpn ?? synset.defs[0].eng}</ShadcnH3>
						<CardDescription>
							{synset.defs[0].jpn ? synset.defs[0].eng : ""}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ShadcnH4>例:</ShadcnH4>
						{examples}
						{(synoComps.length != 0 ? (
							<>
								<ShadcnH4>
									類義語:<ShadcnMuted>(単語をクリックで詳細)</ShadcnMuted>
								</ShadcnH4>
								<div className="flex justify-center items-center gap-4">
									{synoComps}
								</div>
							</>
						) : (
							<ShadcnH4>
								類義語:
							</ShadcnH4>
						))}

					</CardContent>
				</Card>
			);
		});
		setSynsetComps(synsetComps_);
		// })();
		console.log("wordinfos ========", wordInfos);
	}, [wordInfos, wordInfo]);

	return (
		<Card
			style={
				isHovered
					? {
						overflowY: "scroll",
					}
					: {
						height: "90vh",
					}
			}
		>
			{hasTitle && (
				<CardHeader>
					<ShadcnH2>{`${word} (${wordInfo.pos})`}</ShadcnH2>
				</CardHeader>
			)}
			<CardContent>{synsetComps}</CardContent>
		</Card>
	);
}
