import { getPrismaClient } from "@repo/orm/dist";

interface outputI {
  isSuccess: boolean;
  data?: any;
}

/**
 *
 * @returns list of available elements - array of {uuid, image, title, width , height, overriddalble}
 */
export const getAllElementsList = async (): Promise<any> => {
  console.log("inside getAllElementsList...");
  const PrismaClient = getPrismaClient();

  const elements = await PrismaClient.element.findMany({
    where: {},
    select: {
      uuid: true,
      image: true,
      title: true,
      height: true,
      width: true,
      isWalkable: true,
    },
  });
  console.log("elements list is:", elements);

  return elements;
};
