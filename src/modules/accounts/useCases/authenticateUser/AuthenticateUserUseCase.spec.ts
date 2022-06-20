import { AppError } from "../../../../shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123456",
      email: "user@test.com",
      password: "12345",
      name: "User Test"
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an noneexistet user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "fake@email.com",
      password: "1234"
    })
    ).rejects.toEqual(new AppError("email or password incorrect"))
  })

  it("should not be able to authenticate with incorrect password", async () => {

    const user: ICreateUserDTO = {
      driver_license: "000099999",
      email: "user@user.com",
      password: "12345",
      name: "User Test Error"
    }

    await createUserUseCase.execute(user)

    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "IncorrectPassword"
    })

    ).rejects.toEqual(new AppError("email or password incorrect"))

  })

})
