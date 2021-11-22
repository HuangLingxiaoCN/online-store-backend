import express from 'express'

import {
  findAll,
  createProduct,
  updateProduct,
  deleteProduct,
  findById,
} from '../controllers/product'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
