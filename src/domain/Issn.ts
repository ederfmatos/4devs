export class Issn {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): Issn {
    const digits = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 10),
    );

    const digit = Issn.calculateDigit(digits);
    const digitValue = digit === 10 ? 'X' : digit.toString();
    digits.push(digitValue as unknown as number);

    return new Issn(digits.join(''));
  }

  static generateMultiple(count: number): Issn[] {
    return Array.from({ length: count }, () => Issn.generate());
  }

  private static calculateDigit(digits: number[]): number {
    let sum = 0;
    for (let i = 0; i < 7; i++) {
      sum += digits[i] * (8 - i);
    }
    const remainder = sum % 11;
    return remainder === 0 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    if (this.value.length !== 8) return false;

    const digits = this.value.slice(0, 7).split('').map(Number);
    const lastChar = this.value[7];
    const expectedDigit = Issn.calculateDigit(digits);

    return (
      (expectedDigit === 10 && lastChar === 'X') ||
      expectedDigit.toString() === lastChar
    );
  }

  format(): string {
    if (this.value.length !== 8) return this.value;
    return `${this.value.slice(0, 4)}-${this.value.slice(4)}`;
  }

  getValue(): string {
    return this.value;
  }
}
