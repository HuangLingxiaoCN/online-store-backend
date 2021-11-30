import { NotFoundError } from '../helpers/apiError'
import User, { UserType } from '../models/User'

const create = async (User: UserType): Promise<UserType> => {
  return User.save()
}

const addCartItem = async (User: UserType): Promise<UserType> => {
  return User.save()
}

export default {
  create,
  addCartItem,
}
