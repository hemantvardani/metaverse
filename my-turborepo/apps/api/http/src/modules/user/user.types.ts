// Type Inferences
import { userSignInZ, userSignUpZ, userUpdateInfoZ } from "@repo/zod-schema/dist";
import {z} from "zod";

export type userSignUpTI = z.infer<typeof userSignUpZ>
export type userSignInTI = z.infer<typeof userSignInZ>
export type userUpdateInfoTI = z.infer<typeof userUpdateInfoZ>