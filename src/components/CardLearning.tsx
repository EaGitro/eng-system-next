import { Pos } from "~/app/types/wordnet";
import { WordData } from "~/app/types/wordnet";

import WordCards from "./WordCards";
// import WordCard from "./WordCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

import type { WordInfosType } from "~/app/types/statesContextsTypes";
import { nextFetchCache } from "~/rules/fetchCache";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { ShadcnH2, ShadcnH3, ShadcnMuted, ShadcnP } from "~/components/shadcnCustomized/Typography";
import Link from "~/components/Link";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { headers } from "next/headers";
import { createApiRouteUrl } from "~/utils/createApiRouteUrl";
import { CommonWords } from "~/rules/wordlist";

// = createContext<{
//     [k: number]: WordData[0]
// }>({})

// TODO: useContext に state を渡すと、 state が変更されたさいに Context 全体が再レンダリングされるらしいので、後で直す。 useref/usememo/useReducer あたりかな
export default async function CardLearning({
	userId,
}: {
	userId: string;
}) {

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/mypage")
	}
	/**
	 * 今は仮で単語は固定
	 */
	// const url = process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/tmp-learning-words"

	// const wordList = ["test"]
	// const wordCards = wordList.map((word) => { return <WordCards word={word} /> })
	// return wordCards

	// -----------------------------------

	// const [wordInfos, setWordInfos] = useState<WordInfosState>({})

	/**
	 * [word, wordid, pos][]
	 */
	// const [wordids, setWordids] = useState<[string, number, string][]>([]);

	// const [Cards, setCards] = useState<JSX.Element[]>()


	// const levels = ["2000", "3000", "5000"];
	const levels = ["1", "2", "3", "4"] 
	let wordlists: {
		[k: (typeof levels)[number]]: string[][]
	} = {}

	for (const l of levels as (keyof typeof CommonWords)[]) {
		// const q = new URLSearchParams({ level: `${l}` })
		// const url = `${createApiRouteUrl("")}/api/word-list?${q}`;
		// const wordlist = await (await fetch(url)).json()
		// console.log("wordlist============", wordlist)
		const wordlist = CommonWords[l] 
		wordlists[l] = wordlist;
	}

	console.log("wordlists ============", wordlists)

	// const url = process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/tmp-learning-words/2010";
	// const wordList = await (await fetch(url)).json();

	// /**
	//  * [word, wordid, pos][]
	//  */
	// const wordids: [string, number, string][] = await (
	// 	await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/words2wordids`, {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify(wordList),
	// 		...nextFetchCache
	// 	})
	// ).json();

	// fetch wordinfos



	const wordInfos: WordInfosType = {};
	// for (const wid of wordids) {
	// 	wordInfos[wid[1]] = await (
	// 		await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wid[1]}`)
	// 	).json();
	// }

	return (
		// <WordCards
		// 	wordids={wordids}
		// 	defaultWordInfos={wordInfos}
		// 	userId={userId}
		// ></WordCards>
		<>
			<Accordion type={"multiple"} defaultValue={levels} className={"p-2"}>
				{
					levels.map((l, i) => {

						return (
							<AccordionItem key={`accordion-levels-${i}-${l}`} value={l}  className={"border-0 px-6"}>
								<AccordionTrigger>
									<ShadcnH2 className={""}>
										<ShadcnMuted>Level</ShadcnMuted> {i + 1}
									</ShadcnH2>
								</AccordionTrigger>
								<AccordionContent>

									<Accordion type={"single"} collapsible>
										{
											wordlists[l].map((wl, sec) => {
												return (
													<AccordionItem key={`accordion-wl-${sec}`} value={wl.join(", ")} className={"px-8"}>
														<AccordionTrigger>
															<ShadcnH3 className={"pt-2 space-y-1 text-left"}>
																Section {sec + 1}
																<ShadcnMuted className={"block text-ellipsis whitespace-nowrap overflow-hidden px-3"}>
																	{wl.join(", ")}
																</ShadcnMuted>
															</ShadcnH3>
														</AccordionTrigger>
														<AccordionContent className={"flex justify-between items-center ps-2"}>
															<ShadcnP>
																ここでは {wl.join(", ")} を勉強します
															</ShadcnP>
															<Link userId={session.user.id} href={`/learning/words/${l}/${sec}`}>
																<Button>
																	Start!
																</Button>
															</Link>
														</AccordionContent>
													</AccordionItem>
												)
											})
										}
									</Accordion>
								</AccordionContent>
							</AccordionItem>
						)
					})
				}
			</Accordion>
		</>
	);
}
