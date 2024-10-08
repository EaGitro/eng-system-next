import { PrismaClient, Prisma, } from "@prisma/client";
import { Types } from '@prisma/client/runtime/library.js';
import { Expand } from "~/app/types/utils";
import { LEVEL_BOUNDARIES } from "~/rules/prisma";

/**
 * take the value of the previous level and return next value of the next level
 * @param prevLevel the value of the previous level
 * @returns the value of next level
 */
export type UpdateLevelCallback = (prevLevel: number) => number

export type UpsertObj<TargetObj> = Expand<{
    target: TargetObj
    updateLevel: UpdateLevelCallback,
    defaultLevel: number
}>




/**
 * Determine the next level value based on the previous level value.
 * This function is designed for incremental level-ups with learning.
 * @param prevLevel - The value of the previous level.
 * @returns The next level value, capped by LEARNING_LEVEL_LIMIT.
 */
export function updateLevelLearning(prevLevel: number) {
    if (prevLevel + 1 > LEVEL_BOUNDARIES.LEARNING_LEVEL_LIMIT) {
        return LEVEL_BOUNDARIES.LEARNING_LEVEL_LIMIT;
    } else {
        return prevLevel + 1
    }
}


/**
 * Upsert (update or insert) a UserVocab record based on the provided user ID and word ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserVocab record.
 */
export async function upsertUserVocab(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Types.Extensions.DefaultArgs>,
    upsertObj: UpsertObj<{
        userId: string,
        wordId: number
    }>
) {
    const oldUserVocab = await prisma.userVocab.findUnique({
        where: {
            userId_wordId: upsertObj.target
        }
    })

    return await prisma.userVocab.upsert({
        where: {
            userId_wordId: upsertObj.target
        },
        update: {
            level: upsertObj.updateLevel(oldUserVocab?.level ?? 0)
        },
        create: {
            wordId: upsertObj.target.wordId,
            userId: upsertObj.target.userId,
            level: upsertObj.defaultLevel
        }
    })

}


/**
 * Upsert (update or insert) a UserSynset record based on the provided user ID and synset ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserSynset record.
 */
export async function upsertUserSynset(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Types.Extensions.DefaultArgs>,
    upsertObj: UpsertObj<{
        userId: string;
        synsetId: string;
    }>
) {
    const oldUserSynset = await prisma.userSynset.findUnique({
        where: {
            userId_synsetId: upsertObj.target
        },
    });
    const t = await prisma.userSynset.upsert({
        where: {
            userId_synsetId: upsertObj.target
        },
        update: {
            level: upsertObj.updateLevel(oldUserSynset?.level ?? 0)
        },
        create: {
            synsetId: upsertObj.target.synsetId,
            userId: upsertObj.target.userId,
            level: upsertObj.defaultLevel
        }
    })

    return t

}


/**
 * Upsert (update or insert) a UserWordSynsetRelation record based on the provided user ID, word ID, and synset ID.
 * @param prisma - The Prisma client instance.
 * @param upsertObj - The object containing the target IDs, level update callback, and default level.
 * @returns The upserted UserWordSynsetRelation record.
 */
export async function upsertUserWordSynsetRelation(
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Types.Extensions.DefaultArgs>,
    upsertObj: UpsertObj<{
        userId: string,
        wordId: number,
        synsetId: string
    }>
){
    const oldUserWordSynsetRelation = await prisma.userWordSynsetRelation.findUnique({
        where: {
            userId_wordId_synsetId: upsertObj.target
        },
    })

    const t = await prisma.userWordSynsetRelation.upsert({
        where: {
            userId_wordId_synsetId: upsertObj.target
        },
        update:{
            level: upsertObj.updateLevel(oldUserWordSynsetRelation?.level ?? 0)
        },
        create:{
            wordId:  upsertObj.target.wordId,
            synsetId:  upsertObj.target.synsetId,
            userId:  upsertObj.target.userId,
            level: upsertObj.defaultLevel
        }

    })
    return t 
}


