"use client";
import type { WordData } from "~/app/types/wordnet";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import { Button } from "~/components/ui/button";
import WordCard from "./WordCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

import React from "react";
import { ErrorCard } from "~/components/ErrorCard";
import LoadingCard from "~/components/LoadingCard";
import { fetcher } from "~/utils/swrFetcher";

export default function WordCards({
	wordids,
	defaultWordInfos,
	userId,
}: {
	wordids: [string, number, string][];
	defaultWordInfos: WordInfosType;
	userId: string;
}) {
	const [wordInfos, setWordInfos] = useState<WordInfosType>(defaultWordInfos);

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
						// height: "100vh",
						overflowY: "scroll",
					}}
				>
					{caroucelSlide}
				</CarouselItem>

				{index >= wordids.length - 1 && (
					<CarouselItem
						key={"end"}
						className="flex items-center justify-center"
						style={{
							// height: "100vh",
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
						
					</CarouselItem>
					
				)}
			</React.Fragment>
		);
	});

	console.log(wordInfos, wordids);

	return (
		<Carousel
			style={{
				width: "100vw",
				height: "100%",
				// overflow: "hidden",
				// position: "relative",
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
