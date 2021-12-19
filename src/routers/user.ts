import express from 'express'

import authorization from '../middlewares/authorization'
import {
  getUser,
  registerUser,
  addCartItem,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  addListing,
  removeListing,
  updateListing,
  getAll,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

router.get('/me', authorization, getUser)
router.get('/', getAll)
router.post('/', registerUser)
router.patch('/:userId', authorization, updateUser)
router.delete('/:userId', authorization, deleteUser)

router.patch('/cart/add', authorization, addCartItem)
router.patch('/cart/increment', incrementCartItem)
router.patch('/cart/decrement', decrementCartItem)
router.patch('/cart/delete', deleteCartItem)

router.patch('/listing/add', authorization, addListing)
router.delete('/listing/delete', authorization, removeListing)
router.patch('/listing/update', authorization, updateListing)

export default router
