import { Repository } from "typeorm"
import { User } from "../../entities/User"

import { AppDataSource } from "../../../../database/data-source"
import { IUsersRepository } from "../IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"

class UsersRepository implements IUsersRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id
    })

    await this.repository.save(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ where: { id } })

    return user
  }

}

export { UsersRepository }
