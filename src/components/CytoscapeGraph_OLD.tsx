// "use client";
// import type {
// 	UserSynset,
// 	UserVocab,
// 	UserWordSynsetRelation,
// } from "@prisma/client";
// import Cytoscape from "cytoscape";
// import fcose from "cytoscape-fcose";
// import React, { createContext, useEffect, useRef, useState } from "react";
// import CytoscapeComponent from "react-cytoscapejs";
// import type { Expand } from "~/app/types/utils";
// import type {
// 	WnjpId2JpnSynos,
// 	WnjpId2Words,
// 	WordData,
// } from "~/app/types/wordnet";

// import type { LemmaNode, VocabNode } from "~/app/types/GraphTypes";
// import type {
// 	WordInfosContextType,
// 	WordInfosType,
// } from "~/app/types/statesContextsTypes";
// import WordCard from "~/components/WordCard";
// import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
// import {
// 	Drawer,
// 	DrawerContent,
// 	DrawerHeader,
// 	DrawerPortal,
// 	DrawerTrigger,
// } from "~/components/ui/drawer";
// import { fetchWordInfo } from "~/utils/fetchWordInfo";
// import { insertNewLine } from "~/utils/insertNewLine";
// // import { GraphDrawer } from '~/components/GraphDrawer';

// export const WordInfosContext = createContext({} as WordInfosContextType);

// export default function CytoscapeGraph({
// 	userSynsets,
// 	vocabs,
// 	relations,
// 	jpnSynos,
// 	words,
// 	wordInfos,
// }: {
// 	userSynsets: UserSynset[];
// 	vocabs: UserVocab[];
// 	relations: UserWordSynsetRelation[];
// 	jpnSynos: Expand<WnjpId2JpnSynos>;
// 	words: Expand<WnjpId2Words>;
// 	wordInfos?: WordInfosType;
// }) {
// 	// 新しく学んだ wordInfo => ページ遷移時に登録
// 	const [newWordInfos, setNewWordInfos] = useState<WordInfosType>({});

// 	const [activeDrawer, setActiveDrawer] = useState<JSX.Element>();
// 	// const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// 	const [wordInfo, setWordInfo] = useState<WordData[0]>();
// 	const [word, setWord] = useState("");
// 	const [cy, setCy] = useState<Cytoscape.Core>();
// 	// const [elements, setElements] = useState<any[]>([])

// 	const [vocabDrawers, setVocabDrawers] = useState<JSX.Element[]>([]);

// 	Cytoscape.use(fcose);

// 	// useEffect(() => {

// 	// ===============================
// 	// graph の描画
// 	// ===============================

// 	// node 構築

// 	const lemmaNodes: LemmaNode[] = [];

// 	// let vocabDrawersTmp: JSX.Element[] = [];

// 	// vocab (品詞べつ)
// 	const vocabNodes = vocabs.map((vocab): VocabNode => {
// 		const word = words[vocab.wordId].word;
// 		const pos = words[vocab.wordId].pos;

// 		// 品詞は違うが、字形は同じものを表すノードを作る(lemmaNodes)
// 		lemmaNodes.push({
// 			data: {
// 				id: "lemma+" + word,
// 				label: word,
// 				lemma: word,
// 				nodeType: "lemma",
// 			},
// 		});

// 		// Drawer
// 		// vocabDrawers.push(
// 		//     // <div
// 		//     //     className='drawer'
// 		//     //     id={"drawer+vocab+" + vocab.wordId}
// 		//     //     key={"drawer+vocab+" + vocab.wordId}
// 		//     //     style={{
// 		//     //         "position": "fixed",
// 		//     //         "overflow": "auto",
// 		//     //         "top": "0",
// 		//     //         "right": "0",
// 		//     //         "padding": "1rem",
// 		//     //         backgroundColor: "red",
// 		//     //         width: "100%",
// 		//     //         height: "60%",
// 		//     //         zIndex: "100",
// 		//     //         transition: "all 0.2s",
// 		//     //         transform: "translate(340px)",
// 		//     //     }}
// 		//     // >
// 		//     //     <h2
// 		//     //         className="drawer-close-btn scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
// 		//     //         data-drawer-close-btn="true"
// 		//     //         data-drawer-target={"drawer+vocab+" + vocab.wordId}
// 		//     //     >
// 		//     //         {word + " (" + words[vocab.wordId].pos + ")"}
// 		//     //     </h2>
// 		//     //     <div id={"drawer+content+vocab+" + vocab.wordId}>

