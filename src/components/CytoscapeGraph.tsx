"use client";
import type {
	UserSynset,
	UserVocab,
	UserWordSynsetRelation,
} from "@prisma/client";
import cytoscape from "cytoscape";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";
import React, { useRef, useState } from "react";
import type { CytoscapeCompProps } from "~/app/types/CytoscapeComp";
import type { LemmaNode, SynoNode, VocabNode } from "~/app/types/GraphTypes";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { Expand } from "~/app/types/utils";
import type {
	WnjpId2JpnSynos,
	WnjpId2Words,
	WordData,
} from "~/app/types/wordnet";
import CytoscapeComp from "~/components/CytoscapeComp";
import GraphControlPanel from "~/components/GraphControlPanel";
import { watchClick } from "~/components/WatchUser";
import WordCard from "~/components/WordCard";
import { ShadcnH2 } from "~/components/shadcnCustomized/Typography";
import { shadcnH2 } from "~/components/shadcnCustomized/TypographyClassName";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "~/components/ui/drawer";
import MultipleSelector, { Option } from "~/components/ui/multiple-selector";
import { CY_CLASSES, DEFAULT_LEMMA_NODE_SIZE, DEFAULT_SYNO_NODE_SIZE, pos2shape, SYNO_NODE_SIZE_SLICE } from "~/rules/graph";
import { pos2color } from "~/utils/color";
import { fetchWordInfo } from "~/utils/fetchWordInfo";

