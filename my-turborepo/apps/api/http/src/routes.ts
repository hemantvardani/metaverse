import { Router } from "express";
import { authenticated, authorizeAdmin } from "./middleware/index.js";
import { router as avatarRouter } from "./modules/avatar/avatar.routes.js";
import { router as mapRouter } from "./modules/map/map.routes.js";
import { router as spaceRouter } from "./modules/space/space.routes.js";
import { router as userRouter } from "./modules/user/user.routes.js";
import { router as designRouter } from "./modules/design/design.routes.js";
import { router as elementRouter } from "./modules/element/element.routes.js";
import { router as testRouter } from "./modules/testing/test.routes.js";


export const router = Router();

router.use("/user", userRouter);
router.use("/map", authenticated, mapRouter);
router.use("/space", authenticated, spaceRouter);
router.use("/avatar", authenticated, avatarRouter);
router.use("/element", authenticated, elementRouter);
router.use("/design", authenticated, authorizeAdmin, designRouter);
router.use("/test",testRouter)
