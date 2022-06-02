import { Repository } from "typeorm"
import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"
import { ICarsImageRepository } from "../../../repositories/ICarsImageRepository"
import { CarImage } from "../entities/CarImage"


class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage)
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {

    const carImage = this.repository.create({
      car_id,
      image_name
    })

    await this.repository.save(carImage)

    return carImage
  }
}

export { CarsImageRepository }
