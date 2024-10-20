// import { PrismaClient } from "@prisma/client";
// import { getServerSession } from "next-auth";
// import test from "node:test";
// import { WordData } from "~/app/types/wordnet"
// import { authOptions } from "~/lib/auth";
// import { upsertUserVocab } from "~/utils/prismaUpserts";
// export default async function WordCards_({ word }: { word: string }) {

//     const prisma = new PrismaClient();
//     const session = await getServerSession(authOptions)
//     const userId = session?.user.id + ""

//     const cardStyle: React.CSSProperties = {
//         backgroundColor: "#fff",  // 白背景
//         borderRadius: "8px",      // 角丸
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // 影
//         padding: "16px",          // 内側の余白
//         margin: "16px",           // 外側の余白
//         // maxWidth: "300px",        // 最大幅
//         border: "1px solid #ddd"  // 薄い枠線
//     };

//     const textStyle: React.CSSProperties = {
//         fontSize: "16px",         // テキストの大きさ
//         color: "#333",            // テキストの色
//         lineHeight: "1.5"         // 行間
//     };

//     const h2Style: React.CSSProperties = {
//         fontSize: "24px",         // h2のフォントサイズ
//         fontWeight: "bold",       // 太字
//         marginBottom: "16px",     // 下の余白
//         color: "#333",            // 色
//     };

//     const h3Style: React.CSSProperties = {
//         fontSize: "20px",         // h3のフォントサイズ
//         fontWeight: "bold",       // 太字
//         marginBottom: "12px",     // 下の余白
//         color: "#333",            // 色
//     };
//     const h4Style: React.CSSProperties = {
//         fontSize: "18px",         // h4のフォントサイズ
//         fontWeight: "bold",       // 太字
//         marginBottom: "10px",     // 下の余白
//         color: "#333",            // 色
//     };

//     const url = process.env.NEXT_PUBLIC_WN_BACKEND_URL + "/w/" + word
//     const wordDataJson: WordData = await (await fetch(url)).json()
//     // console.log(wordData)
//     const wordData = wordDataJson

//     // wordid has different values for different parts of speech
//     const synsets = await wordData.map(async (wordEachPos) => {

//         // prisma
//         const userVocabData = await upsertUserVocab(
//             prisma,
//             {
//                 target: {
//                     userId: userId,
//                     wordId: wordEachPos.wordid
//                 },
//                 update: {
//                     isIncrement: true,
//                 },
//                 create: {
//                     userId: userId,
//                     wordId: wordEachPos.wordid,
//                     level: 1
//                 }
//             }

//         )
//         // userVocabData = await prisma.userVocab.upsert({
//         //     where: {
//         //         userId_wordId: { // Uniqueキーを指定
//         //             userId: userId,
//         //             wordId: wordEachPos.wordid, // 対象のwordId
//         //         }
//         //     },
//         //     update: {
//         //         level: 2, // 既存レコードがある場合に更新するフィールド

//         //     },
//         //     create: {
//         //         userId: userId, // 新規レコードに必要なフィールド
//         //         wordId: wordEachPos.wordid, // 新規レコードに指定するwordId
//         //         level: 1, // 新規レコードの初期値

//         //     },
//         // });

//         // for synsets
//         const synset = wordEachPos.synsets.map(async (synset) => {

//             // prisma
//             const userSynsetData = await prisma.userSynset.upsert({
//                 where: {
//                     userId_synsetId: { // Uniqueキーを指定
//                         userId: userId,
//                         synsetId: synset.synsetid,
//                     }
//                 },
//                 update: {
//                     level: 2, // 既存レコードがある場合に更新するフィールド

//                 },
//                 create: {
//                     userId: userId,
//                     synsetId: synset.synsetid,
//                     level: 1, // 新規レコードの初期値

//                 },
//             });

//             const createdRelation = await prisma.userWordSynsetRelation.upsert({
//                 where: {
//                     userId_wordId_synsetId: {
//                         userId: userId,
//                         wordId: wordEachPos.wordid,
//                         synsetId: synset.synsetid,
//                     },
//                 },
//                 update: {}, // 既に存在する場合は何もしない
//                 create: {
//                     userId: userId,
//                     wordId: wordEachPos.wordid,
//                     synsetId: synset.synsetid,
//                     level: 1,
//                 },
//             });

//             // DOM
//             const defs = Object.values(synset.defs).map((def) => {
//                 return <h4 style={h4Style}>{def.eng}{' / '}{def.jpn}</h4>
//             })
//             const examples = synset.examples.map((ex) => {
//                 return <p style={textStyle}>{'"'}{ex.eng}{'"'}{'('}{ex.jpn}{')'}</p>
//             })
//             const synos_list = synset.syno_list.map((syno) => {
//                 return syno.word
//             })
//             const synos = synos_list.join(", ")
//             return (
//                 <>
//                     <h2 style={h3Style}>定義</h2>
//                     {defs}
//                     <h2 style={h3Style}>例</h2>
//                     {examples}
//                     <h2 style={h3Style}>類義語</h2>
//                     <p style={textStyle}>{synos}</p>
//                 </>
//             )

//         })
//         return (
//             < div style={cardStyle} >
//                 <h2 style={h2Style}>{word} {`(${wordEachPos.pos})`}</h2>
//                 {synset}
//             </div >
//         )
//     })
//     console.log(process.env)

//     return (
//         <>
//             {synsets}
//         </>
//     )
//     // return JSON.stringify(wordData.synsets)
// }
