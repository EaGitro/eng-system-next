import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { WordInfosType } from "~/app/types/statesContextsTypes";
import WordCards from "~/components/WordCards";
import { authOptions } from "~/lib/auth";
import { nextFetchCache } from "~/rules/fetchCache";
import { CommonWords } from "~/rules/wordlist";
import { createApiRouteUrl } from "~/utils/createApiRouteUrl";

export default async function Page({ params }: { params: { level: keyof typeof CommonWords, section: string } }) {


    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/mypage")
    }


    // const q = new URLSearchParams({ level: params.level, section: `${Number(params.section) + 1}` })
    // const url = createApiRouteUrl(`/api/word-list?${q}`);
    // console.log("level-section-url",url)
    // const wordList = await (await fetch(url)).json()
    const wordList = CommonWords[params.level][Number(params.section) + 1];

    console.log("level-section-wordlist========", wordList)

    /**
     * [word, wordid, pos][]
     */
    const wordids: [string, number, string][] = await (
        await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/words2wordids`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(wordList),
            ...nextFetchCache
        })
    ).json();


    const wordInfos: WordInfosType = {};
    return (
        <WordCards
            wordids={wordids}
            defaultWordInfos={wordInfos}
            userId={session.user.id}
        ></WordCards>
    )
}