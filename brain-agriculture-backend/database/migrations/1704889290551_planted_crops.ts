import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PlantedCrops extends BaseSchema {
  protected tableName = 'planted_crops'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('planted_crop_id')
      table.string('planted_crop_name').notNullable().unique()
    })

    this.defer(async (db) => {
      await db.rawQuery(`INSERT INTO ${this.tableName} (planted_crop_name) VALUES ('Milho verde')`)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
