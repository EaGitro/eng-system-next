import { WordData } from "./wordnet";


export type WordInfosState = {
    [k:number]: WordData[0]
} 

export type CardContextType = [
    WordInfos: WordInfosState,
    SetWordInfos: React.Dispatch<React.SetStateAction<WordInfosState>>
]