import Knex from "knex";
// Quando se refere ao tipo da variável e não a variavel em sí, coloca-se em letra maiuscula (tipos não primitivos da linguagem)

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();

    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
  });
}

export async function down(knex: Knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.dropTable("point");
}
