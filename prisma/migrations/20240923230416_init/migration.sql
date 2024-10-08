-- CreateTable
CREATE TABLE "UserVocab" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserVocab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVocabHistory" (
    "id" SERIAL NOT NULL,
    "userVocabId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserVocabHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSynset" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "synsetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserSynset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSynsetHistory" (
    "id" SERIAL NOT NULL,
    "userSynsetId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserSynsetHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWordSynsetRelation" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" INTEGER NOT NULL,
    "synsetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserWordSynsetRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserWordSynsetRelationHistory" (
    "id" SERIAL NOT NULL,
    "userWordSynsetRelationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserWordSynsetRelationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroupingTest" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isPassed" BOOLEAN NOT NULL,

    CONSTRAINT "UserGroupingTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroupingTestWordSynsetRelation" (
    "relationId" INTEGER NOT NULL,
    "groupTestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserGroupingTestWordSynsetRelation_pkey" PRIMARY KEY ("relationId","groupTestId")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVocab_userId_wordId_key" ON "UserVocab"("userId", "wordId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSynset_userId_synsetId_key" ON "UserSynset"("userId", "synsetId");

-- CreateIndex
CREATE UNIQUE INDEX "UserWordSynsetRelation_userId_wordId_synsetId_key" ON "UserWordSynsetRelation"("userId", "wordId", "synsetId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "UserVocab" ADD CONSTRAINT "UserVocab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVocabHistory" ADD CONSTRAINT "UserVocabHistory_userVocabId_fkey" FOREIGN KEY ("userVocabId") REFERENCES "UserVocab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSynset" ADD CONSTRAINT "UserSynset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSynsetHistory" ADD CONSTRAINT "UserSynsetHistory_userSynsetId_fkey" FOREIGN KEY ("userSynsetId") REFERENCES "UserSynset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordSynsetRelation" ADD CONSTRAINT "UserWordSynsetRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserWordSynsetRelationHistory" ADD CONSTRAINT "UserWordSynsetRelationHistory_userWordSynsetRelationId_fkey" FOREIGN KEY ("userWordSynsetRelationId") REFERENCES "UserWordSynsetRelation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupingTest" ADD CONSTRAINT "UserGroupingTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupingTestWordSynsetRelation" ADD CONSTRAINT "UserGroupingTestWordSynsetRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "UserWordSynsetRelation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupingTestWordSynsetRelation" ADD CONSTRAINT "UserGroupingTestWordSynsetRelation_groupTestId_fkey" FOREIGN KEY ("groupTestId") REFERENCES "UserGroupingTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
