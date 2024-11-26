-- CreateTable
CREATE TABLE "PreTestStatus" (
    "userId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PreTestStatus_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PostTestStatus" (
    "userId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostTestStatus_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PreTestUserAnswerKnowledge" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PreTestUserAnswerKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTestUserAnswerKnowledge" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "rate" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostTestUserAnswerKnowledge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreTestUserAnswerMatch" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PreTestUserAnswerMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTestUserAnswerMatch" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "correct" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostTestUserAnswerMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "userId" TEXT NOT NULL,
    "group" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "PreTestStatus" ADD CONSTRAINT "PreTestStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTestStatus" ADD CONSTRAINT "PostTestStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreTestUserAnswerKnowledge" ADD CONSTRAINT "PreTestUserAnswerKnowledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTestUserAnswerKnowledge" ADD CONSTRAINT "PostTestUserAnswerKnowledge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreTestUserAnswerMatch" ADD CONSTRAINT "PreTestUserAnswerMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTestUserAnswerMatch" ADD CONSTRAINT "PostTestUserAnswerMatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroup" ADD CONSTRAINT "UserGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
