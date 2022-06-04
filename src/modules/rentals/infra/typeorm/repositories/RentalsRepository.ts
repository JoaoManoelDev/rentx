import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO"
import { IRentalsRepository } from "../../../repositories/IRentalsRepository"
import { Rental } from "../entities/Rental"

class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>

  constructor() {
    this.repository = AppDataSource.getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null }
    })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUSer = await this.repository.findOne({
      where: { user_id, end_date: null }
    })

    return openByUSer
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id } })

    return rental
  }

}

export { RentalsRepository }
