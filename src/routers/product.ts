import express from 'express'

import {
  findAll,
  createProduct,
  updateProduct,
  deleteProduct,
  findById,
} from '../controllers/product'
import authorization from '../middlewares/authorization'

const router = express.Router()

router.get('/', findAll)
router.get('/:productId', findById)
router.post('/', authorization, createProduct)
router.put('/:productId', authorization, updateProduct)
router.delete('/:productId', authorization, deleteProduct)

export default router
