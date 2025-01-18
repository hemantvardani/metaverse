import { z } from "zod";
import { userLoginPassword } from "@repo/shared-constants/dist/regex";
// import {ERole} from '../../shared-constants/src/enum';

export const userSignUpZ = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    userName: z.string().nonempty(),
    password: z
      .string()
      .nonempty()
      .min(8, { message: "Password should be of atleast 8 length." })
      .regex(userLoginPassword, {
        message:
          "Password should have atleast 1 upper case and 1 lower case letter. Also, 1 special and 1 number.",
      }),
    // role : z.nativeEnum(ERole).optional()
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
    avatarId: z.string().optional(),
    role:z.string().optional()
  })
  .strict();


export const createAvatarZ = z
  .object({
    img: z.string(),
    title: z.string(),
  })
  .strict();