import { PrismaClient } from "@prisma/client";

// so only single connection of prisma is opened
// global is used instead singleton class, to avoid creation of many connection while hot- reloading

declare global {
  var prismaClient: PrismaClient | undefined;
}

export function getPrismaClient(): PrismaClient {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient();
  }
  return global.prismaClient;
}
