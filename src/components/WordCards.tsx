"use client";
import { Pos } from "~/app/types/wordnet";
import type { WordData } from "~/app/types/wordnet";

import useSWR from "swr";
import WordCard from "./WordCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

import { Prisma, PrismaClient } from "@prisma/client";
import Link from "next/link";
import {
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useState,
} from "react";
import {
	WordInfosContextType,
	type WordInfosType,
} from "~/app/types/statesContextsTypes";
import { Button } from "~/components/ui/button";
import {
	upsertUserSynset,
	upsertUserVocab,
	upsertUserWordSynsetRelation,
} from "~/utils/prismaUpserts";
// import useEmblaCarousel from "embla-carousel-react";

import { Types } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { ErrorCard } from "~/components/ErrorCard";
import LoadingCard from "~/components/LoadingCard";
import { authOptions } from "~/lib/auth";
import { updateLevelLearning } from "~/utils/prismaUpserts";
import { fetcher } from "~/utils/swrFetcher";

// export const WordInfosContext = createContext({} as WordInfosContextType)
// = createContext<{
//     [k: number]: WordData[0]
// }>({})

export default function WordCards({
	wordids,
	defaultWordInfos,
	userId,
}: {
	wordids: [string, number, string][];
	defaultWordInfos: WordInfosType;
	userId: string;
}) {
	// const prisma = new PrismaClient()

	const [wordInfos, setWordInfos] = useState<WordInfosType>(defaultWordInfos);
	// const [cardComps, setCardComps] = useState<JSX.Element[]>([]);

	const [restWordids, setRestWordids] = useState(wordids);

	const lastWordid = wordids[wordids.length - 1][1];
	const [cardFinished, setCardFinished] = useState(false);

	const cardComps = wordids.map((wid, index) => {
		const { data, error, isLoading } = useSWR(
			`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wid[1]}`,
			fetcher<WordData[0]>,
			{ refreshInterval: 0, revalidateOnFocus: false },
		);

		const caroucelSlide = data ? (
			<WordCard
				key={`wordcard+${wid[1]}+${index}`}
				wordInfo={data}
				word={wid[0]}
				isHovered={false}
				wordInfos={wordInfos}
				setWordInfos={setWordInfos}
			/>
			// <LoadingCard/>
		) : isLoading ? (
			<LoadingCard key={`LoaringCard+${wid[1]}+${index}`} />
		) : (
			<ErrorCard
				key={`ErrorCard+${wid[1]}+${index}`}
				status={error.status}
				errmsg={"An error occurred while fetching the data"}
				url={error.url}
				info={error.info}
			/>
		);

		// data && setWordInfos((prev) => { return { ...prev, [wid[1]]: data } })

		return (
			<React.Fragment key={`cardComps+${wid[1]}+${index}`}>
				<CarouselItem
					key={`CarouselItem+${wid[1]}+${index}`}
					style={{
						height: "100vh",
						overflowY: "scroll",
					}}
				>
					{caroucelSlide}
				</CarouselItem>

				{index >= wordids.length - 1 && (
					<CarouselItem
						key={"end"}
						className="flex items-center justify-center h-full"
						style={{
							height: "100vh",
							overflowY: "scroll",
						}}
					>
						<Button
							key={"endbutton"}
							className=""
							onClick={() => {
								console.log(wordInfos);
								fetch("/api/user-data/update-all-learnings", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(wordInfos),
								});
							}}
						>
							<Link href={"/mypage"}>Mypage</Link>
						</Button>
						<p>TODO: ここに後で今学んだものの graph を表示する</p>
					</CarouselItem>
				)}
			</React.Fragment>
		);
	});

	/**
	 * Wordinfo の fetch
	 */
	// useEffect(() => {
	// 	(async function () {
	// 		if (restWordids.length !== 0 && !cardFinished) {

	// 			const wid = restWordids[0]

	// 			console.log(wid)

	// 			const data = await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wid[1]}`).then((res) => res.json())

	// 			setWordInfos((prev) => { return { ...prev, [wid[1]]: data } })
	// 			setCardComps((prev) => {
	// 				const card = (
	// 					<CarouselItem
	// 						key={wid[1]}
	// 						style={{
	// 							height: "100vh",
	// 							overflowY: "scroll",
	// 						}}
	// 					>
	// 						<WordCard
	// 							wordInfo={data}
	// 							word={wid[0]}
	// 							isHovered={false}
	// 							wordInfos={wordInfos}
	// 							setWordInfos={setWordInfos}
	// 						/>
	// 					</CarouselItem>
	// 				)

	// 				if (wid[1] === lastWordid) {
	// 					const lastCard = (
	// 						<CarouselItem
	// 							key={"end"}
	// 							className="flex items-center justify-center h-full"
	// 							style={{
	// 								height: "100vh",
	// 								overflowY: "scroll",
	// 							}}
	// 						>
	// 							<Button
	// 								className=""
	// 								onClick={() => {
	// 									fetch("/api/user-data/update-all-learnings", {
	// 										method: "POST",
	// 										headers: {
	// 											"Content-Type": "application/json",
	// 										},
	// 										body: JSON.stringify(wordInfos),
	// 									});
	// 								}}
	// 							>
	// 								<Link href={"/mypage"}>Mypage</Link>
	// 							</Button>
	// 							<p>TODO: ここに後で今学んだものの graph を表示する</p>
	// 						</CarouselItem>
	// 					)
	// 					return [...prev, card, lastCard]
	// 				}
	// 				return [...prev, card]
	// 			})
	// 			setRestWordids((prev) => { const tmp = [...prev]; tmp.shift(); return tmp })
	// 		}

	// 		console.log("wordinfos======",wordInfos)
	// 	})()
	// }, [wordids, lastWordid, restWordids])

	// ======================================================

	// useEffect(() => {
	// 	const Cards = wordids.map(([word, wordid]) => (
	// 		<CarouselItem
	// 			key={wordid}
	// 			style={{
	// 				height: "100vh",
	// 				overflowY: "scroll",
	// 			}}
	// 		>
	// 			<WordCard
	// 				wordInfo={defaultWordInfos[wordid]}
	// 				word={word}
	// 				isHovered={false}
	// 				wordInfos={wordInfos}
	// 				setWordInfos={setWordInfos}
	// 			/>
	// 		</CarouselItem>
	// 	));
	// 	console.log(Cards);

	// 	Cards.push(
	// 		<CarouselItem
	// 			key={"end"}
	// 			className="flex items-center justify-center h-full"
	// 			style={{
	// 				height: "100vh",
	// 				overflowY: "scroll",
	// 			}}
	// 		>
	// 			<Button
	// 				className=""
	// 				onClick={() => {
	// 					fetch("/api/user-data/update-all-learnings", {
	// 						method: "POST",
	// 						headers: {
	// 							"Content-Type": "application/json",
	// 						},
	// 						body: JSON.stringify(wordInfos),
	// 					});
	// 				}}
	// 			>
	// 				<Link href={"/mypage"}>Mypage</Link>
	// 			</Button>
	// 			<p>TODO: ここに後で今学んだものの graph を表示する</p>
	// 		</CarouselItem>,
	// 	);

	// 	setCardComps(Cards);
	// 	console.log(wordInfos, wordids);
	// }, [wordInfos, wordids]);

	// // carousel
	// const [emblaRef, emblaApi] = useEmblaCarousel()

	// const scrollPrev = useCallback(() => {
	//     if (emblaApi) emblaApi.scrollPrev()
	// }, [emblaApi])

	// const scrollNext = useCallback(() => {
	//     if (emblaApi) emblaApi.scrollNext()
	// }, [emblaApi])

	// // const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
	// // const scrollNext = () => emblaApi && emblaApi.scrollNext();
	console.log(wordInfos, wordids);

	return (
		<Carousel
			style={{
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				position: "relative",
			}}
		>
			<CarouselContent
				//  style={{ height: '100%', overflowY: 'auto' }}
				style={{ height: "100%", display: "flex" }}
			>
				{cardComps}
				{/* {Cards} */}
			</CarouselContent>
			{/* <button className="embla__prev" onClick={scrollPrev}>
                Prev
            </button>
            <button className="embla__next" onClick={scrollNext}>
                Next
            </button> */}
			<CarouselPrevious className="absolute left-0 z-10" />
			<CarouselNext className="absolute right-0 z-10" />
		</Carousel>
	);
}

