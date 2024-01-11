import { schema, rules, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

const CPF = 1;

export default class CreateProducerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    documentTypeId: schema.number([
      rules.exists({
        table: "document_type",
        column: "document_type_id",
      }),
    ]),
    documentNumber: schema.string({}, [
      rules.maxLength(20),
      this.ctx.request.all()["documentTypeId"] === CPF ? rules.cpf(): rules.cnpj()
    ]),
    producerName: schema.string({}, [rules.maxLength(150)]),
    farmName: schema.string({}, [rules.maxLength(150)]),
    arableArea: schema.number(),
    vegetationArea: schema.number(),
    totalArea: schema.number([
      rules.totalArea(
        this.ctx.request.input("arableArea"),
        this.ctx.request.input("vegetationArea")
      )
    ])
  });

  public messages: CustomMessages = {
    "documentNumber.maxLength":
      "The documentNumber field must have a maximum of 15 characters.",
    "documentTypeId.exists": "Unrecognized documentTypeId",
    "producerName.maxLength":
      "The producerName field must have a maximum of 150 characters.",
    "farmName.maxLength":
      "The farmName field must have a maximum of 150 characters.",
  };
}
