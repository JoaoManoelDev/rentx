import { AppError } from "../../../../shared/errors/AppError"
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: ICarsRepository

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with exists licence plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "category"
      })

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "category"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-12346",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category"
    })


    expect(car.available).toBe(true)

  })
})
