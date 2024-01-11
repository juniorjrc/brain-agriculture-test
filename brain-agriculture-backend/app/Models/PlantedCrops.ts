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
    localKey: "plantedCropId",
    pivotForeignKey: "planted_crop_id",
    relatedKey: "producerId",
    pivotRelatedForeignKey: "producer_id",
  })
  public producers: ManyToMany<typeof Producer>;
}
