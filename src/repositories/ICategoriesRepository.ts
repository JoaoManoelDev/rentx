import { Category } from "../model/category";

// DTO => Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void
  list(): Category[]
  findByName(name: string): Category
}

export { ICategoriesRepository, ICreateCategoryDTO }
