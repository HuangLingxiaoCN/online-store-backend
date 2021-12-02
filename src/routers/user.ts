import express from 'express'

import { registerUser, addCartItem } from '../controllers/user'

const router = express.Router()

router.post('/', registerUser)
router.patch('/', addCartItem)

export default router
