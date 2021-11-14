import express from 'express'

import { findAll, createProduct } from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.post('/', createProduct)

export default router
