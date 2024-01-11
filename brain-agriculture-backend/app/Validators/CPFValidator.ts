export default class CPFValidator {
  public static validate(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
    
    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf[i - 1]) * (11 - i);
    }

    let remainder = (sum * 10) % 11;
    remainder = remainder === 10 ? 0 : remainder;

    if (remainder !== parseInt(cpf[9])) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf[i - 1]) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    remainder = remainder === 10 ? 0 : remainder;

    if (remainder !== parseInt(cpf[10])) {
      return false;
    }

    return true;
  }
}
