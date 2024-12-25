// Type Inferences
import { userSignUpZ } from "@repo/zod-schema/src";
import {z} from "zod";

export type userSignUpTI = z.infer<typeof userSignUpZ>