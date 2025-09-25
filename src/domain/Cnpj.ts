export class Cnpj {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  /**
   * Cria uma instância de CNPJ com valor aleatório
   */
  static generate(): Cnpj {
    const digits = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 10),
    );

    const firstDigit = Cnpj.calculateFirstDigit(digits);
    digits.push(firstDigit);

    const secondDigit = Cnpj.calculateSecondDigit(digits);
    digits.push(secondDigit);

    return new Cnpj(digits.join(''));
  }

  /**
   * Gera múltiplos CNPJs aleatórios
   */
  static generateMultiple(count: number): Cnpj[] {
    return Array.from({ length: count }, () => Cnpj.generate());
  }

  /**
   * Calcula o primeiro dígito verificador do CNPJ
   */
  private static calculateFirstDigit(digits: number[]): number {
    const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  /**
   * Calcula o segundo dígito verificador do CNPJ
   */
  private static calculateSecondDigit(digits: number[]): number {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += digits[i] * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  /**
   * Valida se o CNPJ é válido
   */
  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 14) return false;

    if (digits.every(digit => digit === digits[0])) return false;

    const firstDigit = Cnpj.calculateFirstDigit(digits.slice(0, 12));
    if (digits[12] !== firstDigit) return false;

    const secondDigit = Cnpj.calculateSecondDigit(digits.slice(0, 13));
    if (digits[13] !== secondDigit) return false;

    return true;
  }

  /**
   * Retorna detalhes da validação
   */
  validateWithDetails(): {
    isValid: boolean;
    errors: string[];
    steps: {
      step: string;
      passed: boolean;
      expected?: number;
      found?: number;
    }[];
  } {
    const digits = this.value.split('').map(Number);
    const errors: string[] = [];
    const steps: {
      step: string;
      passed: boolean;
      expected?: number;
      found?: number;
    }[] = [];

    const has14Digits = digits.length === 14;
    steps.push({
      step: 'CNPJ deve ter 14 dígitos',
      passed: has14Digits,
      expected: 14,
      found: digits.length,
    });
    if (!has14Digits) {
      errors.push(`CNPJ deve ter 14 dígitos, encontrado ${digits.length}`);
    }

    const allSame = digits.every(digit => digit === digits[0]);
    steps.push({
      step: 'CNPJ não pode ter todos os dígitos iguais',
      passed: !allSame,
    });
    if (allSame) {
      errors.push('CNPJ não pode ter todos os dígitos iguais');
    }

    if (has14Digits && !allSame) {
      const expectedFirstDigit = Cnpj.calculateFirstDigit(digits.slice(0, 12));
      const firstDigitValid = digits[12] === expectedFirstDigit;
      steps.push({
        step: 'Primeiro dígito verificador',
        passed: firstDigitValid,
        expected: expectedFirstDigit,
        found: digits[12],
      });
      if (!firstDigitValid) {
        errors.push(
          `Primeiro dígito verificador incorreto. Esperado: ${expectedFirstDigit}, Encontrado: ${digits[12]}`,
        );
      }

      if (firstDigitValid) {
        const expectedSecondDigit = Cnpj.calculateSecondDigit(
          digits.slice(0, 13),
        );
        const secondDigitValid = digits[13] === expectedSecondDigit;
        steps.push({
          step: 'Segundo dígito verificador',
          passed: secondDigitValid,
          expected: expectedSecondDigit,
          found: digits[13],
        });
        if (!secondDigitValid) {
          errors.push(
            `Segundo dígito verificador incorreto. Esperado: ${expectedSecondDigit}, Encontrado: ${digits[13]}`,
          );
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      steps,
    };
  }

  /**
   * Formata o CNPJ no padrão XX.XXX.XXX/XXXX-XX
   */
  format(): string {
    const digits = this.value;
    if (digits.length !== 14) return this.value;

    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  }

  /**
   * Retorna apenas os dígitos (sem formatação)
   */
  getDigits(): string {
    return this.value;
  }
}
