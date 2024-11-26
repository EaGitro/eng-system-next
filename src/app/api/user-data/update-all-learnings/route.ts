import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import { authOptions } from "~/lib/auth";
import prisma from "~/lib/prisma";
import { updateAllPrismaWithLearning } from "~/utils/prismaUpserts";

export async function POST(request: NextRequest) {
	const req: WordInfosType = await request.json();
	const session = await getServerSession(authOptions);
	if (!session) throw Error("認証してくださいね!");
	const userId = session.user.id;

	const res = await updateAllPrismaWithLearning(req, userId, prisma);

	return NextResponse.json(res, { status: 201 });
}
