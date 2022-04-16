import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import User from '../models/User'
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from '../helpers/apiError'

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
      throw new UnauthorizedError('Login fails')
    }
    if (user.isSuspended) {
      throw new ForbiddenError(
        'Account suspended. Please contact the administrator'
      )
    }

    console.log(password)
    console.log(bcrypt.compareSync(password, user.password))
    // console.log(bcrypt.compare(password, user.password)) is not correct

    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      throw new UnauthorizedError('Login fails')
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

// isAdmin
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      throw new UnauthorizedError('Login fails')
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      throw new UnauthorizedError('Login fails')
    }

    // check if the user's isAdmin property
    if (!user.isAdmin) {
      throw new ForbiddenError('Access Denied')
    }

    res.status(200).send('Access granted')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
