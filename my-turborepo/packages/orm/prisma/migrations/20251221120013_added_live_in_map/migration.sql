/*
  Warnings:

  - You are about to drop the column `height` on the `Element` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Element` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "height",
DROP COLUMN "width";

-- AlterTable
ALTER TABLE "Map" ADD COLUMN     "live" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "height" DROP DEFAULT,
ALTER COLUMN "width" DROP DEFAULT;
