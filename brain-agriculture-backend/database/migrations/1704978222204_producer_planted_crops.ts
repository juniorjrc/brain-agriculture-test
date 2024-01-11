import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ProducerPlantedCrops extends BaseSchema {
  protected tableName = "producer_planted_crops";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("producer_planted_crop_id");
      table
        .integer("producer_id")
        .unsigned()
        .references("producer_id")
        .inTable("producer")
        .notNullable();
      table
        .integer("planted_crop_id")
        .unsigned()
        .references("planted_crop_id")
        .inTable("planted_crops")
        .notNullable();
    });

    this.defer(async (db) => {
      await db.rawQuery(
        `INSERT INTO ${this.tableName} (producer_id, planted_crop_id) VALUES
        (
          (SELECT producer_id FROM producer WHERE producer_name = 'TINNOVA'),
          (SELECT planted_crop_id FROM planted_crops WHERE planted_crop_name = 'Milho verde')
        )
        `
      );
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
