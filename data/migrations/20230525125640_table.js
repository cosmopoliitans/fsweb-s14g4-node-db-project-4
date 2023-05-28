/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("tarifler", (table) => {
      table.increments("tarif_id");
      table.string("tarif_adi").notNullable().unique(); // null değer olmayan ve benzersiz değere sahip
      table.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (table) => {
      table.increments("adim_id");
      table.string("adim_sirasi").notNullable().unsigned(); // null değer almayan ve yalnızca pozitif değer
      table.string("adim_talimati").notNullable();
      table
        .integer("tarif_id")
        .notNullable() // integer ile tam sayı veri türü saklar
        .references("tarif_id")
        .inTable("tarifler");
    })
    .createTable("icindekiler", (table) => {
      table.increments("icindekiler_id");
      table.string("icindekiler_adi");
    })
    .createTable("icindekiler_adimlar", (table) => {
      table.increments("icindekiler_adimlar_id");
      table.integer("adim_id").references("adim_id").inTable("adimlar");
      table.decimal("miktar").notNullable();
      table
        .integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("icindekiler_adimlar")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("tarifler");
};
