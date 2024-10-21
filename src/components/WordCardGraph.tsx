import { UserSynset, UserVocab, UserWordSynsetRelation } from "@prisma/client";
import { WordInfosType } from "~/app/types/statesContextsTypes";
import { Expand } from "~/app/types/utils";
import { WnjpId2JpnSynos, WnjpId2Words } from "~/app/types/wordnet";
import CytoscapeGraph from "~/components/CytoscapeGraph";

export default function WordCardGraph(
    {wordInfos}:{
        wordInfos: WordInfosType
    }
){
    let synsets:UserSynset[] = []
    let words: Expand<WnjpId2Words> = {} 
    let vocabs: UserVocab[] = []
    let relations: UserWordSynsetRelation[] = []
    let jpnSynos: WnjpId2JpnSynos = {}

    for (const wid in wordInfos){
        const wordinfo = wordInfos[wid]
    }

    return (
        <CytoscapeGraph userSynsets={synsets} words={words} vocabs={vocabs} relations={relations} jpnSynos={jpnSynos}>

        </CytoscapeGraph>
    )
}