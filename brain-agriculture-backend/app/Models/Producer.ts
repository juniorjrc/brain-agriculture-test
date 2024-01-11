import {
  BaseModel,
  BelongsTo,
  HasOne,
  ManyToMany,
  belongsTo,
  column,
  hasOne,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import DocumentType from "./DocumentType";
import PlantedCrops from "./PlantedCrops";

export default class Producer extends BaseModel {
  public static table = "producer";

  @column({ isPrimary: true, serializeAs: "producerId" })
  public producerId: number;

  @column({ serializeAs: null })
  public documentTypeId: string;

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
  public atableArea: string;

  @column({ serializeAs: "vegetationArea" })
  public vegetationArea: string;

  @manyToMany(() => PlantedCrops, {
    pivotTable: "producer_planted_crops",
  })
  public plantedCrops: ManyToMany<typeof PlantedCrops>;
}
