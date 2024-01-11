import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProducerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    documentTypeId: schema.number(),
    documentNumber: schema.string({}, [rules.maxLength(15)]),
    producerName: schema.string({}, [rules.maxLength(150)]),
    farmName: schema.string({}, [rules.maxLength(150)])
  })

  public messages: CustomMessages = {
    'documentNumber.maxLength': 'The documentNumber field must have a maximum of 15 characters.',
    'producerName.maxLength': 'The producerName field must have a maximum of 150 characters.',
    'farmName.maxLength': 'The farmName field must have a maximum of 150 characters.',
  }
}
