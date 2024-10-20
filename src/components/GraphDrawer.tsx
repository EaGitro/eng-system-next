// import { useContext, useEffect, useRef } from "react";
// import { VocabNode } from "~/app/types/GraphTypes";
// import { WordInfosContext } from "~/components/CytoscapeGraph";
// import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
// import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "~/components/ui/drawer";
// import WordCard from "~/components/WordCard";

// export function GraphDrawer({ nodeData, isOpen }: {
//     nodeData: VocabNode["data"],
//     isOpen: boolean
// }) {

//     const [wordInfos,] = useContext(WordInfosContext)
//     return (
//         <Drawer open={isOpen}>
//             <DrawerTrigger></DrawerTrigger>
//             {
//                 wordInfos[nodeData.wordid] && (
//                     <DrawerContent
//                         className="mt-24 h-4/6"
//                     >
//                         {
//                             (
//                                 <DrawerHeader>
//                                     {<ShadcnH2>{nodeData.lemma + " (" + wordInfos[nodeData.wordid].pos + ")"}</ShadcnH2>}
//                                 </DrawerHeader>
//                             )
//                         }
//                         <WordCard word={nodeData.lemma} wordInfo={wordInfos[nodeData.wordid]} isHovered={true} />
//                     </DrawerContent>
//                 )
//             }
//         </Drawer>
//     )

// }
