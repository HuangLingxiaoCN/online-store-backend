import { NotFoundError } from '../helpers/apiError'
import User, { UserType } from '../models/User'

const getUser = async (userId: string): Promise<UserType> => {
  // exclude password
  const foundUser = await User.findById(userId).select('-password')
  if (!foundUser) throw new NotFoundError(`User ${userId} not found`)

  return foundUser
}

const register = async (User: UserType): Promise<UserType> => {
  return User.save()
}

const addCartItem = async (User: UserType): Promise<UserType> => {
  return User.save()
}

export default {
  getUser,
  register,
  addCartItem,
}
