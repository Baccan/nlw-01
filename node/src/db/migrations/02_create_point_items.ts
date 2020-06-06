import Knex from "knex";
// Quando se refere ao tipo da variável e não a variavel em sí, coloca-se em letra maiuscula (tipos não primitivos da linguagem)

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();

    table.integer("point_id").notNullable().references("id").inTable("points");

    table.integer("item_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  // VOLTAR ATRAS (DELETAR A TABELA)
  return knex.schema.dropTable("point_items");
}