// 		//     //     </div>
// 		//     //     <WordCard word={word} wordInfo={wordInfos[vocab.wordId]} isHovered={false} />
// 		//     // </div>

// 		//     <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} key={"drawer+vocab+" + vocab.wordId}>
// 		//         <DrawerPortal >
// 		//             {
// 		//                 wordInfos[vocab.wordId] && (
// 		//                     <DrawerContent
// 		//                         className="mt-24 h-4/6"
// 		//                     >
// 		//                         {
// 		//                             (
// 		//                                 <DrawerHeader>
// 		//                                     {<ShadcnH2>{word + " (" + wordInfos[vocab.wordId].pos + ")"}</ShadcnH2>}
// 		//                                 </DrawerHeader>
// 		//                             )
// 		//                         }
// 		//                         <WordCard word={word} wordInfo={wordInfos[vocab.wordId]} isHovered={false} isInContext={false} />
// 		//                     </DrawerContent>
// 		//                 )
// 		//             }
// 		//         </DrawerPortal>
// 		//     </Drawer>
// 		// )

// 		return {
// 			data: {
// 				id: `vocab+${vocab.wordId}`,
// 				label: word + " (" + pos + ")",
// 				lemma: word,
// 				wordid: vocab.wordId,
// 				nodeType: "vocab",
// 			},
// 		};
// 	});
// 	console.log("synsets[synset.synsetId]==========");
// 	const synoNodes = userSynsets.map((synset) => {
// 		// console.log(jpnSynos[synset.synsetId])
// 		return {
// 			data: {
// 				id: `synset+${synset.synsetId}`, // ユニークなIDを付与
// 				label: jpnSynos[synset.synsetId].join(",\n"),
// 				nodeType: "syno",
// 			},
// 		};
// 	});

// 	// 既存のノードIDをセットにして保持
// 	// const existingNodeIds = new Set([
// 	//     ...vocabNodes.map(node => node.data.id),
// 	//     ...synoNodes.map(node => node.data.id),
// 	// ]);

// 	// edge 構築
// 	// word <=> synsets
// 	const edges = relations.map((relation) => ({
// 		data: {
// 			id: `edge+${relation.id}`, // ユニークなIDを付与
// 			source: `vocab+${relation.wordId}`, // sourceはvocabノード
// 			target: `synset+${relation.synsetId}`, // targetはsynsetノード
// 			edgeType: "word2synsets",
// 		},
// 	}));

// 	// pos <=> lemma (品詞が違うが同形であるものを結ぶ)
// 	const lemma2pos = vocabNodes.map((vocab) => {
// 		return {
// 			data: {
// 				id: `edge+${vocab.data.id}+lemma+${vocab.data.lemma}`, // 'edge+vocab+<wordid>+lemma+<lemma>'
// 				source: "lemma+" + vocab.data.lemma,
// 				target: vocab.data.id,
// 				edgeType: "lemma2pos",
// 			},
// 		};
// 	});

// 	// Cytoscapeの要素をまとめる
// 	const elements = [
// 		...vocabNodes,
// 		...synoNodes,
// 		...edges,
// 		...lemmaNodes,
// 		...lemma2pos,
// 	];
// 	// setElements(elements)
// 	// console.log(synoNodes)
// 	// console.log("====lemma====", lemmaNodes, lemma2pos);

// 	// },[wordInfos])
// 	// -------------------------------------------------------

// 	// ========================
// 	// drawer
// 	// ========================

// 	// フェードレイヤ作成
// 	// window.addEventListener('load', () => {
// 	//     console.log("onload=====", document.head)
// 	//     const head = document.head;
// 	//     const styleElem = document.createElement("style")
// 	//     styleElem.innerHTML = `
// 	//         .fade-layer {
// 	//             position: absolute;
// 	//             top: 0px;
// 	//             left: 0px;

// 	//             width: 100%;
// 	//             height: 100%;

// 	//             background-color: #000000;
// 	//             opacity: 0.5;
// 	//             z-index: 99;
// 	//         }
// 	//         .drawer-open {
// 	//             transform: translate(0px);
// 	//         }

// 	//         .drawer-close-btn {
// 	//             position: absolute;
// 	//             top: 0;
// 	//             left: 0;
// 	//         }
// 	//         .d-none {
// 	//             display: none;
// 	//         }
// 	//     `
// 	//     head?.appendChild(styleElem)
// 	//     const main = document.getElementById("main")
// 	//     const fadeLayer = document.createElement('div');
// 	//     fadeLayer.setAttribute("style", "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #000000; opacity: 0.5; z-index: 99;")
// 	//     fadeLayer.setAttribute('id', 'fade-layer');
// 	//     fadeLayer.classList.add('fade-layer', 'd-none');
// 	//     main && main.prepend(fadeLayer);
// 	// })

