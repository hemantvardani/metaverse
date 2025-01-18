import { getPrismaClient } from "@repo/orm/dist";
import { createAvatarTI } from "./design.types";

interface outputI {
  isSuccess: boolean;
  data?: any;
}

export const createAvatar = async (data: createAvatarTI): Promise<outputI> => {
  try {
    console.log("inside createUser...");
    const PrismaClient = getPrismaClient();

    const createdAvatar: any = await PrismaClient.avatar.create({ data });
    console.log("createdAvatar response", createdAvatar);
    return { isSuccess: true, data: { createdAvatar } };
  } catch (err: any) {
    return { isSuccess: false };
  }
};
