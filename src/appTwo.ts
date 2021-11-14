import express from 'express'
import dotenv from 'dotenv'

import productRouter from './routers/product'

dotenv.config({ path: '.env' })
const appTwo = express()

appTwo.set('port', process.env.PORT || 3000)
appTwo.use(express.json())

appTwo.use('/product/products', productRouter)

export default appTwo
