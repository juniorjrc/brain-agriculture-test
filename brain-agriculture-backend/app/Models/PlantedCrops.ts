import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Producer from "./Producer";

export default class PlantedCrops extends BaseModel {
  @column({ isPrimary: true, serializeAs: "plantedCropId" })
  public plantedCropId: number;

  @column({ serializeAs: "plantedCropName" })
  public plantedCropName: string;

  @manyToMany(() => Producer, {
    pivotTable: "producer_planted_crops",
  })
  public producers: ManyToMany<typeof Producer>;
}