// 	// // フェードレイヤーの表示・非表示切り替え
// 	// const toggleFadeLayer = () => {
// 	//     console.log("toggleFadeLayer")
// 	//     const fadeLayer = document.getElementById('fade-layer');
// 	//     fadeLayer && fadeLayer.classList.toggle('d-none');
// 	// }

// 	// // ドロワーの表示・非表示切り替え
// 	// const toggleDrawer = (e: Cytoscape.EventObject) => {
// 	//     console.log("toggleDrawer")
// 	//     const currentTarget = e.target._private.data as VocabNode["data"];
// 	//     const drawer = document.getElementById("drawer+vocab+" + currentTarget.wordid);
// 	//     drawer && drawer.classList.toggle('drawer-open');
// 	// }

// 	// // フェードレイヤーにクリックイベントを仕込む
// 	// // フェードレイヤーがクリックされたらドロワーを閉じて、フェードレイヤーを非表示にする
// 	// window.addEventListener('DOMContentLoaded', () => {
// 	//     const fadeLayer = document.getElementById('fade-layer');
// 	//     fadeLayer && fadeLayer.addEventListener('click', () => {
// 	//         const openingDrawer = document.getElementsByClassName('drawer-open')[0];
// 	//         openingDrawer.classList.remove('drawer-open');
// 	//         fadeLayer.classList.add('d-none');
// 	//     })
// 	// })

// 	// -------------------------------------------------------

// 	// ====================================
// 	// 新たに単語を学ぶ
// 	// ====================================

// 	// ボタンを押すと出てくる drawer を仕込むための state
// 	// const [drawerElems, setDrawerElems] = useState<JSX.Element[]>([])

// 	// [nodeType="vocab"] を click したときの handler
// 	async function vocabClickHandler(e: Cytoscape.EventObject) {
// 		//     // console.log(e.target)
// 		//     // toggleDrawer(e);
// 		//     // toggleFadeLayer();
// 		//     const nodeData = e.target._private.data as VocabNode["data"];
// 		//     setIsDrawerOpen(true)
// 		//     async function updateWordInfos(wordid: number) {
// 		//         if (wordInfos[wordid]) return;
// 		//         const response = await fetchWordInfo(wordid);
// 		//         setWordInfos((prev) => ({ ...prev, [wordid]: response }));
// 		//         console.log("updateWordInfos response ====", response)
// 		//     };
// 		//     await updateWordInfos(nodeData.wordid)
// 		//     // document.getElementById("")?.innerHTML = <WordCard word={nodeData.lemma} wordInfo={wordInfos[nodeData.wordid]} isHovered={true} />
// 		//     // console.log("CytoGraph wordinfos==========", wordInfos)
// 		//     // // const drawerElem = <GraphDrawer nodeData={nodeData} isOpen={true} key={nodeData.wordid}></GraphDrawer>
// 		//     // const drawerElem = (
// 		//     //     <Drawer defaultOpen={true} >
// 		//     //         <DrawerTrigger>{nodeData.wordid}</DrawerTrigger>
// 		//     //         {
// 		//     //             wordInfos[nodeData.wordid] && (
// 		//     //                 <DrawerContent
// 		//     //                 // className="mt-24 h-4/6"
// 		//     //                 >
// 		//     //                     {
// 		//     //                         (
// 		//     //                             <DrawerHeader>
// 		//     //                                 {<ShadcnH2>{nodeData.lemma + " (" + wordInfos[nodeData.wordid].pos + ")"}</ShadcnH2>}
// 		//     //                             </DrawerHeader>
// 		//     //                         )
// 		//     //                     }
// 		//     //                     <WordCard word={nodeData.lemma} wordInfo={wordInfos[nodeData.wordid]} isHovered={true} />
// 		//     //                 </DrawerContent>
// 		//     //             )
// 		//     //         }
// 		//     //     </Drawer>
// 		//     // )
// 		//     // setActiveDrawer(drawerElem)
// 	}

// 	useEffect(() => {
// 		function f() {
// 			if (cy) {
// 				cy.on("click", 'node[nodeType = "vocab"]', async (e) => {
// 					const nodeData = e.target._private.data as VocabNode["data"];
// 					const wordInfo = await fetchWordInfo(nodeData.wordid);

