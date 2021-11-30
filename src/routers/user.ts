import express from 'express'

import { createUser, addCartItem } from '../controllers/user'

const router = express.Router()

router.post('/', createUser)
router.patch('/', addCartItem)

export default router
