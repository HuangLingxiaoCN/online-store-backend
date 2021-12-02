import express from 'express'

import authorization from '../middlewares/authorization'
import { getUser, registerUser, addCartItem } from '../controllers/user'

const router = express.Router()

router.get('/me', authorization, getUser)
router.post('/', registerUser)
router.patch('/', addCartItem)

export default router
