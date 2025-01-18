import { createAvatarZ } from "@repo/zod-schema";
import {z} from "zod";

export type createAvatarTI =  z.infer<typeof createAvatarZ>