// 					setActiveDrawer(
// 						<Drawer
// 							defaultOpen={true}
// 							open={true}
// 							key={"activedrawer+" + nodeData.wordid}
// 						>
// 							<DrawerContent className="mt-24 h-4/6">
// 								<DrawerHeader>
// 									{
// 										<ShadcnH2>
// 											{nodeData.lemma + " (" + wordInfo.pos + ")"}
// 										</ShadcnH2>
// 									}
// 								</DrawerHeader>

// 								<WordCard
// 									word={nodeData.lemma}
// 									wordInfo={wordInfo}
// 									isHovered={true}
// 									key={"activedrawer+wordcard+" + nodeData.wordid}
// 									isInContext={false}
// 									wordInfos={newWordInfos}
// 									setWordInfos={setNewWordInfos}
// 								/>
// 							</DrawerContent>
// 						</Drawer>,
// 					);
// 				});
// 			}
// 		}
// 		f();
// 	}, [cy]);

// 	return (
// 		<>
// 			{/* <WordInfosContext.Provider value={[newWordInfos, setNewWordInfos]}> */}
// 			<CytoscapeComponent
// 				elements={elements}
// 				style={{ width: "1200px", height: "600px" }} // サイズを指定
// 				layout={
// 					{
// 						name: "fcose",
// 						nodeRepulsion: 4500, // ノード間の反発力を高めてスペースを確保
// 						idealEdgeLength: (edge: any) =>
// 							edge.data("edgeType") == "lemma2pos" ? 2 : 100,
// 						nodeDimensionsIncludeLabels: true, // ラベルを含むノードの寸法を考慮
// 						padding: 50, // グラフ全体の外側の余白
// 						spacingFactor: 1.2, // ノード間の全体的なスペーシングを調整
// 						uniformNodeDimensions: false, // ノードごとに異なる寸法を許可
// 						avoidOverlap: true, // ノードが重ならないように設定
// 					} as Cytoscape.LayoutOptions
// 				}
// 				stylesheet={[
// 					{
// 						selector: "node", // 全ノードに適用されるスタイル
// 						style: {
// 							label: "data(label)",
// 							"background-color": "#b3e5fc",
// 							color: "#000",
// 							width: "20px",
// 							height: "20px",
// 						},
// 					},
// 					{
// 						selector: 'node[nodeType = "vocab"]', // IDが"vocab"で始まるノード
// 						style: {},
// 					},
// 					{
// 						selector: 'node[nodeType = "syno"]',
// 						style: {
// 							"text-halign": "center", // ラベルの水平配置
// 							"text-valign": "center", // ラベルの垂直配置
// 							width: "mapData(size, 20, 50, 20px, 50px)", // サイズを動的に変更
// 							height: "mapData(size, 20, 50, 20px, 50px)",
// 							"text-wrap": "wrap", // テキストの折り返しを有効化
// 							"text-max-width": "80px", // ラベルの最大幅を設定
// 						},
// 					},
// 					{
// 						selector: 'node[nodeType = "lemma"]',
// 						style: {
// 							width: "40px", // サイズを大きくする
// 							height: "40px",
// 							"background-color": "#64b5f6", // 色も変更可能
// 							label: "data(label)",
// 						},
// 					},
// 				]}
// 				cy={
// 					// (cy) => {
// 					//     /**
// 					//      * click events
// 					//      */
// 					//     cy.on("click", /* node[nodeType = "lemma"], */ 'node[nodeType = "vocab"]', async (e) => {
// 					//         const nodeData = e.target._private.data as VocabNode["data"];
// 					//         const wordInfo = await fetchWordInfo(nodeData.wordid)

// 					//         setActiveDrawer(
// 					//             <Drawer defaultOpen={true} open={true} key={"activedrawer+" + nodeData.wordid}>
// 					//                 <DrawerContent >
// 					//                     <DrawerHeader>
// 					//                         {<ShadcnH2>{nodeData.lemma + " (" + wordInfo.pos + ")"}</ShadcnH2>}
// 					//                     </DrawerHeader>

// 					//                     <WordCard word={nodeData.lemma} wordInfo={wordInfo} isHovered={true} key={"activedrawer+wordcard+" + nodeData.wordid} />

// 					//                 </DrawerContent>
// 					//             </Drawer>
// 					//         )
// 					//     });
// 					// }
// 					setCy
// 				}
// 			/>

// 			{activeDrawer}
// 			{/* </WordInfosContext.Provider> */}
// 		</>
// 	);
// }
