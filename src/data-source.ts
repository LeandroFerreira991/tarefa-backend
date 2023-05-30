import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import { Tasks } from "./entity/Tasks";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Tasks],
  migrations: [],
  subscribers: [],
};

createConnection(connectionOptions)
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao conectar com o banco de dados:", error);
  });





