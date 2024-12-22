import {router as avatarRouter} from './avatar'
import {router as mapRouter} from './map'
import {router as spaceRouter} from './space'
import {router as userRouter} from './user'
import {router as designRouter} from './design'
import {router as elementRouter} from './element'



import { Router } from 'express'
import { authenticated, authorizeAdmin } from '../../middleware/v1'

export const router = Router();

router.get("/avatar",authenticated, avatarRouter)
router.get("/map",authenticated, mapRouter)
router.get("/space",authenticated, spaceRouter)
router.get("/user", userRouter)
router.get("/design",authenticated, authorizeAdmin, designRouter)
router.get("/element", authenticated, elementRouter)