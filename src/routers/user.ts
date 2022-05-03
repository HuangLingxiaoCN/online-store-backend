import express from 'express'

import authorization from '../middlewares/authorization'
import {
  getUser,
  registerUser,
  confirmEmail,
  resendEmail,
  addCartItem,
  modifyCartItemQuantity,
  deleteCartItem,
  clearCartItems,
  addListing,
  removeListing,
  getAll,
  updateUser,
  deleteUser,
  toggleUserSuspension,
} from '../controllers/user'

const router = express.Router()

router.get('/me', authorization, getUser)
router.get('/', getAll)
router.get('/confirm/:id', confirmEmail)
router.post('/reconfirm', resendEmail)
router.post('/', registerUser)
router.patch('/:userId', authorization, updateUser)
router.delete('/:userId', authorization, deleteUser)
router.post('/suspend', authorization, toggleUserSuspension)

router.patch('/cart/add', authorization, addCartItem)
router.patch('/cart/modify', modifyCartItemQuantity)
router.patch('/cart/delete', deleteCartItem)
router.patch('/cart/clear', clearCartItems)

router.patch('/listing/add', authorization, addListing)
router.delete('/listing/delete', authorization, removeListing)

export default router
