export class Iban {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\s/g, '').toUpperCase();
  }

  static generate(countryCode: string = 'BR'): Iban {
    const bankCode = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const accountNumber = Array.from({ length: 13 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const bban = bankCode + accountNumber;
    const checkDigits = Iban.calculateCheckDigits(countryCode, bban);

    return new Iban(countryCode + checkDigits + bban);
  }

  static generateMultiple(count: number, countryCode: string = 'BR'): Iban[] {
    return Array.from({ length: count }, () => Iban.generate(countryCode));
  }

  private static calculateCheckDigits(
    countryCode: string,
    bban: string,
  ): string {
    const rearranged = bban + countryCode + '00';
    let numericString = '';

    for (const char of rearranged) {
      if (/[A-Z]/.test(char)) {
        numericString += (char.charCodeAt(0) - 55).toString();
      } else {
        numericString += char;
      }
    }

    let remainder = 0;
    for (const digit of numericString) {
      remainder = (remainder * 10 + parseInt(digit)) % 97;
    }

    const checkDigits = 98 - remainder;
    return checkDigits.toString().padStart(2, '0');
  }

  isValid(): boolean {
    if (this.value.length < 15 || this.value.length > 34) return false;

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(this.value)) return false;

    const rearranged = this.value.substring(4) + this.value.substring(0, 4);
    let numericString = '';

    for (const char of rearranged) {
      if (/[A-Z]/.test(char)) {
        numericString += (char.charCodeAt(0) - 55).toString();
      } else {
        numericString += char;
      }
    }

    let remainder = 0;
    for (const digit of numericString) {
      remainder = (remainder * 10 + parseInt(digit)) % 97;
    }

    return remainder === 1;
  }

  format(): string {
    if (this.value.length < 4) return this.value;
    return this.value.replace(/(.{4})/g, '$1 ').trim();
  }

  getCountryCode(): string {
    return this.value.substring(0, 2);
  }

  getCheckDigits(): string {
    return this.value.substring(2, 4);
  }

  getBBAN(): string {
    return this.value.substring(4);
  }

  getValue(): string {
    return this.value;
  }
}
