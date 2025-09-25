export class Imei {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): Imei {
    const digits = Array.from({ length: 14 }, () =>
      Math.floor(Math.random() * 10),
    );

    const digit = Imei.calculateDigit(digits);
    digits.push(digit);

    return new Imei(digits.join(''));
  }

  static generateMultiple(count: number): Imei[] {
    return Array.from({ length: count }, () => Imei.generate());
  }

  private static calculateDigit(digits: number[]): number {
    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let digit = digits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      sum += digit;
    }

    return (10 - (sum % 10)) % 10;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 15) return false;

    const expectedDigit = Imei.calculateDigit(digits.slice(0, 14));
    return digits[14] === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 15) return this.value;

    return `${digits.slice(0, 2)} ${digits.slice(2, 8)} ${digits.slice(8, 14)} ${digits.slice(14)}`;
  }

  getTAC(): string {
    return this.value.slice(0, 8);
  }

  getSNR(): string {
    return this.value.slice(8, 14);
  }

  getCheckDigit(): string {
    return this.value.slice(14);
  }

  getDigits(): string {
    return this.value;
  }
}
