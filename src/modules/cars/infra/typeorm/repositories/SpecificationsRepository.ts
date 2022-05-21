import { Repository } from "typeorm"
import { Specification } from "../../../infra/typeorm/entities/Specification"

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository"

import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"

class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } })
    return specification
  }
}

export { SpecificationsRepository }
