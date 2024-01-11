import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PlantedCrops extends BaseModel {
  
  @column({ isPrimary: true, serializeAs: "plantedCropId" })
  public plantedCropId: number;

  @column({ serializeAs: "plantedCropName" })
  public plantedCropName: string;
}
