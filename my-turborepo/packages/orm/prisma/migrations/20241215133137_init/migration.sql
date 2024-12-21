-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Layout" AS ENUM ('SPACE', 'MAP');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "pwdHash" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PLAYER',
    "avatarId" TEXT
);

-- CreateTable
CREATE TABLE "Map" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 100,
    "width" INTEGER NOT NULL DEFAULT 100
);

-- CreateTable
CREATE TABLE "Space" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Element" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "static" BOOLEAN NOT NULL DEFAULT true,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElementMapping" (
    "uuid" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "elementId" TEXT NOT NULL,
    "layoutMapId" TEXT NOT NULL,
    "layoutSpaceId" TEXT NOT NULL,
    "layout" "Layout" NOT NULL
);

-- CreateTable
CREATE TABLE "Avatar" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Map_uuid_key" ON "Map"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Space_uuid_key" ON "Space"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Element_uuid_key" ON "Element"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ElementMapping_uuid_key" ON "ElementMapping"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_uuid_key" ON "Avatar"("uuid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementMapping" ADD CONSTRAINT "ElementMapping_elementId_fkey" FOREIGN KEY ("elementId") REFERENCES "Element"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementMapping" ADD CONSTRAINT "ElementMapping_layoutMapId_fkey" FOREIGN KEY ("layoutMapId") REFERENCES "Space"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElementMapping" ADD CONSTRAINT "ElementMapping_layoutSpaceId_fkey" FOREIGN KEY ("layoutSpaceId") REFERENCES "Map"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
