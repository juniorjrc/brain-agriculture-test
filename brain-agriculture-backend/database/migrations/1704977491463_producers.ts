import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Producers extends BaseSchema {
  protected tableName = "producer";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("producer_id");
      table
        .integer("document_type_id")
        .unsigned()
        .references("document_type_id")
        .inTable("document_type")
        .notNullable();
      table.string("document_number", 15).notNullable();
      table.string("producer_name", 150).notNullable();
      table.string("farm_name", 150).notNullable();
      table.string("city", 150);
      table.string("state", 150);
      table.decimal("total_area", 10, 2);
      table.decimal("arable_area", 10, 2);
      table.decimal("vegetation_area", 10, 2);
    });

    this.defer(async (db) => {
      await db.rawQuery(
        `INSERT INTO ${this.tableName} (document_type_id, document_number, producer_name, farm_name, city, state, total_area, arable_area, vegetation_area)
        VALUES (
          (select document_type_id from document_type where document_name = 'CPF'),
          '999.999.999-99',
          'TINNOVA',
          'TINNOVA-FARM',
          'SÃO JOSÉ DOS CAMPOS',
          'SÃO PAULO',
          100.00,
          25.25,
          10.05
        )
        `
      );
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
