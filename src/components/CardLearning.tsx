
import { Pos } from "~/app/types/wordnet";
import { WordData } from "~/app/types/wordnet";

import WordCards from "./WordCards";
// import WordCard from "./WordCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";


import { WordInfosType } from "~/app/types/statesContextsTypes";


// = createContext<{
//     [k: number]: WordData[0]
// }>({})

// TODO: useContext に state を渡すと、 state が変更されたさいに Context 全体が再レンダリングされるらしいので、後で直す。 useref/usememo/useReducer あたりかな 
export default async function CardLearning() {
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




    const url = process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/tmp-learning-words";
    const wordList = await (await fetch(url)).json();

    /**
     * [word, wordid, pos][]
     */
    const wordids: [string, number, string][] = await (await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/words2wordids`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wordList),
    })).json();


    // fetch wordinfos



    const wordInfos: WordInfosType = {}
    for (const wid of wordids) {

        wordInfos[wid[1]] = await (await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wid[1]}`)).json();
    }







    return (
        <WordCards wordids={wordids} defaultWordInfos={wordInfos} ></WordCards>
    )

}