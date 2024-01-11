declare module "@ioc:Adonis/Core/Validator" {
  interface Rules {
    cpf(): Rule;
    cnpj(): Rule;
    totalArea(
      arableArea: number,
      vegetationArea: number
    ): Rule;
  }
}
