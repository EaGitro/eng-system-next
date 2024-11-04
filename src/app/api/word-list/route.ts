import { NextRequest, NextResponse } from "next/server";
import { nextFetchCache } from "~/rules/fetchCache";
import { WORDLIST_SECTION_TOTAL } from "~/rules/wordlist";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const level = searchParams.get('level');
    const section = searchParams.get("section") && parseInt(searchParams.get("section") as string);
    const url = `${process.env.NEXT_PUBLIC_WN_BACKEND_URL}/tmp-learning-words/${level}`;
    const levelWordlist: string[] = await ((await fetch(url, { ...nextFetchCache })).json())
    console.log("levelWordlist=====", levelWordlist)
    if (!(section && typeof section == "number") || section == 0) {
        let res = []
        for (let i = 0; i < levelWordlist.length; i += WORDLIST_SECTION_TOTAL) {
            res.push(levelWordlist.slice(i, i + WORDLIST_SECTION_TOTAL));
        }
        return NextResponse.json(res);
    }

    const sectionWordlist = levelWordlist.slice((WORDLIST_SECTION_TOTAL * (section - 1)), WORDLIST_SECTION_TOTAL * (section))
    return NextResponse.json(sectionWordlist)

}