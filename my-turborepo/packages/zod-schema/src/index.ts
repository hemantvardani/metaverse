import { z } from "zod";
import { userLoginPassword } from "@repo/shared-constants";
import { ERole } from "../../shared-constants/src/enum.js";

export const userSignUpZ = z
  .object({
    userName: z.string().nonempty(),
    password: z
      .string()
      .nonempty()
      .min(8, { message: "Password should be of at least 8 length." })
      .regex(userLoginPassword, {
        message:
          "Password should have at least 1 upper case and 1 lower case letter. Also, 1 special and 1 number.",
      }),
  })
  .strict();

export const userSignInZ = z
  .object({
    userName: z.string(),
    password: z.string(),
  })
  .strict();

export const userUpdateInfoZ = z
  .object({
    avatarId: z.string().nonempty().optional(),
    role: z.nativeEnum(ERole).optional(),
  })
  .strict();

export const createAvatarZ = z
  .object({
    image: z.string().nonempty(),
    title: z.string().nonempty(),
  })
  .strict();

export const createElementZ = z
  .object({
    title: z.string().nonempty(),
    width: z.number().min(1),
    height: z.number().min(1),
    isWalkable: z.boolean().optional(),
    image: z.string().nonempty(),
  })
  .strict();

export const createMapZ = z
.object({
  title : z.string().nonempty(),
  description : z.string(),
  image : z.string().nonempty(),
  height : z.number(),
  width : z.number()
})
.strict();