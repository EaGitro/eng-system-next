"use client";
import type {
	UserSynset,
	UserVocab,
	UserWordSynsetRelation,
} from "@prisma/client";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import React, { useState } from "react";
import type { CytoscapeCompProps } from "~/app/types/CytoscapeComp";
import type { LemmaNode, VocabNode } from "~/app/types/GraphTypes";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { Expand } from "~/app/types/utils";
import type {
	WnjpId2JpnSynos,
	WnjpId2Words,
	WordData,
} from "~/app/types/wordnet";
import CytoscapeComp from "~/components/CytoscapeComp";
import WordCard from "~/components/WordCard";
import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
import { shadcnH2 } from "~/components/shadcnCustomized/TypographyClassName";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "~/components/ui/drawer";
import { pos2shape } from "~/rules/graph";
import { pos2color } from "~/utils/color";
import { fetchWordInfo } from "~/utils/fetchWordInfo";

export default function CytoscapeGraph({
	userSynsets,
	vocabs,
	relations,
	jpnSynos,
	words,
}: {
	userSynsets: UserSynset[];
	vocabs: UserVocab[];
	relations: UserWordSynsetRelation[];
	jpnSynos: WnjpId2JpnSynos;
	words: Expand<WnjpId2Words>;
}) {
	const [activeWordInfos, setActiveWordInfos] = useState<WordData>();
	const [nodeData, setNodeData] = useState<LemmaNode["data"]>();

	const [wordInfos, setWordInfos] = useState<WordInfosType>({});

	const [drawerOpen, setDrawerOpen] = useState(false);
	// ===============================
	// graph の描画
	// ===============================

	Cytoscape.use(fcose);

	// node 構築



	let lemmaNodeObj: Expand<{
		[word: string]: {
			data: LemmaNode["data"]
		}
	}> = {}


	console.log("vocabs================", vocabs)

	// vocab (品詞べつ)
	const vocabNodes = vocabs.map((vocab): VocabNode => {
		const word = words[vocab.wordId].word;
		const pos = words[vocab.wordId].pos;

		console.log("word===========", word)

		// 品詞は違うが、字形は同じものを表すノードを作る(lemmaNodes)
		if (!(lemmaNodeObj[word])) {
			lemmaNodeObj[word] = {
				data: {
					id: "lemma+" + word,
					label: word,
					lemma: word,
					nodeType: "lemma",
					wordids: [vocab.wordId]
				},

			};
		} else {
			lemmaNodeObj[word].data.wordids.push(vocab.wordId)
		}

		return {
			data: {
				id: `vocab+${vocab.wordId}`,
				label: word + " (" + pos + ")",
				lemma: word,
				wordid: vocab.wordId,
				nodeType: "vocab",
			},
		};
	});


	console.log("lemmanodeobj=============", lemmaNodeObj)

	let lemmaNodes: LemmaNode[] = Object.values(lemmaNodeObj)


	console.log("lemmanodes =================", lemmaNodes)

	const synoNodes = userSynsets
		.filter((synset) => jpnSynos[synset.synsetId].length != 0)
		.map((synset) => {
			// console.log(jpnSynos[synset.synsetId])

			let color = "";
			let shape = ""
			const lastChar = synset.synsetId.slice(-1) as "n" | "v" | "a" | "r"
			console.log("synset-slice==================", synset.synsetId.slice(-1), synset.synsetId.slice(-1) == "n")
			switch (lastChar) {
				case "n":
				case "v":
				case "a":
				case "r":
					color = `#${pos2color(lastChar, synset.level)}`
					shape = pos2shape[lastChar]
					break;
				default:
					color = "white"
			}
			console.log(color)

			return {
				data: {
					id: `synset+${synset.synsetId}`, // ユニークなIDを付与
					label: jpnSynos[synset.synsetId].join(",\n"),
					nodeType: "syno",
					color: color,
					shape: shape
				},
			};
		});

		console.log("synoNodes================",synoNodes)

	// edge 構築
	// // word <=> synsets
	// const edges = relations.map((relation) => ({
	// 	data: {
	// 		id: `edge+${relation.id}`, // ユニークなIDを付与
	// 		source: `vocab+${relation.wordId}`, // sourceはvocabノード
	// 		target: `synset+${relation.synsetId}`, // targetはsynsetノード
	// 		edgeType: "word2synsets",
	// 	},
	// }));

	// // pos <=> lemma (品詞が違うが同形であるものを結ぶ)
	// const lemma2pos = vocabNodes.map((vocab) => {
	// 	return {
	// 		data: {
	// 			id: `edge+${vocab.data.id}+lemma+${vocab.data.lemma}`, // 'edge+vocab+<wordid>+lemma+<lemma>'
	// 			source: "lemma+" + vocab.data.lemma,
	// 			target: vocab.data.id,
	// 			edgeType: "lemma2pos",
	// 		},
	// 	};
	// });

	// =========================================

	// lemma <=> synset 
	const edges = relations
		.filter((synset) => jpnSynos[synset.synsetId].length != 0)
		.map((relation) => (
			{
				data: {
					id: `edge+${relation.id}`,
					source: `lemma+${words[relation.wordId].word}`,
					target: `synset+${relation.synsetId}`,
					edgeType: "word2synsets",
				}
			}
		)
		)

	// Cytoscapeの要素をまとめる
	const elements = [
		// ...vocabNodes,
		...synoNodes,
		...edges,
		...lemmaNodes,
		// ...lemma2pos,
	];

	// click events

	console.log(lemmaNodes)
	console.log(vocabNodes)

	const listeners: CytoscapeCompProps["cyListeners"] = [
		{
			events: "click",
			selector: 'node[nodeType = "lemma"]',
			handler: async (e) => {

				const nodeData_ = e.target._private.data as LemmaNode["data"];
				const activeWordInfos_ = nodeData_.wordids.map((wid) => {
					console.log("fetch active word info ============", wid)
					return fetchWordInfo(wid);
				})
				setActiveWordInfos(await Promise.all(activeWordInfos_));
				setNodeData(nodeData_);
				setDrawerOpen(true);
			},
		},
	];

	return (
		<>
			<CytoscapeComp
				elements={elements}
				cyListeners={listeners}
				style={{ width: "100vw", height: "90vh" }}
				layout={
					{
						name: "fcose",
						nodeRepulsion: 4500, // ノード間の反発力を高めてスペースを確保
						idealEdgeLength: (edge: any) =>
							edge.data("edgeType") == "lemma2pos" ? 2 : 100,
						nodeDimensionsIncludeLabels: true, // ラベルを含むノードの寸法を考慮
						padding: 50, // グラフ全体の外側の余白
						spacingFactor: 1.2, // ノード間の全体的なスペーシングを調整
						uniformNodeDimensions: false, // ノードごとに異なる寸法を許可
						avoidOverlap: true, // ノードが重ならないように設定
					} as cytoscape.LayoutOptions
				}
				stylesheet={[
					{
						selector: "node", // 全ノードに適用されるスタイル
						style: {
							label: "data(label)",
							"background-color": "#b3e5fc",
							color: "#000",
							width: "20px",
							height: "20px",
						},
					},
					{
						selector: 'node[nodeType = "vocab"]', // IDが"vocab"で始まるノード
						style: {},
					},
					{
						selector: 'node[nodeType = "syno"]',
						style: {
							"text-halign": "center", // ラベルの水平配置
							"text-valign": "center", // ラベルの垂直配置
							width: "mapData(size, 20, 50, 20px, 50px)", // サイズを動的に変更
							height: "mapData(size, 20, 50, 20px, 50px)",
							"text-wrap": "wrap", // テキストの折り返しを有効化
							"text-max-width": "80px", // ラベルの最大幅を設定
							shape: "data(shape)" as cytoscape.Css.PropertyValueNode<Cytoscape.Css.NodeShape>,
							"background-color": "data(color)"
						},
					},
					{
						selector: 'node[nodeType = "lemma"]',
						style: {
							width: "40px", // サイズを大きくする
							height: "40px",
							"background-color": "#64b5f6", // 色も変更可能
						},
					},
				]}
			/>
			<Drawer
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
				key={"activedrawer+"}
			>
				<DrawerContent className="mt-24 h-4/6">
					<DrawerHeader>
						<DrawerTitle className={shadcnH2}>
							{nodeData?.lemma}
						</DrawerTitle>
					</DrawerHeader>
					<div
						style={{ overflowY: "scroll", }}

					>
						{nodeData && activeWordInfos && activeWordInfos.map((wordInfo) => {
							console.log("activewordinfos=============", activeWordInfos)
							return (
								<React.Fragment
									// style={{ overflowY: "scroll", }}
									key={"activedrawer+wordcard+" + wordInfo.wordid}
								>
									{/* <ShadcnH2>{`${nodeData.lemma} (${wordInfo.pos})`}</ShadcnH2> */}
									<WordCard
										word={nodeData.lemma}
										wordInfo={wordInfo}
										isHovered={false}

										isInContext={false}
										wordInfos={wordInfos}
										setWordInfos={setWordInfos}
									/>
								</React.Fragment>
							)
						})
						}
					</div>
				</DrawerContent>
			</Drawer>

		</>
	);
}
