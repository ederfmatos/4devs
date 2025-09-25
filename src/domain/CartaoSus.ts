export class CartaoSus {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): CartaoSus {
    const firstDigit = Math.random() < 0.5 ? 1 : 2;
    const digits = [
      firstDigit,
      ...Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)),
    ];

    const checkDigit = CartaoSus.calculateDigit(digits);
    digits.push(checkDigit);

    const finalDigits = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * 10),
    );

    return new CartaoSus([...digits, ...finalDigits].join(''));
  }

  static generateMultiple(count: number): CartaoSus[] {
    return Array.from({ length: count }, () => CartaoSus.generate());
  }

  private static calculateDigit(digits: number[]): number {
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += digits[i] * (15 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 15) return false;

    if (!/^[1-2]/.test(this.value)) return false;

    const sequence = digits.slice(0, 11);
    const expectedDigit = CartaoSus.calculateDigit(sequence);

    return digits[11] === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 15) return this.value;

    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)} ${digits.slice(11)}`;
  }

  getDigits(): string {
    return this.value;
  }
}
