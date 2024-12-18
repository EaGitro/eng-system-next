// "use client";
// import type { WordData } from "~/app/types/wordnet";
// // import React, { useEffect, useState } from 'react';

// import {
// 	Card,
// 	CardContent,
// 	CardDescription,
// 	CardFooter,
// 	CardHeader,
// 	CardTitle,
// } from "~/components/ui/card";

// import {
// 	ShadcnBlockquote,
// 	ShadcnH1,
// 	ShadcnH2,
// 	ShadcnH3,
// 	ShadcnH4,
// 	ShadcnListCss,
// 	ShadcnMuted,
// 	ShadcnP,
// } from "~/components/shadcnCustomized/Typography";
// import {
// 	Drawer,
// 	DrawerClose,
// 	DrawerContent,
// 	DrawerHeader,
// 	DrawerTitle,
// 	DrawerTrigger,
// } from "~/components/ui/drawer";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuTrigger,
// } from "~/components/ui/dropdown-menu";

// import {
// 	type Dispatch,
// 	type SetStateAction,
// 	use,
// 	useContext,
// 	useEffect,
// 	useState,
// } from "react";

// import {
// 	WordInfosContextType,
// 	type WordInfosType,
// } from "~/app/types/statesContextsTypes";
// import { shadcnH2 } from "~/components/shadcnCustomized/TypographyClassName";
// import { fetchWordInfo } from "~/utils/fetchWordInfo";
// import {
// 	getLocalstorageWordinfo,
// 	setLocalstorageWordinfos,
// } from "~/utils/operateLocalstorage";

// // TODO: USE usestate FOR FETCHING
// export default function WordCard({
// 	word,
// 	wordInfo,
// 	wordInfos,
// 	setWordInfos,
// 	isHovered = true,
// 	isInContext = true,
// }: {
// 	word: string;
// 	wordInfo: WordData[0];
// 	wordInfos: WordInfosType;
// 	setWordInfos: Dispatch<SetStateAction<WordInfosType>>;
// 	isHovered?: boolean;
// 	isInContext?: boolean;
// }) {
// 	console.log(word, isHovered);

// 	// const [wordInfos, setWordInfos] = isInContext? useContext(WordInfosContext): useState({});

// 	const [synsetComps, setSynsetComps] = useState<JSX.Element[]>();

// 	useEffect(() => {
// 		(async () => {
// 			async function updateWordInfos(wordid: number) {
// 				if (wordInfos[wordid]) return;
// 				const response = await fetchWordInfo(wordid);
// 				setWordInfos((prev) => ({ ...prev, [wordid]: response }));
// 			}

// 			setWordInfos((prev) => {
// 				return prev[wordInfo.wordid]
// 					? prev
// 					: { ...prev, [wordInfo.wordid]: wordInfo };
// 			});

// 			const synsets = wordInfo.synsets;
// 			synsets.sort((a, b) => b.freq - a.freq); // sort synsets in descending order

// 			const synsetComps = await Promise.all(
// 				synsets.map(async (synset) => {
// 					const examples: (string | JSX.Element | string[] | JSX.Element[])[] =
// 						[];
// 					synset.examples.forEach((ex) => {
// 						examples.push(
// 							<ul className={ShadcnListCss} key={"ul+" + ex.eng}>
// 								<li key={ex.eng}>
// 									<ShadcnBlockquote>{ex.eng}</ShadcnBlockquote>
// 									<ul className={ShadcnListCss} key={"ul+" + ex.jpn}>
// 										<li key={ex.jpn}>
// 											<ShadcnBlockquote>{ex.jpn}</ShadcnBlockquote>
// 										</li>
// 									</ul>
// 								</li>
// 							</ul>,
// 						);
// 					});
// 					const synos = synset.syno_list;
// 					synos.sort((a, b) => b.freq - a.freq); // sort synos in descending order
// 					const synoComps =
// 						await Promise.all(
// 							synos.map((syno) => {
// 								return (
// 									<Drawer key={syno.word}>
// 										<DrawerTrigger
// 											onMouseEnter={() => {
// 												updateWordInfos(syno.wordid);
// 											}}
// 										>
// 											{syno.word}
// 										</DrawerTrigger>
// 										{wordInfos[syno.wordid] && (
// 											<DrawerContent className="mt-24 h-4/6">
// 												{
// 													<DrawerHeader>
// 														<DrawerTitle className={shadcnH2}>
// 															{/*<ShadcnH2>*/}
// 															{syno.word +
// 																" (" +
// 																wordInfos[syno.wordid].pos +
// 																")"}
// 															{/* </ShadcnH2> */}
// 														</DrawerTitle>
// 													</DrawerHeader>
// 												}
// 												<WordCard
// 													word={syno.word}
// 													wordInfo={wordInfos[syno.wordid]}
// 													isHovered={true}
// 													wordInfos={wordInfos}
// 													setWordInfos={setWordInfos}
// 												/>
// 											</DrawerContent>
// 										)}
// 									</Drawer>
// 							);
// 							// }
// 						}),
// 						);

// 					return (
// 						<Card key={synset.synsetid}>
// 							<CardHeader>
// 								<ShadcnH3>{synset.defs[0].jpn ?? synset.defs[0].eng}</ShadcnH3>
// 								<CardDescription>
// 									{synset.defs[0].jpn ? synset.defs[0].eng : ""}
// 								</CardDescription>
// 							</CardHeader>
// 							<CardContent>
// 								<ShadcnH4>例:</ShadcnH4>
// 								{examples}
// 								<ShadcnH4>
// 									類義語:<ShadcnMuted>(クリックで詳細)</ShadcnMuted>
// 								</ShadcnH4>
// 								<div className="flex justify-center items-center gap-4">
// 									{synoComps}
// 								</div>
// 							</CardContent>
// 						</Card>
// 					);
// 				}),
// 			);
// 			setSynsetComps(synsetComps);
// 		})();
// 		console.log("wordinfos ========", wordInfos);
// 	}, [wordInfos]);

// 	return (
// 		<Card
// 			style={
// 				isHovered
// 					? {
// 						overflowY: "scroll",
// 					}
// 					: {}
// 			}
// 		>
// 			{!isHovered && (
// 				<CardHeader>
// 					<ShadcnH2>{word + " (" + wordInfo.pos + ")"}</ShadcnH2>
// 				</CardHeader>
// 			)}
// 			<CardContent>{synsetComps}</CardContent>
// 		</Card>
// 	);
// }
