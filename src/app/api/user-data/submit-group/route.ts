import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import type { SubmitGroupResponse } from "~/app/(page)/user-sorting/_user-sorting/type";

import { SORTING_USER_SEARCHPARAM } from "~/app/(page)/user-sorting/_user-sorting/const";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { USER_GROUP } from "~/rules/prisma";

export async function GET(request: NextRequest) {

	const searchParams = request.nextUrl.searchParams;
	const groupStr = searchParams.get(SORTING_USER_SEARCHPARAM)
	const group = Number(groupStr)
	if (!(group in Object.keys(USER_GROUP)) && group !== 4) return NextResponse.json({
		group: undefined,
		message: `Got invalid value "${groupStr}"`,
		success: false
	} as SubmitGroupResponse, { status: 400 })
	const session = await getServerSession(authOptions);
	if (!session) throw Error("認証してくださいね!");
	const userId = session.user.id;
	const userGroup = await prisma.userGroup.upsert({
		create:{
			group: group,
			userId:userId
		},
		update: { group },
		where: {
			userId: userId
		}
	})
	return NextResponse.json({
		group: userGroup.group,
		message: "update successfully",
		success: true
	} as SubmitGroupResponse, { status: 201 });
}
