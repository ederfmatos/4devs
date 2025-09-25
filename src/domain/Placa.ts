export type PlacaType = 'normal' | 'mercosul';

export class Placa {
  private value: string;
  private type: PlacaType;

  constructor(value: string = '', type: PlacaType = 'normal') {
    this.value = value.replace(/[^A-Z0-9]/g, '').toUpperCase();
    this.type = type;
  }

  static generate(type: PlacaType = 'normal'): Placa {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (type === 'mercosul') {
      const firstLetters = Array.from(
        { length: 3 },
        () => letters[Math.floor(Math.random() * letters.length)],
      ).join('');

      const number = Math.floor(Math.random() * 10);

      const letter = letters[Math.floor(Math.random() * letters.length)];

      const lastNumbers = Array.from({ length: 2 }, () =>
        Math.floor(Math.random() * 10),
      ).join('');

      return new Placa(
        firstLetters + number + letter + lastNumbers,
        'mercosul',
      );
    } else {
      const firstLetters = Array.from(
        { length: 3 },
        () => letters[Math.floor(Math.random() * letters.length)],
      ).join('');

      const numbers = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 10),
      ).join('');

      return new Placa(firstLetters + numbers, 'normal');
    }
  }

  static generateMultiple(count: number, type: PlacaType = 'normal'): Placa[] {
    return Array.from({ length: count }, () => Placa.generate(type));
  }

  isValid(): boolean {
    if (this.type === 'mercosul') {
      return /^[A-Z]{3}\d[A-Z]\d{2}$/.test(this.value);
    } else {
      return /^[A-Z]{3}\d{4}$/.test(this.value);
    }
  }

  format(): string {
    if (this.type === 'mercosul') {
      if (this.value.length !== 7) return this.value;
      return `${this.value.slice(0, 3)}-${this.value.slice(3)}`;
    } else {
      if (this.value.length !== 7) return this.value;
      return `${this.value.slice(0, 3)}-${this.value.slice(3)}`;
    }
  }

  getType(): PlacaType {
    return this.type;
  }

  getValue(): string {
    return this.value;
  }

  isMercosul(): boolean {
    return this.type === 'mercosul';
  }
}
