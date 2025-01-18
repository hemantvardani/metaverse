import { getPrismaClient } from "@repo/orm/dist";
import { userSignInTI, userSignUpTI } from "./user.types";
import { compare, hash } from "bcrypt";

interface outputI {
  isSuccess: boolean;
  data?: any;
}

export const doesUserFieldAlreadyExist = async (
  fieldName: string,
  fieldValue: string,
): Promise<boolean> => {
  console.log("inside doesUserFieldAlreadyExist...");
  const PrismaClient = getPrismaClient();

  const userRecord = await PrismaClient.user.findFirst({
    where: { [fieldName]: fieldValue },
  });
  console.log("userRecord found is:", userRecord?.uuid);

  return Boolean(userRecord);
};

export const createUser = async (user: userSignUpTI): Promise<outputI> => {
  try {
    console.log("inside createUser...");
    const PrismaClient = getPrismaClient();

    //password hashing
    user.password = await hash(user.password, 5);

    const createdUser: any = await PrismaClient.user.create({ data: user });
    console.log("createdUser response", createdUser);
    return { isSuccess: true, data: { createdUser } };
  } catch (err: any) {
    return { isSuccess: false };
  }
};

/**
 *
 * @param {username, password}
 * @returns bool - does user credentials match in db or not?
 */
export const doesUserLoginMatch = async (
  credentials: userSignInTI,
): Promise<{ userValid: boolean; user?: any }> => {
  const PrismaClient = getPrismaClient();

  const user = await PrismaClient.user.findUnique({
    select: { password: true, userName: true, role: true },
    where: { userName: credentials.userName },
  });

  let userValid = false;
  if (user) {
    userValid = await compare(credentials.password, user.password);
  }

  return { userValid, user: userValid ? user : undefined };
};

export const updateUserDetails = async (
  uuid: string,
  data: any,
): Promise<void> => {
  const PrismaClient = getPrismaClient();

  PrismaClient.user.update({ where: { uuid }, data });
};
