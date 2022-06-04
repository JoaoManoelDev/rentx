import { Request, Response } from "express"
import { container } from "tsyringe"
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase"


class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user
    const { id } = request.params

    const devolutionRentalUsecase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUsecase.execute({
      id,
      user_id
    })

    return response.status(200).json(rental)
  }
}

export { DevolutionRentalController }
