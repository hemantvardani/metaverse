import { prismaClient } from "@repo/orm/src";

export const doesUserFieldAlreadyExist = async (
  fieldName: string,
  fieldValue: string
): Promise<boolean> => {
  const userRecord = await prismaClient.user.findFirst({
    where: { [fieldName]: fieldValue },
  });
  console.log("userRecord found is:", userRecord);

  return Boolean(userRecord);
};
