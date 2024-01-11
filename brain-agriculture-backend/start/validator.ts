/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from "@ioc:Adonis/Core/Validator";
import CNPJValidator from "App/Validators/CNPJValidator";
import CPFValidator from "App/Validators/CPFValidator";
import TotalAreaValidator from "App/Validators/TotalAreaValidator";

validator.rule("cpf", (value, _, options) => {
  if (!CPFValidator.validate(value)) {
    options.errorReporter.report(
      options.pointer,
      "cpf",
      "Invalid CPF",
      options.arrayExpressionPointer
    );
  }
});

validator.rule("cnpj", (value, _, options) => {
    if (!CNPJValidator.validate(value)) {
      options.errorReporter.report(
        options.pointer,
        "cnpj",
        "Invalid CNPJ",
        options.arrayExpressionPointer
      );
    }
  });

validator.rule("totalArea", (value, array: [number, number], options) => {
  const totalArea = parseFloat(value);
  const arableArea: number = Number(array[0]);
  const vegetationArea: number = Number(array[1]);

  if(!TotalAreaValidator.validate(totalArea, arableArea, vegetationArea)) {
    options.errorReporter.report(
      options.pointer,
      "totalArea",
      "The sum of the arable area plus the vegetable area is greater than the total area in hectares",
      options.arrayExpressionPointer
    )
  }
})
