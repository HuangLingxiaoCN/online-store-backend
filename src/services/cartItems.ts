import { NotFoundError } from '../helpers/apiError'
import CartItems, { CartItemsType } from '../models/CartItems'

const findAll = async (): Promise<CartItemsType[]> => {
  return CartItems.find().sort({ price: 1, name: 1 })
}

const create = async (Cart: CartItemsType): Promise<CartItemsType> => {
  return Cart.save()
}

const findById = async (cartItemId: string): Promise<CartItemsType> => {
  const foundCartItem = await CartItems.findById(cartItemId)

  if (!foundCartItem) {
    throw new NotFoundError(`Cart Item ${cartItemId} not found`)
  }

  return foundCartItem
}

const update = async (
  cartItemId: string,
  updateNumber: number
): Promise<CartItemsType | null> => {
  const foundCartItem = await CartItems.findByIdAndUpdate(
    cartItemId,
    { number: updateNumber },
    {
      new: true,
    }
  )
  if (!foundCartItem) {
    throw new NotFoundError(`Cart Item ${cartItemId} not found`)
  }
  return foundCartItem
}

const deleteCartItem = async (
  cartItemId: string
): Promise<CartItemsType | null> => {
  const foundCartItem = await CartItems.findByIdAndDelete(cartItemId)
  if (!foundCartItem) {
    throw new NotFoundError(`Cart Item ${cartItemId} not found`)
  }
  return foundCartItem
}

export default {
  findAll,
  create,
  findById,
  update,
  deleteCartItem,
}
