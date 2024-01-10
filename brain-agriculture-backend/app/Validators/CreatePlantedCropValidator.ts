import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePlantedCropValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    plantedCropName: schema.string({}, [rules.maxLength(20)])
  })

  public messages: CustomMessages = {
    'plantedCropName.maxLength': 'The plantedCropName field must have a maximum of 20 characters.'
  }
}
