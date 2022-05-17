import "reflect-metadata"
import { DataSource } from "typeorm"

import { Category } from "../modules/cars/entities/Category"
import { Specification } from "../modules/cars/entities/Specification"
import { User } from "../modules/accounts/entities/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "9121",
    database: "rentx",
    synchronize: false,
    logging: false,
    entities: [Category, Specification, User],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}
