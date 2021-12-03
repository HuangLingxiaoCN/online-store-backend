import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import User from '../models/User'
import { BadRequestError } from '../helpers/apiError'

dotenv.config()
const jwtKey: any = process.env.JWT_SECRET

// POST
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new BadRequestError('Login fails')
    }

    const passwordIsValid = bcrypt.compare(password, user.password)
    if (!passwordIsValid) {
      throw new BadRequestError('Login fails')
    }

    const token = jwt.sign({ _id: user._id }, jwtKey)

    res.status(200).send(token)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
