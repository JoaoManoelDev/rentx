import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory : CarsRepositoryInMemory

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async() => {

    const car = await carsRepositoryInMemory.create({
      "name": "Audi A3",
      "description": "Description Car",
      "daily_rate": 100,
      "license_plate": "ABZ-12345",
      "fine_amount": 50,
      "brand": "Brand",
      "category_id": "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by brand", async() => {

    const car = await carsRepositoryInMemory.create({
      "name": "Audi A2",
      "description": "Description Car",
      "daily_rate": 100,
      "license_plate": "ABZ-12345",
      "fine_amount": 50,
      "brand": "Brand_test",
      "category_id": "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand_test",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by name", async() => {

    const car = await carsRepositoryInMemory.create({
      "name": "Audi A6",
      "description": "Description Car",
      "daily_rate": 100,
      "license_plate": "ABZ-12345",
      "fine_amount": 50,
      "brand": "Brand_test",
      "category_id": "category_id"
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: "Audi A6",
    })

    expect(cars).toEqual([car])
  })

  it("should be able to list all available cars by category", async() => {

    const car = await carsRepositoryInMemory.create({
      "name": "Audi A7",
      "description": "Description Car",
      "daily_rate": 100,
      "license_plate": "ABZ-12345",
      "fine_amount": 50,
      "brand": "Brand_test",
      "category_id": "12345"
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    })

    expect(cars).toEqual([car])
  })

})
