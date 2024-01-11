export default class CNPJValidator {
  public static validate(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, "");

    if (cnpj.length !== 14) {
      return false;
    }

    // first digit validator
    let sum = 0;
    let length = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj[i]) * length--;
      if (length < 2) {
        length = 9;
      }
    }
    let remainder = sum % 11;
    let checkDigit1 = remainder < 2 ? 0 : 11 - remainder;

    if (checkDigit1 !== parseInt(cnpj[12])) {
      return false;
    }

    // second digit validator
    sum = 0;
    length = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj[i]) * length--;
      if (length < 2) {
        length = 9;
      }
    }
    remainder = sum % 11;
    let checkDigit2 = remainder < 2 ? 0 : 11 - remainder;

    if (checkDigit2 !== parseInt(cnpj[13])) {
      return false;
    }

    return true;
  }
}
