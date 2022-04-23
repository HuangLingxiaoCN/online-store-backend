import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import User from '../models/User'
import {
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../helpers/apiError'

// Email verification
import sendEmail from '../email/email.send'
import templates from '../email/email.templates'
import msgs from '../email/email.msgs'

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
      throw new NotFoundError('The account does not exist')
    }

    console.log(password)
    console.log(bcrypt.compareSync(password, user.password))
    // console.log(bcrypt.compare(password, user.password)) is not correct

    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      throw new UnauthorizedError(
        'Login fails. Please check you email or password'
      )
    }

    if (user.isSuspended) {
      throw new ForbiddenError(
        'Account suspended. Please contact the administrator'
      )
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

    const token = jwt.sign({ _id: user._id, isAdmin: true }, jwtKey)

    res.status(200).send(token)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
