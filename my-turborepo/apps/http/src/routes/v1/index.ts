import {router as avatarRouter} from './avatar'
import {router as mapRouter} from './map'
import {router as spaceRouter} from './space'
import {router as userRouter} from './user'
import {router as designRouter} from './design'
import {router as elementRouter} from './element'



import { Router } from 'express'

export const router = Router();

router.get("/avatar", avatarRouter)
router.get("/map", mapRouter)
router.get("/space", spaceRouter)
router.get("/user", userRouter)
router.get("/design", designRouter)
router.get("/element", elementRouter)