import express from 'express'

import {
  findAll,
  findById,
  createcCartItems,
  updateCartItemNumber,
  deleteCartItem,
} from '../controllers/cartItems'

const router = express.Router()

router.get('/', findAll)
router.get('/:cartItemId', findById)
router.post('/', createcCartItems)
router.patch('/:cartItemId', updateCartItemNumber)
router.delete('/:cartItemId', deleteCartItem)

export default router
