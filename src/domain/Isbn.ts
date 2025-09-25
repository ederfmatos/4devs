export type IsbnType = 'isbn10' | 'isbn13';

export class Isbn {
  private value: string;
  private type: IsbnType;

  constructor(value: string = '', type: IsbnType = 'isbn13') {
    this.value = value.replace(/\D/g, '');
    this.type = type;
  }

  static generate(type: IsbnType = 'isbn13'): Isbn {
    if (type === 'isbn10') {
      const digits = Array.from({ length: 9 }, () =>
        Math.floor(Math.random() * 10),
      );

      const digit = Isbn.calculateIsbn10Digit(digits);
      const digitValue = digit === 10 ? 'X' : digit.toString();
      digits.push(digitValue as unknown as number);

      return new Isbn(digits.join(''), 'isbn10');
    } else {
      const prefix = '978';
      const group = Math.floor(Math.random() * 99)
        .toString()
        .padStart(2, '0');
      const publisher = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 10),
      ).join('');
      const title = Array.from({ length: 2 }, () =>
        Math.floor(Math.random() * 10),
      ).join('');

      const sequence = prefix + group + publisher + title;
      const digit = Isbn.calculateIsbn13Digit(sequence);

      return new Isbn(sequence + digit, 'isbn13');
    }
  }

  static generateMultiple(count: number, type: IsbnType = 'isbn13'): Isbn[] {
    return Array.from({ length: count }, () => Isbn.generate(type));
  }

  private static calculateIsbn10Digit(digits: number[]): number {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += digits[i] * (10 - i);
    }
    const remainder = sum % 11;
    return remainder === 0 ? 0 : 11 - remainder;
  }

  private static calculateIsbn13Digit(sequence: string): number {
    const digits = sequence.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += digits[i] * (i % 2 === 0 ? 1 : 3);
    }
    return (10 - (sum % 10)) % 10;
  }

  isValid(): boolean {
    if (this.type === 'isbn10') {
      if (this.value.length !== 10) return false;

      const digits = this.value.slice(0, 9).split('').map(Number);
      const lastChar = this.value[9];
      const expectedDigit = Isbn.calculateIsbn10Digit(digits);

      return (
        (expectedDigit === 10 && lastChar === 'X') ||
        expectedDigit.toString() === lastChar
      );
    } else {
      if (this.value.length !== 13) return false;

      const sequence = this.value.substring(0, 12);
      const digit = parseInt(this.value[12]);
      const expectedDigit = Isbn.calculateIsbn13Digit(sequence);

      return digit === expectedDigit;
    }
  }

  format(): string {
    if (this.type === 'isbn10') {
      if (this.value.length !== 10) return this.value;
      return `${this.value.slice(0, 1)}-${this.value.slice(1, 3)}-${this.value.slice(3, 9)}-${this.value.slice(9)}`;
    } else {
      if (this.value.length !== 13) return this.value;
      return `${this.value.slice(0, 3)}-${this.value.slice(3, 5)}-${this.value.slice(5, 9)}-${this.value.slice(9, 12)}-${this.value.slice(12)}`;
    }
  }

  getType(): IsbnType {
    return this.type;
  }

  getValue(): string {
    return this.value;
  }
}
