import knex from "knex";
import path from "path";

// __dirname sempre retorna o nome do diretório q está executando ele. Neste caso, "db"

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default connection;

// Migrations - Histórico do banco de dados

// Como juntar isso?
// create table points - meu ambiente
// create table users - ambiente de outro dev
