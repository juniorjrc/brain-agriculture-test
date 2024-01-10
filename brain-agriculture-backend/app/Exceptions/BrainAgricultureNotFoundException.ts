import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BrainAgricultureExceptionData from './BrainAgricultureExceptionData';

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BrainAgricultureNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BrainAgricultureNotFoundException extends Exception {
    public code = "NOT_FOUND";

    public async handle(error: this, ctx: HttpContextContract) {
      return ctx.response
        .status(404)
        .send(new BrainAgricultureExceptionData(error, 404));
    }
}
