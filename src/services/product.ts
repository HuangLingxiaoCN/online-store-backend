import { NotFoundError } from '../helpers/apiError'
import Product, { ProductType } from '../models/Product'

const findAll = async (): Promise<ProductType[]> => {
  return Product.find().sort({ price: 1, name: 1 })
}

const create = async (product: ProductType): Promise<ProductType> => {
  return product.save()
}

// ======================================================
const findById = async (productId: string): Promise<ProductType> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) throw new NotFoundError(`Product ${productId} not found`)

  return foundProduct
}

const update = async (
  productId: string,
  update: Partial<ProductType>
): Promise<ProductType | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) throw new NotFoundError(`Product ${productId} not found`)

  return foundProduct
}

const deleteProduct = async (
  productId: string
): Promise<ProductType | null> => {
  const foundProduct = Product.findByIdAndDelete(productId)

  if (!foundProduct) throw new NotFoundError(`Product ${productId} not found`)

  return foundProduct
}

export default {
  findAll,
  create,
  findById,
  update,
  deleteProduct,
}
