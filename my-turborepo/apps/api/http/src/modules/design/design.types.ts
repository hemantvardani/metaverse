import { createAvatarZ } from "@repo/zod-schema/dist/zod-schema/src/index.js";
import { z } from "zod";

export type createAvatarTI = z.infer<typeof createAvatarZ>;
