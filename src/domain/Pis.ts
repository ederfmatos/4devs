export class Pis {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): Pis {
    const digits = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 10),
    );

    const digit = Pis.calculateDigit(digits);
    digits.push(digit);

    return new Pis(digits.join(''));
  }

  static generateMultiple(count: number): Pis[] {
    return Array.from({ length: count }, () => Pis.generate());
  }

  private static calculateDigit(digits: number[]): number {
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;

    for (let i = 0; i < 10; i++) {
      sum += digits[i] * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(this.value)) return false;

    const expectedDigit = Pis.calculateDigit(digits.slice(0, 10));
    return digits[10] === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 11) return this.value;

    return `${digits.slice(0, 3)}.${digits.slice(3, 8)}.${digits.slice(8, 10)}-${digits.slice(10)}`;
  }

  getDigits(): string {
    return this.value;
  }
}
