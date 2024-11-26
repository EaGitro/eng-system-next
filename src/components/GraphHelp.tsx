import Image from "next/image";

import { HelpDialog } from "~/components/HelpDialog";
import {
	ShadcnH3,
	ShadcnMuted,
	ShadcnP,
} from "~/components/shadcnCustomized/Typography";
import {
	shadcnH2,
	shadcnList,
} from "~/components/shadcnCustomized/TypographyClassName";
export default function GraphHelp() {
	return (
		<HelpDialog
			title={"グラフビューの使い方"}
			titleClassName={shadcnH2}
			triggerClassName=""
		>
			<div className={"flex-col"}>
				<ShadcnH3 className="pt-4">グラフの仕組み</ShadcnH3>
				<div
					className={"flex flex-row"}
					style={{
						maxWidth: "100%",
					}}
				>
					<div
					// className="w-8/12"
					>
						<ShadcnP>
							{[
								"グラフビューではネットワークグラフが表示されます。",
								"このグラフには「英単語ノード」と「概念ノード」という2つのノードがあり、それぞれ「英単語」と「概念 = 意味」を表します。そしてこれらをエッジがつないでいます。",
								"また同じ概念を共有しているノードはいわゆる「同義語・類義語」となります",
							]}
						</ShadcnP>
					</div>
					{/* <div
                                className={"w-4/12"}
                            >

                            </div> */}
				</div>
				<Image
					alt="graphの仕組み01"
					src={"/img/graph-desc-01.png"}
					style={{
						height: "auto",
						minWidth: 100,
						width: "100%",
					}}
					width={1454}
					height={1107}
					// sizes="30vw"
					sizes="100vw"
				/>
				<ShadcnH3 className="pt-4">品詞</ShadcnH3>
				<ShadcnP>
					「概念ノード」には品詞があります。それぞれ形と色が異なります。
				</ShadcnP>
				<ul className={shadcnList}>
					<li>名詞(n): 名詞は緑色で角丸の四角形です。</li>
					<li>動詞(v): 動詞は水色で鼓型をしています。</li>
					<li>形容詞(a): 形容詞は赤色でダイヤ型をしています。</li>
				</ul>

				<table className={"table-auto"}>
					<tr>
						<th
						// className={"flex flex-col items-center"}
						>
							<Image
								alt="名詞"
								src={"/img/graph-desc-pos-n.PNG"}
								width={329}
								height={245}
								// sizes="5vw"
								className="h-auto"
							/>
						</th>
						<th
						// className={"flex flex-col items-center "}
						>
							<Image
								alt="名詞"
								src={"/img/graph-desc-pos-v.PNG"}
								width={329}
								height={245}
								// sizes="5vw"
								className="h-auto"
							/>
						</th>
						<th
						// className={"flex flex-col items-center "}
						>
							<Image
								alt="形容詞"
								src={"/img/graph-desc-pos-a.PNG"}
								width={329}
								height={245}
								// sizes="5vw"
								className="h-auto"
							/>
						</th>
					</tr>
					<tr>
						<td>
							<ShadcnP className={"text-center"}>名詞</ShadcnP>
						</td>
						<td>
							<ShadcnP className="text-center">動詞</ShadcnP>
						</td>
						<td>
							<ShadcnP className="text-center">形容詞</ShadcnP>
						</td>
					</tr>
				</table>
				<ShadcnH3>画面操作</ShadcnH3>
				<ShadcnP className="pb-4">
					{[
						"マウス操作やタッチ操作で画面のズームや視点移動ができます。",
						<>
							マウスでスクロールするとズームができます。何もないところを掴みながら移動させると視点移動ができます。
							<br />
							またノードもドラッグすることができます。
							<br />
							ノードにマウスカーソルを合わせるとつながっているノードが赤く表示されます。
						</>,
					]}
				</ShadcnP>
				<Image
					alt="操作方法"
					height={480}
					src={"/img/graph-desc-02.gif"}
					style={{
						height: "auto",
						minWidth: 100,
						width: "100%",
					}}
					width={852}
				/>

				<ShadcnH3 className="pt-4">クリック</ShadcnH3>
				<ShadcnP>
					「単語ノード」をクリックするとその単語の詳細を見ることができます。
					この詳細は学習画面のモノと同様のものです。
					<br />
					再度グラフビューにアクセスした際に、ここで学んだ単語もグラフに追加されます。
				</ShadcnP>
				<div className={"w-full pt-4"}>
					<Image
						alt="click img"
						height={1107}
						src={"/img/graph-desc-click.png"}
						style={{
							height: "auto",
							minWidth: 100,
							width: "100%",
						}}
						width={1454}
					/>
				</div>
				<ShadcnH3 className="pt-4">検索</ShadcnH3>
				<ShadcnP>
					{[
						"右上の検索ボックスで単語の検索をすることができます。",
						"選択された単語は大きくフォーカスされます。また複数選択が可能で、何かを選択した場合、選択した英単語ノードとそれに接続しているノードは濃く表示され、それ以外のノードは薄く表示されます。",
					]}
				</ShadcnP>
				<Image
					alt="selector image"
					height={1289}
					src={"/img/graph-desc-selectbox-01.PNG"}
					style={{
						height: "auto",
						minWidth: 100,
						width: "100%",
					}}
					width={2277}
				/>
				<ShadcnMuted className="pb-4">
					検索ボックスで単語の検索をすることができます。選択された単語は大きくフォーカスされます
				</ShadcnMuted>
				<Image
					alt="selector image 2"
					height={1289}
					src={"/img/graph-desc-selectbox-02.PNG"}
					style={{
						height: "auto",
						minWidth: 100,
						width: "100%",
					}}
					width={2277}
				/>
				<ShadcnMuted className="pb-4">
					複数選択が可能で、何かを選択した場合、選択した英単語ノードとそれに接続しているノードは濃く表示され、それ以外のノードは薄く表示されます。
				</ShadcnMuted>
			</div>
		</HelpDialog>
	);
}
