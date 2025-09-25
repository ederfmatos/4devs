export type NumberBase = 'decimal' | 'binary' | 'hexadecimal' | 'roman';

export interface ConversionResult {
  decimal: string;
  binary: string;
  hexadecimal: string;
  roman: string;
  isValid: boolean;
  error?: string;
}

export class NumberConverter {
  private value: string;
  private base: NumberBase;

  constructor(value: string = '', base: NumberBase = 'decimal') {
    this.value = value.trim();
    this.base = base;
  }

  static convert(value: string, fromBase: NumberBase): ConversionResult {
    const converter = new NumberConverter(value, fromBase);
    return converter.convertToAll();
  }

  convertToAll(): ConversionResult {
    try {
      const decimalValue = this.toDecimal();

      if (decimalValue < 0 || decimalValue > 3999) {
        return {
          decimal: '',
          binary: '',
          hexadecimal: '',
          roman: '',
          isValid: false,
          error: 'Número deve estar entre 0 e 3999 para conversão romana',
        };
      }

      return {
        decimal: decimalValue.toString(),
        binary: decimalValue.toString(2),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
        roman: this.toRoman(decimalValue),
        isValid: true,
      };
    } catch (error) {
      return {
        decimal: '',
        binary: '',
        hexadecimal: '',
        roman: '',
        isValid: false,
        error: error instanceof Error ? error.message : 'Erro na conversão',
      };
    }
  }

  private toDecimal(): number {
    switch (this.base) {
      case 'decimal': {
        const decimal = parseInt(this.value, 10);
        if (isNaN(decimal)) throw new Error('Número decimal inválido');
        return decimal;
      }

      case 'binary':
        if (!/^[01]+$/.test(this.value))
          throw new Error('Número binário deve conter apenas 0 e 1');
        return parseInt(this.value, 2);

      case 'hexadecimal':
        if (!/^[0-9A-Fa-f]+$/.test(this.value))
          throw new Error('Número hexadecimal inválido');
        return parseInt(this.value, 16);

      case 'roman':
        return this.fromRoman(this.value.toUpperCase());

      default:
        throw new Error('Base não suportada');
    }
  }

  private toRoman(num: number): string {
    if (num <= 0 || num > 3999) return '';

    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I',
    ];

    let result = '';
    for (let i = 0; i < values.length; i++) {
      while (num >= values[i]) {
        result += symbols[i];
        num -= values[i];
      }
    }

    return result;
  }

  private fromRoman(roman: string): number {
    if (!/^[IVXLCDM]+$/.test(roman)) throw new Error('Número romano inválido');

    const values: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let result = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const currentValue = values[roman[i]];
      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }
      prevValue = currentValue;
    }

    if (result <= 0 || result > 3999)
      throw new Error('Número romano fora do intervalo válido');

    return result;
  }

  getValue(): string {
    return this.value;
  }

  getBase(): NumberBase {
    return this.base;
  }

  setValue(value: string): void {
    this.value = value.trim();
  }

  setBase(base: NumberBase): void {
    this.base = base;
  }
}
