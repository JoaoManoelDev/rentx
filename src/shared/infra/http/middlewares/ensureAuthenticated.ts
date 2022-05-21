import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../../../errors/AppError"
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository"

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError("token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, "ee392643dbc4b06ab8e0af3a79602f6b") as IPayload

    const usersRpository = new UsersRepository()

    const user = await usersRpository.findById(user_id)

    if (!user) {
      throw new AppError("user does not exists", 401)
    }

    request.user = {
      id: user_id
    }

    next()
  } catch {
    throw new AppError("invalid token", 401)
  }

}
