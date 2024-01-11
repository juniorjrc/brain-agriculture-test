import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BrainAgricultureNotFoundException from "App/Exceptions/BrainAgricultureNotFoundException";
import DocumentType from "App/Models/DocumentType";

export default class DocumentTypeController {
  /**
   * Find all document types
   * @returns {DocumentType[]}
   */
  public async findAll({ response }: HttpContextContract) {
    const documentTypes = await DocumentType.query()
      .orderBy("documentName")
      .select("*");
    return response.ok({ documentTypes });
  }

  /**
   * Find document type by id
   * @param {HttpContextContract} params - params received in URL path variable
   * @returns {DocumentType}
   */
  public async findById({ params, response }: HttpContextContract) {
    const { id } = params;
    const documentType = await DocumentType.findBy("documentTypeId", id);
    if (!documentType)
      throw new BrainAgricultureNotFoundException("Document type not found");
    return response.ok({ documentType });
  }
}
