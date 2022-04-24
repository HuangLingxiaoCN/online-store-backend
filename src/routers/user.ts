import express from 'express'

import authorization from '../middlewares/authorization'
import {
  getUser,
  registerUser,
  confirmEmail,
  resendEmail,
  addCartItem,
  modifyCartItem,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  clearCartItems,
  addListing,
  removeListing,
  updateListing,
  getAll,
  updateUser,
  deleteUser,
  ToggleUserSuspension,
} from '../controllers/user'

const router = express.Router()

router.get('/me', authorization, getUser)
router.get('/', getAll)
router.get('/confirm/:id', confirmEmail)
router.post('/reconfirm', resendEmail)
router.post('/', registerUser)
router.patch('/:userId', authorization, updateUser)
router.delete('/:userId', authorization, deleteUser)
router.post('/suspend', authorization, ToggleUserSuspension)

router.patch('/cart/add', authorization, addCartItem)
router.patch('/cart/modify', modifyCartItem)
router.patch('/cart/increment', incrementCartItem)
router.patch('/cart/decrement', decrementCartItem)
router.patch('/cart/delete', deleteCartItem)
router.patch('/cart/clear', clearCartItems)

router.patch('/listing/add', authorization, addListing)
router.delete('/listing/delete', authorization, removeListing)
router.patch('/listing/update', authorization, updateListing)

export default router
