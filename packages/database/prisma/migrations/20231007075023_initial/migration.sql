-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "FolderAccess" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "access" "FolderAccess" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "software" (
    "id" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rateId" TEXT NOT NULL,
    "description" TEXT,
    "softwareCategoryId" TEXT NOT NULL,
    "folderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "software_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "softwareCategories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "softwareCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "rateId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rates" (
    "id" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software" ADD CONSTRAINT "software_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "rates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software" ADD CONSTRAINT "software_softwareCategoryId_fkey" FOREIGN KEY ("softwareCategoryId") REFERENCES "softwareCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "software" ADD CONSTRAINT "software_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "rates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
