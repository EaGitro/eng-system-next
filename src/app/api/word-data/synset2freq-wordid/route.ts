import { type NextRequest, NextResponse } from "next/server";
import { nextFetchCache } from "~/rules/fetchCache";

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const synsetids = searchParams.getAll(SynsetidQueryParam);

	const resarr = await Promise.all(
		synsetids.map((synsetid) => {
			const url = `${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/synset2freq-wordid/${synsetid}`;
			return fetch(url, nextFetchCache).then((res) => res.json());
		}),
	);
	const resObj: Synset2FreqWordid = {};
	synsetids.forEach((synsetid, i) => {
		resObj[synsetid] = resarr[i];
	});
	return NextResponse.json(resObj);
}

const SynsetidQueryParam = "synid";

type Synset2FreqWordid = {
	[wordid: string]: {
		words: { freq: number; wordid: number };
		sum: number;
	};
};
