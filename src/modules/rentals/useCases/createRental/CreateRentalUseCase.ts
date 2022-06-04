import { inject, injectable } from "tsyringe"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"

import { AppError } from "../../../../shared/errors/AppError"
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository"
import { Rental } from "../../infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../../repositories/IRentalsRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }: IRequest): Promise<Rental> {
    const minimumHour = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("car is unavailable")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("there's a rental in progress for user")
    }

    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    console.log(compare)

    if (compare < minimumHour) {
      throw new AppError("invalid return time")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental

  }
}

export { CreateRentalUseCase }
