import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import DocumentType from "./DocumentType";
import PlantedCrops from "./PlantedCrops";

export default class Producer extends BaseModel {
  public static table = "producer";

  @column({ isPrimary: true, serializeAs: "producerId" })
  public producerId: number;

  @column({ serializeAs: null })
  public documentTypeId: number;

  @belongsTo(() => DocumentType, {
    foreignKey: "documentTypeId",
  })
  public documentType: BelongsTo<typeof DocumentType>;

  @column({ serializeAs: "documentNumber" })
  public documentNumber: string;

  @column({ serializeAs: "producerName" })
  public producerName: string;

  @column({ serializeAs: "farmName" })
  public farmName: string;

  @column({ serializeAs: "city" })
  public city: string;

  @column({ serializeAs: "state" })
  public state: string;

  @column({ serializeAs: "totalArea" })
  public totalArea: number;

  @column({ serializeAs: "arableArea" })
  public arableArea: number;

  @column({ serializeAs: "vegetationArea" })
  public vegetationArea: number;

  @manyToMany(() => PlantedCrops, {
    pivotTable: "producer_planted_crops",
    localKey: "producerId",
    pivotForeignKey: "producer_id",
    relatedKey: "plantedCropId",
    pivotRelatedForeignKey: "planted_crop_id",
  })
  public plantedCrops: ManyToMany<typeof PlantedCrops>;
}
