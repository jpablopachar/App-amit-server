import { ResponseData } from '@/interfaces'
import { User } from '@/models'
import { Request, Response } from 'express'

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find()

    const message: ResponseData<typeof users> = {
      message: 'Usuarios',
      data: users,
      success: true,
      error: false,
    }

    res.json(message)
  } catch (error) {
    const message: ResponseData = {
      message: error instanceof Error ? error.message : String(error),
      success: false,
      error: true,
    }

    res.status(400).json(message)
  }
}
