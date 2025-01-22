/*
  Warnings:

  - You are about to drop the column `static` on the `Element` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "static",
ADD COLUMN     "overridable" BOOLEAN NOT NULL DEFAULT true;
