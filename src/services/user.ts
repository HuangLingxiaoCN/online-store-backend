import { NotFoundError } from '../helpers/apiError'
import User, { UserType } from '../models/User'

const findAll = async (): Promise<UserType[]> => {
  return User.find().sort({ price: 1, name: 1 })
}

const create = async (User: UserType): Promise<UserType> => {
  return User.save()
}

const findById = async (userId: string): Promise<UserType> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`Movie ${userId} not found`)
  }

  return foundUser
}

const update = async (
  userId: string,
  update: Partial<UserType>
): Promise<UserType | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, { new: true })
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

const deleteUser = async (userId: string): Promise<UserType | null> => {
  const foundUser = await User.findByIdAndDelete(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  return foundUser
}

export default {
  findAll,
  create,
  findById,
  update,
  deleteUser,
}