// "use client";
// import { Pos } from "~/app/types/wordnet";
// import { WordData } from "~/app/types/wordnet";

// import WordCard from "./WordCard";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

// import { createContext, useEffect, useState } from "react";
// import { WordInfosContextType, WordInfosType } from "~/app/types/statesContextsTypes";

// export const WordInfosContext = createContext({} as WordInfosContextType)

// export default function WordCards(
//     { wordids, defaultWordInfos }: {
//         wordids: [string, number, string][],
//         defaultWordInfos: WordInfosType
//     }
// ) {

//     const [wordInfos, setWordInfos] = useState<WordInfosType>(defaultWordInfos)
//     const [cardComps, setCardComps] = useState<JSX.Element[]>([])

//     useEffect(() => {
//         const Cards = wordids.map(([word, wordid]) => (
//             <CarouselItem key={wordid} style={{ flexShrink: 0 }}>
//                 <WordCard wordInfo={defaultWordInfos[wordid]} word={word} isHovered={false} />
//             </CarouselItem>
//         ));
//         setCardComps(Cards)
//     }, [wordInfos, wordids])

//     return (
//         <Carousel style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
//             <CarouselContent style={{ height: '100%', overflowY: 'auto', display: 'flex' }}>
//                 <WordInfosContext.Provider value={[wordInfos, setWordInfos]}>
//                     {cardComps}
//                 </WordInfosContext.Provider>
//             </CarouselContent>
//             <CarouselPrevious style={{ position: 'absolute', left: '10px', zIndex: 10 }} />
//             <CarouselNext style={{ position: 'absolute', right: '10px', zIndex: 10 }} />
//         </Carousel>
//     )
// }
