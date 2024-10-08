"use client";
import { WordData } from "~/app/types/wordnet";
// import React, { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,

} from "~/components/ui/card"

import {
    ShadcnH1,
    ShadcnH2,
    ShadcnH3,
    ShadcnH4,
    ShadcnP,
    ShadcnBlockquote,
    ShadcnListCss,
    ShadcnMuted,
} from "~/components/shadcnCustomized/Typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose, DrawerHeader } from "~/components/ui/drawer";

import { useContext, useEffect, useState } from "react";

import { WordInfosContext } from "~/components/WordCards"


// TODO: USE usestate FOR FETCHING
export default function WordCard({
    word,
    wordInfo,
    isHovered = true,
}: {
    word: string;
    wordInfo: WordData[0];
    isHovered?: boolean;
}) {

    console.log(word, isHovered)



    const [wordInfos, setWordInfos] = useContext(WordInfosContext)

    const [synsetComps, setSynsetComps] = useState<JSX.Element[]>()


    useEffect(() => {

        (async () => {

            async function updateWordInfos(wordid: number) {
                if (wordInfos[wordid]) return;
                const response = await fetchWordInfo(wordid);
                setWordInfos((prev) => ({ ...prev, [wordid]: response }));
            };




            let synsets = wordInfo.synsets
            synsets.sort((a, b) => b.freq - a.freq);    // sort synsets in descending order

            const synsetComps = await Promise.all(synsets.map(async (synset) => {
                let examples: (string | JSX.Element | string[] | JSX.Element[])[] = [];
                synset.examples.forEach((ex) => {
                    examples.push(
                        <ul className={ShadcnListCss} key={"ul+" + ex.eng}>
                            <li key={ex.eng}>
                                <ShadcnBlockquote>{ex.eng}</ShadcnBlockquote>
                                <ul className={ShadcnListCss} key={"ul+" + ex.jpn}>
                                    <li key={ex.jpn}><ShadcnBlockquote>{ex.jpn}</ShadcnBlockquote></li>
                                </ul>
                            </li>
                        </ul>
                    )

                })
                let synos = synset.syno_list; synos.sort((a, b) => b.freq - a.freq);    // sort synos in descending order
                const synoComps = await Promise.all(synos.map(async (syno) => {
                    // if (isHovered) {
                    //     return (
                    //         <Drawer key={syno.word}>
                    //             <DrawerTrigger>{syno.word}</DrawerTrigger>
                    //         </Drawer>
                    //     )
                    // } else {
                    return (
                        <Drawer key={syno.word}>
                            <DrawerTrigger onMouseEnter={() => { updateWordInfos(syno.wordid) }} >{syno.word}</DrawerTrigger>
                            {
                                wordInfos[syno.wordid] && (
                                    <DrawerContent
                                        className="mt-24 h-4/6"
                                    >
                                        {
                                           (
                                                <DrawerHeader>
                                                    {<ShadcnH2>{syno.word + " (" + wordInfos[syno.wordid].pos + ")"}</ShadcnH2>}
                                                </DrawerHeader>
                                            )
                                        }
                                        <WordCard word={syno.word} wordInfo={wordInfos[syno.wordid]} isHovered={true} />
                                    </DrawerContent>
                                )
                            }

                        </Drawer>
                    )
                    // }
                }))

                return (
                    <Card key={synset.synsetid}>
                        <CardHeader>
                            <ShadcnH3>{synset.defs[0].jpn ?? synset.defs[0].eng}</ShadcnH3>
                            <CardDescription>{synset.defs[0].jpn ? synset.defs[0].eng : ""}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ShadcnH4>
                                例:
                            </ShadcnH4>
                            {examples}
                            <ShadcnH4>
                                類義語:<ShadcnMuted>(クリックで詳細)</ShadcnMuted>
                            </ShadcnH4>
                            <div className="flex justify-center items-center gap-4">
                                {synoComps}
                            </div>
                        </CardContent>
                    </Card>
                )

            }))
            setSynsetComps(synsetComps)
        })()
    }, [wordInfos])

    return (
        <Card style={
            isHovered ? {
                overflowY: "scroll",
            } : {}
        }>
            {
                !isHovered && (
                    <CardHeader>
                        <ShadcnH2>{word + " (" + wordInfo.pos + ")"}</ShadcnH2>
                    </CardHeader>
                )
            }
            <CardContent>
                {synsetComps}
            </CardContent>

        </Card>
    )
}


// Helper function to fetch WordInfo asynchronously
async function fetchWordInfo(wordid: number): Promise<WordData[0]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/wid/${wordid}`);
    return response.json();
}