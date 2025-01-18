import { getPrismaClient } from "@repo/orm/dist";

interface outputI {
  isSuccess: boolean;
  data?: any;
}

/**
 *
 * @returns list of available avatars - array of {uuid, img, title}
 */
export const getAllAvatarsList = async (): Promise<any> => {
  console.log("inside getAllAvatarsList...");
  const PrismaClient = getPrismaClient();

  const avatars = await PrismaClient.avatar.findMany({
    where: {},
    select: { uuid: true, img: true, title: true },
  });
  console.log("avatars list is:", avatars);

  return avatars;
};
