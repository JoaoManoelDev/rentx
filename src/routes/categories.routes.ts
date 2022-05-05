import { Router } from "express"

import { CategoriesRepository } from "../repositories/CategoriesRepository"

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "category already exists" })
  }

  categoriesRepository.create({ name, description })

  return response.status(201).json({ message: "category created successfully" })
})

categoriesRoutes.get("/", (request, response) => {

  const categories = categoriesRepository.list()

  return response.status(200).json(categories)

})

export { categoriesRoutes }
