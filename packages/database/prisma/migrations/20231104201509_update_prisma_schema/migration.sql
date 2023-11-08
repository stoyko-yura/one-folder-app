/*
  Warnings:

  - You are about to drop the column `rateId` on the `comments` table. All the data in the column will be lost.
  - You are about to alter the column `message` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `title` on the `folders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(24)`.
  - You are about to alter the column `description` on the `folders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the column `folderId` on the `software` table. All the data in the column will be lost.
  - You are about to drop the column `rateId` on the `software` table. All the data in the column will be lost.
  - You are about to drop the column `softwareCategoryId` on the `software` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `software` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `software` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `rates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `softwareCategories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `authorId` on table `folders` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `software` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `software` table without a default value. This is not possible if the table is not empty.
  - Added the required column `login` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_rateId_fkey";

-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_authorId_fkey";

-- DropForeignKey
ALTER TABLE "software" DROP CONSTRAINT "software_folderId_fkey";

-- DropForeignKey
ALTER TABLE "software" DROP CONSTRAINT "software_rateId_fkey";

-- DropForeignKey
ALTER TABLE "software" DROP CONSTRAINT "software_softwareCategoryId_fkey";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "rateId",
ADD COLUMN     "averageRating" SMALLINT NOT NULL DEFAULT 0,
ALTER COLUMN "message" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "averageRating" SMALLINT NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(24),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "authorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "software" DROP COLUMN "folderId",
DROP COLUMN "rateId",
DROP COLUMN "softwareCategoryId",
DROP COLUMN "title",
ADD COLUMN     "averageRating" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "login" TEXT NOT NULL;

-- DropTable
DROP TABLE "rates";

-- DropTable
DROP TABLE "softwareCategories";

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "bio" VARCHAR(200),
    "username" VARCHAR(24),
    "userId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "rating" SMALLINT NOT NULL,
    "authorId" TEXT NOT NULL,
    "softwareId" TEXT,
    "folderId" TEXT,
    "commentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FolderToSoftware" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToSoftware" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_authorId_key" ON "ratings"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToSoftware_AB_unique" ON "_FolderToSoftware"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToSoftware_B_index" ON "_FolderToSoftware"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSoftware_AB_unique" ON "_CategoryToSoftware"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSoftware_B_index" ON "_CategoryToSoftware"("B");

-- CreateIndex
CREATE UNIQUE INDEX "comments_authorId_key" ON "comments"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "users_login_key" ON "users"("login");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_softwareId_fkey" FOREIGN KEY ("softwareId") REFERENCES "software"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToSoftware" ADD CONSTRAINT "_FolderToSoftware_A_fkey" FOREIGN KEY ("A") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToSoftware" ADD CONSTRAINT "_FolderToSoftware_B_fkey" FOREIGN KEY ("B") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSoftware" ADD CONSTRAINT "_CategoryToSoftware_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSoftware" ADD CONSTRAINT "_CategoryToSoftware_B_fkey" FOREIGN KEY ("B") REFERENCES "software"("id") ON DELETE CASCADE ON UPDATE CASCADE;
