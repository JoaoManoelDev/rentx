import { Request, Response } from "express"
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase"

class CreateSpecificationController {
  constructor(private createSpecificationsUseCase: CreateSpecificationUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body

    this.createSpecificationsUseCase.execute({ name, description })

    return response.status(201).json("specification created successfully")
  }
}

export { CreateSpecificationController }
