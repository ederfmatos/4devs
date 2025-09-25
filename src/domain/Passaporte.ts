export class Passaporte {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\s/g, '').toUpperCase();
  }

  static generate(): Passaporte {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const serie = Array.from(
      { length: 2 },
      () => letters[Math.floor(Math.random() * letters.length)],
    ).join('');

    const number = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    return new Passaporte(serie + number);
  }

  static generateMultiple(count: number): Passaporte[] {
    return Array.from({ length: count }, () => Passaporte.generate());
  }

  isValid(): boolean {
    return /^[A-Z]{2}\d{6}$/.test(this.value);
  }

  format(): string {
    if (this.value.length !== 8) return this.value;
    return `${this.value.slice(0, 2)} ${this.value.slice(2)}`;
  }

  getSerie(): string {
    return this.value.slice(0, 2);
  }

  getNumber(): string {
    return this.value.slice(2);
  }

  getValue(): string {
    return this.value;
  }
}
