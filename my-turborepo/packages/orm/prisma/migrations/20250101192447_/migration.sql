/*
  Warnings:

  - You are about to drop the column `pwdHash` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "pwdHash",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';
