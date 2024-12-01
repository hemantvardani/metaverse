import {router as authRouter} from './auth'
import {router as adminRouter} from './admin'
import {router as spaceRouter} from './admin'

import { Router } from 'express'

export const router = Router();

router.get("/auth", authRouter)
router.get("/admin", adminRouter)
router.get("/space", spaceRouter)