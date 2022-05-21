import { inject, injectable } from "tsyringe"
import { hash } from "bcryptjs"

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../shared/errors/AppError"

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRpository: IUsersRepository
  ) { }

  async execute({
    name,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRpository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError("user already exisits")
    }

    const salt = 8
    const passwordHash = await hash(password, salt)

    await this.usersRpository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    })
  }
}

export { CreateUserUseCase }
