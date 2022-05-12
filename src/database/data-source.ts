import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    port: 5432,
    username: "docker",
    password: "9121",
    database: "rentx",
    synchronize: false,
    logging: false,
    entities: [],
    migrations: ["./src/database/migrations/*.ts"],
    subscribers: [],
})
