import { getPrismaClient } from "@repo/orm/dist";
import { userSignUpTI } from "./user.types";

interface outputI {
  isSuccess:boolean,
  data?:any
}

export const doesUserFieldAlreadyExist = async (fieldName: string,fieldValue: string): Promise<boolean> => {
    console.log("inside doesUserFieldAlreadyExist...")
    const PrismaClient= getPrismaClient();

    const userRecord = await PrismaClient.user.findFirst({
    where: { [fieldName]: fieldValue },
  });
  console.log("userRecord found is:", userRecord?.uuid);

  return Boolean(userRecord);
};


export const createUser= async(user:userSignUpTI):Promise<outputI>=>{
  try {
    console.log("inside createUser...")
    const PrismaClient= getPrismaClient();

    const createdUser: any = await PrismaClient.user.create({ data: user });
    console.log("createdUser response",createdUser)
    return { isSuccess: true, data: { userId: createdUser.uuid } };
  } catch (err: any) {
    return { isSuccess: false };
  }
}