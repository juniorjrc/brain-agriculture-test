import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone'
import BrainAgricultureExceptionData from './BrainAgricultureExceptionData';

export default class BrainAgricultureUnprocessableEntityException extends Exception {
    public code = "UNPROCESSABLE_ENTITY";

    public async handle(error: this, ctx: HttpContextContract) {
      return ctx.response
        .status(422)
        .send(new BrainAgricultureExceptionData(error, 422));
    }
}
