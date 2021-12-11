import express from 'express'

import authorization from '../middlewares/authorization'
import {
  getUser,
  registerUser,
  addCartItem,
  getAll,
  updateUser,
  deleteUser,
} from '../controllers/user'

const router = express.Router()

router.get('/me', authorization, getUser)
router.get('/', getAll)
router.post('/', registerUser)
router.patch('/:userId', authorization, updateUser)
router.patch('/', authorization, addCartItem)
router.delete('/:userId', authorization, deleteUser)

export default router
