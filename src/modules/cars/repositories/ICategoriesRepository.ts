import { Category } from "../entities/Category"

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category>
}

export { ICategoriesRepository, ICreateCategoryDTO }
