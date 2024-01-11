import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class DocumentTypes extends BaseSchema {
  protected tableName = "document_type";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("document_type_id");
      table.string("document_name").notNullable().unique();
    });

    this.defer(async (db) => {
      await db.rawQuery(
        `INSERT INTO ${this.tableName} (document_name) VALUES ('CPF'), ('CNPJ')`
      );
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
