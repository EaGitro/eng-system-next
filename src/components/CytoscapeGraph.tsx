"use client";
import type {
	UserSynset,
	UserVocab,
	UserWordSynsetRelation,
} from "@prisma/client";
import Cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { useState } from "react";
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
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from "~/components/ui/drawer";
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
	jpnSynos: Expand<WnjpId2JpnSynos>;
	words: Expand<WnjpId2Words>;
}) {
	const [wordInfo, setWordInfo] = useState<WordData[0]>();
	const [nodeData, setNodeData] = useState<VocabNode["data"]>();

	const [wordInfos, setWordInfos] = useState<WordInfosType>({});

	const [drawerOpen, setDrawerOpen] = useState(false);
	// ===============================
	// graph の描画
	// ===============================

	Cytoscape.use(fcose);

	// node 構築

	const lemmaNodes: LemmaNode[] = [];

	// vocab (品詞べつ)
	const vocabNodes = vocabs.map((vocab): VocabNode => {
		const word = words[vocab.wordId].word;
		const pos = words[vocab.wordId].pos;

		// 品詞は違うが、字形は同じものを表すノードを作る(lemmaNodes)
		lemmaNodes.push({
			data: {
				id: "lemma+" + word,
				label: word,
				lemma: word,
				nodeType: "lemma",
			},
		});

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

	const synoNodes = userSynsets.map((synset) => {
		// console.log(jpnSynos[synset.synsetId])
		return {
			data: {
				id: `synset+${synset.synsetId}`, // ユニークなIDを付与
				label: jpnSynos[synset.synsetId].join(",\n"),
				nodeType: "syno",
			},
		};
	});

	// edge 構築
	// word <=> synsets
	const edges = relations.map((relation) => ({
		data: {
			id: `edge+${relation.id}`, // ユニークなIDを付与
			source: `vocab+${relation.wordId}`, // sourceはvocabノード
			target: `synset+${relation.synsetId}`, // targetはsynsetノード
			edgeType: "word2synsets",
		},
	}));

	// pos <=> lemma (品詞が違うが同形であるものを結ぶ)
	const lemma2pos = vocabNodes.map((vocab) => {
		return {
			data: {
				id: `edge+${vocab.data.id}+lemma+${vocab.data.lemma}`, // 'edge+vocab+<wordid>+lemma+<lemma>'
				source: "lemma+" + vocab.data.lemma,
				target: vocab.data.id,
				edgeType: "lemma2pos",
			},
		};
	});

	// Cytoscapeの要素をまとめる
	const elements = [
		...vocabNodes,
		...synoNodes,
		...edges,
		...lemmaNodes,
		...lemma2pos,
	];

	// click events

	const listeners: CytoscapeCompProps["cyListeners"] = [
		{
			events: "click",
			selector: 'node[nodeType = "vocab"]',
			handler: async (e) => {
				const nodeData_ = e.target._private.data as VocabNode["data"];
				const wordInfo_ = await fetchWordInfo(nodeData_.wordid);
				setWordInfo(wordInfo_);
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
				style={{ width: "1200px", height: "600px" }}
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
						},
					},
					{
						selector: 'node[nodeType = "lemma"]',
						style: {
							width: "40px", // サイズを大きくする
							height: "40px",
							"background-color": "#64b5f6", // 色も変更可能
							label: "data(label)",
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
						<DrawerTitle>
							{
								<ShadcnH2>
									{nodeData?.lemma + " (" + wordInfo?.pos + ")"}
								</ShadcnH2>
							}
						</DrawerTitle>
					</DrawerHeader>
					{nodeData && wordInfo && (
						<WordCard
							word={nodeData.lemma}
							wordInfo={wordInfo}
							isHovered={true}
							key={"activedrawer+wordcard+" + nodeData.wordid}
							isInContext={false}
							wordInfos={wordInfos}
							setWordInfos={setWordInfos}
						/>
					)}
				</DrawerContent>
			</Drawer>
			,
		</>
	);
}
