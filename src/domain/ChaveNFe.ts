export class ChaveNFe {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): ChaveNFe {
    const uf = Math.floor(Math.random() * 27) + 11;
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (Math.floor(Math.random() * 12) + 1)
      .toString()
      .padStart(2, '0');

    const cnpj = Array.from({ length: 14 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const model = '55';
    const series = Math.floor(Math.random() * 999) + 1;
    const seriesStr = series.toString().padStart(3, '0');

    const number = Math.floor(Math.random() * 999999999) + 1;
    const numberStr = number.toString().padStart(9, '0');

    const emission = '1';

    const code = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const sequence = `${uf}${year}${month}${cnpj}${model}${seriesStr}${numberStr}${emission}${code}`;
    const digit = ChaveNFe.calculateDigit(sequence);

    return new ChaveNFe(sequence + digit);
  }

  static generateMultiple(count: number): ChaveNFe[] {
    return Array.from({ length: count }, () => ChaveNFe.generate());
  }

  private static calculateDigit(sequence: string): number {
    const digits = sequence.split('').map(Number);
    let sum = 0;
    let weight = 2;

    for (let i = 42; i >= 0; i--) {
      sum += digits[i] * weight;
      weight++;
      if (weight > 9) weight = 2;
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 44) return false;

    const sequence = this.value.substring(0, 43);
    const digit = parseInt(this.value[43]);
    const expectedDigit = ChaveNFe.calculateDigit(sequence);

    return digit === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 44) return this.value;

    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  getUF(): string {
    return this.value.substring(0, 2);
  }

  getYear(): string {
    return this.value.substring(2, 4);
  }

  getMonth(): string {
    return this.value.substring(4, 6);
  }

  getCNPJ(): string {
    return this.value.substring(6, 20);
  }

  getModel(): string {
    return this.value.substring(20, 22);
  }

  getSeries(): string {
    return this.value.substring(22, 25);
  }

  getNumber(): string {
    return this.value.substring(25, 34);
  }

  getDigits(): string {
    return this.value;
  }
}
