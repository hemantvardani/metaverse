import { Router } from "express";
import { authenticated, authorizeAdmin } from "./middleware";
import { router as avatarRouter } from "./modules/avatar/avatar.routes";
import { router as mapRouter } from "./modules/map/map.routes";
import { router as spaceRouter } from "./modules/space/space.routes";
import { router as userRouter } from "./modules/user/user.routes";
import { router as designRouter } from "./modules/design/design.routes";
import { router as elementRouter } from "./modules/element/element.routes";

export const router = Router();

router.use("/user", userRouter);
router.use("/map", authenticated, mapRouter);
router.use("/space", authenticated, spaceRouter);
router.use("/avatar", authenticated, avatarRouter);
router.use("/element", authenticated, elementRouter);
router.use("/design", authenticated, authorizeAdmin, designRouter);
