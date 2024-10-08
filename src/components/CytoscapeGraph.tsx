"use client";
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { UserSynset, UserVocab, UserWordSynsetRelation } from "@prisma/client";
import { WnjpId2Words, WnjpId2JpnSynos } from '~/app/types/wordnet';
import { Expand } from '~/app/types/utils';
import Cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';

import { insertNewLine } from '~/utils/insertNewLine';




export default async function CytoscapeGraph({ userSynsets, vocabs, relations, jpnSynos, words }: {
    userSynsets: UserSynset[],
    vocabs: UserVocab[],
    relations: UserWordSynsetRelation[],
    jpnSynos: Expand<WnjpId2JpnSynos>,
    words: Expand<WnjpId2Words>
}) {

    Cytoscape.use(fcose);

    // node 構築

    // 品詞は違うが字形は同じ 
    type LemmaNode = {
        data: {
            id: string,
            label: string,
            lemma: string
            nodeType: "lemma"
        };
    }
    let lemmaNodes: LemmaNode[] = [];

    // vocab (品詞べつ)
    const vocabNodes = vocabs.map(vocab => {

        const word = words[vocab.wordId].word;
        const pos = words[vocab.wordId].pos;

        // 品詞は違うが、字形は同じものを表すノードを作る(lemmaNodes)
        lemmaNodes.push({
            data: {
                id: "lemma+" + word,
                label: word,
                lemma: word,
                nodeType: "lemma",
            }
        })



        return {
            data: {
                id: `vocab+${vocab.wordId}`,
                label: word + " (" + pos + ")",
                lemma: word,
                nodeType: "vocab"
            },
        }
    });
    console.log("synsets[synset.synsetId]==========")
    const synoNodes = userSynsets.map(synset => {
        console.log(jpnSynos[synset.synsetId])
        return ({
            data: {
                id: `synset+${synset.synsetId}`, // ユニークなIDを付与
                label: jpnSynos[synset.synsetId].join(",\n"),
                nodeType: "syno",
            },
        })
    }
    );

    // 既存のノードIDをセットにして保持
    // const existingNodeIds = new Set([
    //     ...vocabNodes.map(node => node.data.id),
    //     ...synoNodes.map(node => node.data.id),
    // ]);

    // edge 構築
    // word <=> synsets
    const edges = relations
        .map(relation => ({
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
                id: `edge+${vocab.data.id}+lemma+${vocab.data.lemma}`,  // 'edge+vocab+<wordid>+lemma+<lemma>'
                source: "lemma+" + vocab.data.lemma,
                target: vocab.data.id,
                edgeType: "lemma2pos",

            }
        }
    })

    // Cytoscapeの要素をまとめる
    const elements = [...vocabNodes, ...synoNodes, ...edges, ...lemmaNodes, ...lemma2pos];
    console.log(synoNodes)
    console.log("====lemma====", lemmaNodes, lemma2pos);

    return (
        <CytoscapeComponent
            elements={elements}
            style={{ width: '1200px', height: '600px' }} // サイズを指定
            layout={
                {
                    name: 'fcose',
                    nodeRepulsion: 4500,  // ノード間の反発力を高めてスペースを確保
                    idealEdgeLength: (edge: any) => edge.data("edgeType") == "lemma2pos" ? 10 : 100,
                    nodeDimensionsIncludeLabels: true, // ラベルを含むノードの寸法を考慮
                    padding: 50,  // グラフ全体の外側の余白
                    spacingFactor: 1.2,  // ノード間の全体的なスペーシングを調整
                    uniformNodeDimensions: false, // ノードごとに異なる寸法を許可
                    avoidOverlap: true // ノードが重ならないように設定
                } as Cytoscape.LayoutOptions
            }
            stylesheet={[
                {
                    selector: 'node', // 全ノードに適用されるスタイル
                    style: {
                        'label': 'data(label)',
                        'background-color': '#b3e5fc',
                        'color': '#000',
                        'width': '20px',
                        'height': '20px',
                    }
                },
                {
                    selector: 'node[nodeType = "vocab"]', // IDが"vocab"で始まるノード
                    style: {

                    }
                },
                {
                    selector: 'node[nodeType = "syno"]',
                    style: {
                        'text-halign': 'center', // ラベルの水平配置
                        'text-valign': 'center', // ラベルの垂直配置
                        'width': 'mapData(size, 20, 50, 20px, 50px)', // サイズを動的に変更
                        'height': 'mapData(size, 20, 50, 20px, 50px)',
                        'text-wrap': 'wrap', // テキストの折り返しを有効化
                        'text-max-width': '80px', // ラベルの最大幅を設定
                    }
                },
                {
                    selector: 'node[nodeType = "lemma"]',
                    style: {
                        'width': '40px', // サイズを大きくする
                        'height': '40px',
                        'background-color': '#64b5f6', // 色も変更可能
                        'label': "data(label)"
                    }
                }
            ]}
        />
    );
}
