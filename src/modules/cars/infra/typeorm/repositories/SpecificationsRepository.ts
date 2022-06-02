import { Repository, In } from "typeorm"
import { Specification } from "../../../infra/typeorm/entities/Specification"

import { ICreateSpecificationDTO, ISpecificationsRepository } from "../../../repositories/ISpecificationsRepository"

import { AppDataSource } from "../../../../../shared/infra/typeorm/data-source"

class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } })
    return specification
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({ id: In(ids) })

    return specifications

  }
}

export { SpecificationsRepository }
