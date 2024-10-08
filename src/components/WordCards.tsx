"use client";
import { Pos } from "~/app/types/wordnet";
import { WordData } from "~/app/types/wordnet";


import WordCard from "./WordCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

import { createContext, useEffect, useState, useCallback } from "react";
import { WordInfosContextType, WordInfosType } from "~/app/types/statesContextsTypes";
import { Button } from "~/components/ui/button";
import Link from "next/link";
// import useEmblaCarousel from "embla-carousel-react";


export const WordInfosContext = createContext({} as WordInfosContextType)
// = createContext<{
//     [k: number]: WordData[0]
// }>({})


export default function WordCards(
    { wordids, defaultWordInfos }: {
        wordids: [string, number, string][],
        defaultWordInfos: WordInfosType
    }

) {

    const [wordInfos, setWordInfos] = useState<WordInfosType>(defaultWordInfos)
    const [cardComps, setCardComps] = useState<JSX.Element[]>([])

    useEffect(() => {
        const Cards = wordids.map(([word, wordid]) => (
            <CarouselItem key={wordid} style={{
                height: '100vh',
                overflowY: "scroll"
            }}>
                <WordCard wordInfo={defaultWordInfos[wordid]} word={word} isHovered={false} />
            </CarouselItem>
        ));
        console.log(Cards)

        Cards.push(
            <CarouselItem key={"end"}
                className="flex items-center justify-center h-full"
                style={{
                    height: '100vh',
                    overflowY: "scroll"
                }}>
                <Button className=""><Link href={"/mypage"}>Mypage</Link></Button>
                <p>TODO: ここに後で今学んだものの graph を表示する</p>
            </CarouselItem>
        )

        setCardComps(Cards)
        console.log(wordInfos, wordids)
    }, [wordInfos, wordids])



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
    console.log(wordInfos, wordids)

    return (

        <Carousel
            style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}
        >
            <CarouselContent
                //  style={{ height: '100%', overflowY: 'auto' }}
                style={{ height: '100%', display: 'flex' }}
            >
                <WordInfosContext.Provider value={[wordInfos, setWordInfos]}>
                    {cardComps}
                    {/* {Cards} */}
                </WordInfosContext.Provider>
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

    )

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
