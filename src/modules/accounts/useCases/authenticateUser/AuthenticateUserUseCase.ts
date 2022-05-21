import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { sign } from "jsonwebtoken"

import { compare } from "bcryptjs"
import { AppError } from "../../../../shared/errors/AppError"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  },
  token: string
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRpository: IUsersRepository
  ) {  }

  async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRpository.findByEmail(email)

    if (!user) {
      throw new AppError("email or password incorrect")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("email or password incorrect")
    }

    const token = sign({}, "ee392643dbc4b06ab8e0af3a79602f6b", {
      subject: user.id,
      expiresIn: "1d"
    })

    const tokenResponse: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenResponse

  }
}

export { AuthenticateUserUseCase }
