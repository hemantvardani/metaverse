// Type Inferences
import { userSignUpZ } from "@repo/zod-schema/dist";
import {z} from "zod";

export type userSignUpTI = z.infer<typeof userSignUpZ>