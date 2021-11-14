import Product, { ProductDocument } from '../models/Product'

const findAll = async (): Promise<ProductDocument[]> => {
  return Product.find().sort({ price: 1, name: 1 })
}

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

export default {
  findAll,
  create,
}
