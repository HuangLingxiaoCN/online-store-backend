import express from 'express'

import { authenticateUser, isAdmin } from '../controllers/auth'

const router = express.Router()

router.post('/', authenticateUser)
router.post('/isAdmin', isAdmin)

export default router
