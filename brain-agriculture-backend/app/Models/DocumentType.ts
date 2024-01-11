import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class DocumentType extends BaseModel {
  public static table = "document_type";
  
  @column({ isPrimary: true, serializeAs: "documentTypeId" })
  public documentTypeId: number;

  @column({ serializeAs: "documentName" })
  public documentName: string;
}
