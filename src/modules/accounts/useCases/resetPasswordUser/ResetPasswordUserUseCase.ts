import { hash } from "bcryptjs"
import { inject, injectable } from "tsyringe"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository"

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ password, token }: IRequest): Promise<void> {

    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError("token invalid")
    }

    if (this.dateProvider.compareIFBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("token expired")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    const salt = 8
    user.password = await hash(password, salt)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)

  }
}

export { ResetPasswordUserUseCase }