export default function CytoscapeGraph({
	userSynsets,
	vocabs,
	relations,
	jpnSynos,
	words,
	userId,
}: {
	userSynsets: UserSynset[];
	vocabs: UserVocab[];
	relations: UserWordSynsetRelation[];
	jpnSynos: WnjpId2JpnSynos;
	words: Expand<WnjpId2Words>;
	userId: string
}) {
	const [activeWordInfos, setActiveWordInfos] = useState<WordData>();
	const [nodeData, setNodeData] = useState<LemmaNode["data"]>();

	const [wordInfos, setWordInfos] = useState<WordInfosType>({});

	const [drawerOpen, setDrawerOpen] = useState(false);
	// ===============================
	// graph の描画
	// ===============================


	const globalCyRef = useRef<cytoscape.Core>()
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
					id: `lemma+${word}`,
					label: word,
					lemma: word,
					nodeType: "lemma",
					wordids: [vocab.wordId],
					levels: [vocab.level],
					active: false,
				},

			};
		} else {
			lemmaNodeObj[word].data.wordids.push(vocab.wordId)
			lemmaNodeObj[word].data.levels.push(vocab.level)
		}

		return {
			data: {
				id: `vocab+${vocab.wordId}`,
				label: word + " (" + pos + ")",
				lemma: word,
				wordid: vocab.wordId,
				nodeType: "vocab",
				level: vocab.level,
				active: false
			},
		};
	});


	const multipleSelectorOpts: Expand<Option[]> = Object.keys(lemmaNodeObj).map((lemma) => {
		return {
			value: lemmaNodeObj[lemma].data.id,
			label: lemma
		}
	})

	console.log("lemmanodeobj=============", lemmaNodeObj)

	let lemmaNodes: LemmaNode[] = Object.values(lemmaNodeObj)


	console.log("lemmanodes =================", lemmaNodes)

	const synoNodes: SynoNode[] = userSynsets
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
					shape: shape,
					level: synset.level,
					active: false
				},
			};
		});

	console.log("synoNodes================", synoNodes)

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
				console.log("node target ====", e);
				const nodeData_ = e.target.data() as LemmaNode["data"];
				const activeWordInfos_ = nodeData_.wordids.map((wid) => {
					console.log("fetch active word info ============", wid)
					return fetchWordInfo(wid);
				})
				setActiveWordInfos(await Promise.all(activeWordInfos_));
				setNodeData(nodeData_);
				setDrawerOpen(true);


				const connectedEdges = e.target.connectedEdges()
				console.log("connectedEdges======", connectedEdges);
				const connectedEdgeData = connectedEdges.map((edge: any) => {
					console.log("edge._private============", edge._private)
					return edge.data()
				})

				const connectedNodes = connectedEdges.connectedNodes()
				console.log("connectedNodes()", connectedNodes)
				const connectedNodeData = connectedNodes.map((node: any) => {
					console.log("connectedNode", node)
					return node.data()
				})
				watchClick<"graph-syno">(userId, "graph-syno", { connNodes: connectedNodeData, nodeData: nodeData_ })
				const target = e.target;
				// activateTarget(target)

				console.log("classes===========")
			},
		},

		// {
		// 	events: "click",
		// 	selector: 'node[nodeType = "syno"]',
		// 	handler: async (e) => {
		// 		activateTarget(e.target)
		// 	}
		// },
		{
			events: "mouseover",
			selector: "node",
			handler: (e) => {
				console.log("mouseover==========")
				const target = e.target;
				const connEdges = target.connectedEdges();
				const connNodes = connEdges.connectedNodes();
				console.log(connEdges, connNodes)
				// console.log(connNodes.classes())
				e.cy.batch(() => {
					target.addClass(CY_CLASSES.active);
					connEdges.addClass(CY_CLASSES.active);
					connNodes.addClass(CY_CLASSES.active);
				})
			}
		},
		{
			events: "mouseout",
			selector: "node",
			handler: (e) => {
				console.log("mouseout===========")
				e.cy.batch(() => {
					e.cy.elements().removeClass(CY_CLASSES.active)
				})
			}
		},
	];

	return (
		<>
			<div className={"relative"}>
				<GraphControlPanel
					className={"absolute top-0 right-0 z-10"}
					multipleSelectorDefaultOptions={multipleSelectorOpts}
					multipleSelectorOnChange={(opts) => {
						if (!globalCyRef.current) return;
						if (opts.length != 0) {
							const lastopt = opts.at(-1) as Option;
							globalCyRef.current.elements().addClass(CY_CLASSES.transparent)
							opts.forEach((opt) => {
								const targetNode = globalCyRef.current?.elements(`[id="${opt.value}"]`)
								if (!targetNode || !globalCyRef.current) return;
								targetNode.removeClass(CY_CLASSES.transparent)
								const stack = globalCyRef.current.collection();
								const visited = globalCyRef.current.collection();
								stack.merge(targetNode);
								visited.merge(targetNode);
								while (stack.length != 0) {
									const target = stack.slice(-1);
									stack.unmerge(target);
									visited.merge(target);
									target.removeClass(CY_CLASSES.transparent);
									target.connectedEdges().removeClass(CY_CLASSES.transparent)
									const neighbor = target.neighborhood()
									stack.merge(neighbor.unmerge(visited))
									console.log("recursive===========", neighbor)
								}

							})
							const centerEle = globalCyRef.current?.elements(`[id = "${lastopt.value}"]`);
							const connEdge = centerEle?.connectedEdges()


							// centerEle?.removeClass(CY_CLASSES.transparent)
							// connEdge?.removeClass(CY_CLASSES.transparent)

							globalCyRef.current?.fit(connEdge?.union(`[id = "${lastopt.value}"]`),);
						} else {
							globalCyRef.current?.elements().removeClass(CY_CLASSES.transparent);
							// globalCyRef.current?.fit();
						}
					}}
				/>
			</div>
			<CytoscapeComp
				elements={elements}
				cyListeners={listeners}
				style={{ width: "100vw", height: "90vh" }}
				layout={
					{
						idealEdgeLength: () => 80,
						// 	edge.data("edgeType") == "lemma2pos" ? 2 : 100,
						nodeDimensionsIncludeLabels: true, // ラベルを含むノードの寸法を考慮
						padding: 50, // グラフ全体の外側の余白
						spacingFactor: 1.2, // ノード間の全体的なスペーシングを調整
						uniformNodeDimensions: false, // ノードごとに異なる寸法を許可
						avoidOverlap: true, // ノードが重ならないように設定


						/**
						 * fcose
						 */
						name: "fcose",
						nodeRepulsion: (node: any) => {
							return (node.data().nodeType == "syno") ? 5048576 : 6048576
						}, // ノード間の反発力を高めてスペースを確保
						// tile: true,                  // 配置がタイル化されるようにする
						// packComponents: false,        // 分離したコンポーネントを詰める
						quality: "default",
						animate: true,
						randomise: false,
						animationDuration: 100,
						edgeElasticity: 50,
						gravity: 1,
					} as cytoscape.LayoutOptions
				}
				ready={(e) => {
					console.log("ready ============");
					const nodes = e.cy.nodes()
					nodes.forEach((node, i, eles) => {
						const nodeData: LemmaNode["data"] | SynoNode["data"] = node.data();
						const connSize = node.connectedEdges().length;
						if (nodeData.nodeType == "syno") {
							node.style({
								width: DEFAULT_SYNO_NODE_SIZE + connSize * SYNO_NODE_SIZE_SLICE,
								height: DEFAULT_SYNO_NODE_SIZE + connSize * SYNO_NODE_SIZE_SLICE
							})
						}
					})
				}}
				cy={(cy) => {
					globalCyRef.current = cy
				}}
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
							// width: DEFAULT_SYNO_NODE_SIZE,
							// height: DEFAULT_SYNO_NODE_SIZE,
							"text-wrap": "wrap", // テキストの折り返しを有効化
							"text-max-width": "80px", // ラベルの最大幅を設定
							shape: "data(shape)" as cytoscape.Css.PropertyValueNode<Cytoscape.Css.NodeShape>,
							"background-color": "data(color)"
						},
					},
					{
						selector: 'node[nodeType = "lemma"]',
						style: {
							width: DEFAULT_LEMMA_NODE_SIZE, // サイズを大きくする
							height: DEFAULT_LEMMA_NODE_SIZE,
							"text-halign": "center", // ラベルの水平配置
							"text-valign": "center", // ラベルの垂直配置
							"background-color": "#64b5f6", // 色も変更可能
						},
					},

					{
						selector: `node.${CY_CLASSES.active}`,
						style: {
							"border-width": 2,
							"border-color": "#ff6347"
						}
					},
					{
						selector: `edge.${CY_CLASSES.active}`,
						style: {
							"line-color": "#ff6347"
						}
					},
					{
						selector: `.${CY_CLASSES.invisible}`,
						style: {
							"visibility": "hidden"
						}
					},
					{
						selector: `.${CY_CLASSES.transparent}`,
						style: {
							'opacity': 0.35,               // 全体の透明度
							'line-opacity': 0.2,
						}
					}
					// {
					// 	selector: 'node[active = true]',
					// 	style: {
					// 		"background-blacken": -0.5,
					// 		"border-width": 2,
					// 		"border-color": "#fdeff2"
					// 	}
					// }
				]}
				wheelSensitivity={0.6}
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
									<div>
										{/* <ShadcnH2>{`${nodeData.lemma} (${wordInfo.pos})`}</ShadcnH2> */}
										<WordCard
											word={nodeData.lemma}
											wordInfo={wordInfo}
											isHovered={true}
											userId={userId}
											hasTitle={true}
											wordInfos={wordInfos}
											setWordInfos={setWordInfos}
										/>
									</div>
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



function activateTarget(target: cytoscape.AbstractEventObject["target"]) {
	const connectedEdges = target.connectedEdges();
	const connectedNodes = connectedEdges.connectedNodes();
	console.log("activateTarget====", connectedEdges, connectedNodes);

	connectedEdges.forEach((edge: any) => {
		edge.data()["active"] == true;
	});

	connectedNodes.forEach((node: any) => {
		node.data()["active"] == true;
	});


	setTimeout(() => {
		connectedEdges.forEach((edge: any) => {
			edge.data()["active"] == false;
			console.log("edge._private=======", edge._private)
		});
		connectedNodes.forEach((node: any) => {
			node.data()["active"] == false;
			console.log("node._private=======", node._private)
		});
	}, 3000)

}