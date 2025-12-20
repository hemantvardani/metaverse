import { getPrismaClient } from "@repo/orm/dist";
import { createAvatarTI, createElementTI, createMapTI } from "./design.types";

interface outputI {
  isSuccess: boolean;
  data?: any;
}

export const createAvatar = async (data: createAvatarTI): Promise<outputI> => {
  try {
    console.log("inside createAvatar...");
    const PrismaClient = getPrismaClient();

    const createdAvatar: any = await PrismaClient.avatar.create({ data });
    console.log("createdAvatar response", createdAvatar);
    return { isSuccess: true, data: { uuid: createdAvatar.uuid } };
  } catch (err: any) {
    return { isSuccess: false };
  }
};

export const createElement = async (
  data: createElementTI,
): Promise<outputI> => {
  try {
    console.log("inside createElement...");
    const PrismaClient = getPrismaClient();

    const createdElement: any = await PrismaClient.element.create({ data });
    console.log("createdElement response", createdElement);
    return { isSuccess: true, data: { elementId: createdElement.uuid } };
  } catch (err: any) {
    return { isSuccess: false };
  }
};

export const createMap = async (data: createMapTI):Promise<outputI> => 
{
  console.log("inside createMap...");
  try{
    const PrismaClient = getPrismaClient();
    const createdMap = await PrismaClient.map.create({data})
    console.log("createMap response", createdMap);

    return {isSuccess:true, data: createdMap}
  }catch{
    return {isSuccess: false}
  }
}