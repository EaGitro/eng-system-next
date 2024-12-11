"use client";

import React, { useState } from "react";

import { Loader } from "lucide-react";
// import { redirect, useRouter } from "next/navigation";
import useSWR from "swr";

import WordCard from "./WordCard";


import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { WordData } from "~/app/types/wordnet";

import { ErrorCard } from "~/components/ErrorCard";
import Link from "~/components/Link";
import LoadingCard from "~/components/LoadingCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	// CarouselNext,
	// CarouselPrevious,
	CustomCarouselNext,
	CustomCarouselPrevious,
} from "~/components/shadcnCustomized/CustomCarousel";
import { Button } from "~/components/ui/button";
import { fetcher } from "~/utils/swrFetcher";
import { sleep } from "~/utils/util";

export default function WordCards({
	defaultWordInfos,
	userId,
	wordids,
}: {
	defaultWordInfos: WordInfosType;
	userId: string;
	wordids: [string, number, string][];
}) {
	const [wordInfos, setWordInfos] = useState<WordInfosType>(defaultWordInfos);

	const [loading, setLoading] = useState<boolean>(false)

	// const router = useRouter()

	const cardComps = wordids.map((wid, index) => {
		const { data, error, isLoading } = useSWR(
			`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wid[1]}`,
			fetcher<WordData[0]>,
			{ refreshInterval: 0, revalidateOnFocus: false },
		);

		const caroucelSlide = data ? (
			<WordCard
				hasTitle={true}
				isHovered={false}
				key={`wordcard+${wid[1]}+${index}`}
				setWordInfos={setWordInfos}
				userId={userId}
				word={wid[0]}
				wordInfo={data}
				wordInfos={wordInfos}
			/>
			// <LoadingCard/>
		) : isLoading ? (
			<LoadingCard key={`LoaringCard+${wid[1]}+${index}`} />
		) : (
			<ErrorCard
				errmsg={"An error occurred while fetching the data"}
				info={error.info}
				key={`ErrorCard+${wid[1]}+${index}`}
				status={error.status}
				url={error.url}
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
						className="flex items-center justify-center"
						key={"end"}
						style={{
							// height: "100vh",
							overflowY: "scroll",
						}}
					>
						<Button
							// asChild
							className=""
							key={"endbutton"}
							onClick={async () => {
								setLoading(true)
								console.log(wordInfos);
								await fetch("/api/user-data/update-all-learnings", {
									body: JSON.stringify(wordInfos),
									headers: {
										"Content-Type": "application/json",
									},
									method: "POST",
								});
								await sleep(500)
								setLoading(false)
								// window.location.href = "/learning/graph"
								// router.push("/learning/graph")
							}}
						>
							<Link href={"/learning/graph"} userId={userId}>
								学習を終了する
							</Link>
						</Button>
					</CarouselItem>
				)}
			</React.Fragment>
		);
	});

	console.log(wordInfos, wordids);

	return (
		<>
			{loading && (<Loader className="absolute inset-0 m-auto animate-spin" size={100} />)}
			<Carousel
				style={{
					height: "100%",
					width: "100vw",
				// overflow: "hidden",
				// position: "relative",
				}}
			>
				<CarouselContent
				//  style={{ height: '100%', overflowY: 'auto' }}
					style={{ display: "flex", height: "100%" }}
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
				<CustomCarouselPrevious className="absolute left-4 z-10 w-16 h-16 opacity-70 border-double bg-stone-400" size={"icon"} />
				<CustomCarouselNext className="absolute right-4 z-10 w-16 h-16 opacity-70 border-double bg-stone-400" size={"icon"} />
			</Carousel>
		</>
	);
}
