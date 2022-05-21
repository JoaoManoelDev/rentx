import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "9121",
    database: "rentx",
    synchronize: true,
    logging: false,
    entities: ["src/modules/**/infra/typeorm/entities/*.ts"],
    migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
    subscribers: [],
})

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}
