import { NextFunction, Request, Response } from "express"
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository"
import { AppError } from "../../../errors/AppError"


export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user

  const usersRpository = new UsersRepository()

  const user = await usersRpository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("user isn't not admin", )
  }

  return next()
}
