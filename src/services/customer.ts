import Customer, { CustomerDocument } from '../models/Customer'

const findAll = async (): Promise<CustomerDocument[]> => {
  return Customer.find().sort({ price: 1, name: 1 })
}

const create = async (
  customer: CustomerDocument
): Promise<CustomerDocument> => {
  return customer.save()
}

export default {
  findAll,
  create,
}
