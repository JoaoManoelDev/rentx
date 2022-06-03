import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO"
import { IRentalsRepository } from "../../../repositories/IRentalsRepository"
import { Rental } from "../entities/Rental"

class RentalsRepository implements IRentalsRepository {

  private rentals: Repository<Rental>

  constructor() {
    this.rentals = AppDataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.rentals.findOne({ where: { car_id } })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUSer = await this.rentals.findOne({ where: { user_id } })

    return openByUSer
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.rentals.create({
      car_id,
      user_id,
      expected_return_date
    })

    await this.rentals.save(rental)

    return rental
  }

}

export { RentalsRepository }
