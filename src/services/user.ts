import { NotFoundError } from '../helpers/apiError'
import User, { UserType } from '../models/User'

const getUser = async (userId: string): Promise<UserType> => {
  // exclude password
  const foundUser = await User.findById(userId).select('-password')
  if (!foundUser) throw new NotFoundError(`User ${userId} not found`)

  return foundUser
}

const getAll = async (): Promise<UserType[]> => {
  // exclude password
  return User.find()
}

const updateUser = async (
  userId: string,
  update: Partial<UserType>
): Promise<UserType> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, { new: true })
  if (!foundUser) throw new NotFoundError(`User ${userId} not found`)

  return foundUser
}

const saveUser = async (User: UserType): Promise<UserType> => {
  return User.save()
}

const deleteUser = async (userId: string): Promise<UserType> => {
  const foundUser = await User.findByIdAndDelete(userId)
  if (!foundUser) throw new NotFoundError(`User ${userId} not found`)

  return foundUser
}

// add, increment, decrement
const handleCartItem = async (User: UserType): Promise<UserType> => {
  return User.save()
}

const handleListing = async (User: UserType): Promise<UserType> => {
  return User.save()
}

export default {
  getUser,
  saveUser,
  handleCartItem,
  handleListing,
  getAll,
  updateUser,
  deleteUser,
}
