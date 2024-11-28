import type { Prisma, PrismaClient } from "@prisma/client";
import type { Types } from "@prisma/client/runtime/library.js";
import type { WordInfosType } from "~/app/types/statesContextsTypes";
import type { Expand } from "~/app/types/utils";

/**
 * take the value of the previous level and return next value of the next level
 * @param prevLevel the value of the previous level
 * @returns the value of next level
 */
export type UpdateLevelCallback = (prevLevel: number) => number;

export type UpsertObj<TargetObj> = Expand<{
	defaultLevel: number;
	target: TargetObj;
	updateLevel: UpdateLevelCallback;
}>;

/**
 * Determine the next level value based on the previous level value.
 * This function is designed for incremental level-ups with learning.
 * @param prevLevel - The value of the previous level.
 * @returns The next level value, capped by LEARNING_LEVEL_LIMIT.
 */
export const updateLevelLearning: UpdateLevelCallback = (prevLevel: number) => {
	// if (prevLevel + 1 > LEVEL_BOUNDARIES.LEARNING_LEVEL_LIMIT) {
	// 	return LEVEL_BOUNDARIES.LEARNING_LEVEL_LIMIT;
	// } else {
	return prevLevel + 1;
	// }
};

/**
 * create generic userObj object
 * @param targetObj
 * @param updateLevelCallback
 * @param defaultLevel
 * @returns
 */
export function createUserObj<TargetObj>(
	targetObj: TargetObj,
	updateLevelCallback: UpdateLevelCallback,
	defaultLevel: number,
) {
	return {
		defaultLevel: defaultLevel,
		targetObj: targetObj,
		updateLevel: updateLevelCallback,
	};
}

/**
 * update/upsert all user data, with updateLevelLearning callback function and default level value 1.
 * @param wordInfos {@link WordInfosType}
 * @param userId string
 * @param prisma prismaClient instance
 * @see {@link updateLevelLearning}
 */
export async function updateAllPrismaWithLearning(
	wordInfos: WordInfosType,
	userId: string,
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Types.Extensions.DefaultArgs
	>,
) {
	const updatedUserVocabsPromises = [];
	const updatedUserSynsetPromises = [];
	const updatedUserWordSynsetRelationPromises = [];

	for (const wordidStr in wordInfos) {
		const wordId = Number(wordidStr);
		updatedUserVocabsPromises.push(
			upsertUserVocab(prisma, {
				defaultLevel: 1,
				target: {
					userId: userId,
					wordId: wordId,
				},
				updateLevel: updateLevelLearning,
			}),
		);
		for (const synset of wordInfos[wordidStr].synsets) {
			updatedUserSynsetPromises.push(
				upsertUserSynset(prisma, {
					defaultLevel: 1,
					target: {
						synsetId: synset.synsetid,
						userId: userId,
					},
					updateLevel: updateLevelLearning,
				}),
			);

			updatedUserWordSynsetRelationPromises.push(
				upsertUserWordSynsetRelation(prisma, {
					defaultLevel: 1,
					target: {
						synsetId: synset.synsetid,
						userId: userId,
						wordId: wordId,
					},
					updateLevel: updateLevelLearning,
				}),
			);
		}
	}

	return {
		upsertedUserSynsets: await Promise.all(updatedUserSynsetPromises),
		upsertedUserVocabs: await Promise.all(updatedUserVocabsPromises),
		upsertedUserWordSynsetRelations: await Promise.all(
			updatedUserWordSynsetRelationPromises,
		),
	};
}

/**
 * Upsert (update or insert) a UserVocab record based on the provided user ID and word ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserVocab record.
 */
export async function upsertUserVocab(
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Types.Extensions.DefaultArgs
	>,
	upsertObj: UpsertObj<{
		userId: string;
		wordId: number;
	}>,
) {
	const oldUserVocab = await prisma.userVocab.findUnique({
		where: {
			userId_wordId: upsertObj.target,
		},
	});

	const t = await prisma.userVocab.upsert({
		create: {
			level: upsertObj.defaultLevel,
			userId: upsertObj.target.userId,
			wordId: upsertObj.target.wordId,
		},
		update: {
			level: upsertObj.updateLevel(oldUserVocab?.level ?? 0),
		},
		where: {
			userId_wordId: upsertObj.target,
		},
	});
	return t;
}

/**
 * Upsert (update or insert) a UserSynset record based on the provided user ID and synset ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserSynset record.
 */
export async function upsertUserSynset(
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Types.Extensions.DefaultArgs
	>,
	upsertObj: UpsertObj<{
		synsetId: string;
		userId: string;
	}>,
) {
	const oldUserSynset = await prisma.userSynset.findUnique({
		where: {
			userId_synsetId: upsertObj.target,
		},
	});
	const t = await prisma.userSynset.upsert({
		create: {
			level: upsertObj.defaultLevel,
			synsetId: upsertObj.target.synsetId,
			userId: upsertObj.target.userId,
		},
		update: {
			level: upsertObj.updateLevel(oldUserSynset?.level ?? 0),
		},
		where: {
			userId_synsetId: upsertObj.target,
		},
	});

	return t;
}

/**
 * Upsert (update or insert) a UserWordSynsetRelation record based on the provided user ID, word ID, and synset ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserWordSynsetRelation record.
 */
export async function upsertUserWordSynsetRelation(
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Types.Extensions.DefaultArgs
	>,
	upsertObj: UpsertObj<{
		synsetId: string;
		userId: string;
		wordId: number;
	}>,
) {
	const oldUserWordSynsetRelation =
		await prisma.userWordSynsetRelation.findUnique({
			where: {
				userId_wordId_synsetId: upsertObj.target,
			},
		});

	const t = await prisma.userWordSynsetRelation.upsert({
		create: {
			level: upsertObj.defaultLevel,
			synsetId: upsertObj.target.synsetId,
			userId: upsertObj.target.userId,
			wordId: upsertObj.target.wordId,
		},
		update: {
			level: upsertObj.updateLevel(oldUserWordSynsetRelation?.level ?? 0),
		},
		where: {
			userId_wordId_synsetId: upsertObj.target,
		},
	});
	return t;
}
