export class Renavam {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): Renavam {
    const digits = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10),
    );

    const digit = Renavam.calculateDigit(digits);
    digits.push(digit);

    return new Renavam(digits.join(''));
  }

  static generateMultiple(count: number): Renavam[] {
    return Array.from({ length: count }, () => Renavam.generate());
  }

  private static calculateDigit(digits: number[]): number {
    let sum = 0;
    let weight = 2;

    for (let i = 9; i >= 0; i--) {
      sum += digits[i] * weight;
      weight++;
      if (weight > 9) weight = 2;
    }

    const remainder = sum % 11;
    return remainder === 0 || remainder === 1 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 11) return false;

    const expectedDigit = Renavam.calculateDigit(digits.slice(0, 10));
    return digits[10] === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 11) return this.value;

    return `${digits.slice(0, 4)}.${digits.slice(4, 7)}.${digits.slice(7, 10)}-${digits.slice(10)}`;
  }

  getDigits(): string {
    return this.value;
  }
}
