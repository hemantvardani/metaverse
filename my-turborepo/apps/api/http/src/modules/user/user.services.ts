import { prismaClient } from "@repo/orm/src";
import { userSignUpTI } from "./user.types";

interface outputI {
  isSuccess:boolean,
  data?:any
}

export const doesUserFieldAlreadyExist = async (fieldName: string,fieldValue: string): Promise<boolean> => {
  const userRecord = await prismaClient.user.findFirst({
    where: { [fieldName]: fieldValue },
  });
  console.log("userRecord found is:", userRecord);

  return Boolean(userRecord);
};


export const createUser= async(user:userSignUpTI):Promise<outputI>=>{
  try {
    const createdUser: any = await prismaClient.user.create({ data: user });
    return { isSuccess: true, data: { userId: createdUser.id } };
  } catch (err: any) {
    return { isSuccess: false };
  }
}