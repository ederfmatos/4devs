export type BandeiraCartao =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'elo'
  | 'hipercard';

export class CartaoCredito {
  private value: string;
  private bandeira: BandeiraCartao;

  constructor(value: string = '', bandeira: BandeiraCartao = 'visa') {
    this.value = value.replace(/\D/g, '');
    this.bandeira = bandeira;
  }

  static generate(bandeira: BandeiraCartao = 'visa'): CartaoCredito {
    const prefixes = {
      visa: ['4'],
      mastercard: ['51', '52', '53', '54', '55'],
      amex: ['34', '37'],
      elo: ['636368', '438935', '504175'],
      hipercard: ['606282'],
    };

    const lengths = {
      visa: 16,
      mastercard: 16,
      amex: 15,
      elo: 16,
      hipercard: 16,
    };

    const prefix =
      prefixes[bandeira][Math.floor(Math.random() * prefixes[bandeira].length)];
    const length = lengths[bandeira];

    let number = prefix;
    while (number.length < length - 1) {
      number += Math.floor(Math.random() * 10).toString();
    }

    const digit = CartaoCredito.calculateLuhnDigit(number);
    number += digit.toString();

    return new CartaoCredito(number, bandeira);
  }

  static generateMultiple(
    count: number,
    bandeira: BandeiraCartao = 'visa',
  ): CartaoCredito[] {
    return Array.from({ length: count }, () =>
      CartaoCredito.generate(bandeira),
    );
  }

  private static calculateLuhnDigit(number: string): number {
    const digits = number.split('').map(Number);
    let sum = 0;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if ((digits.length - i) % 2 === 0) {
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

    if (digits.length < 13 || digits.length > 19) return false;

    let sum = 0;
    for (let i = digits.length - 2; i >= 0; i--) {
      let digit = digits[i];
      if ((digits.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      sum += digit;
    }

    const expectedDigit = (10 - (sum % 10)) % 10;
    return digits[digits.length - 1] === expectedDigit;
  }

  format(): string {
    const digits = this.value;
    if (this.bandeira === 'amex') {
      if (digits.length !== 15) return this.value;
      return `${digits.slice(0, 4)} ${digits.slice(4, 10)} ${digits.slice(10)}`;
    } else {
      if (digits.length !== 16) return this.value;
      return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)} ${digits.slice(12)}`;
    }
  }

  getBandeira(): BandeiraCartao {
    return this.bandeira;
  }

  getDigits(): string {
    return this.value;
  }

  detectBandeira(): BandeiraCartao {
    const number = this.value;

    if (/^4/.test(number)) return 'visa';
    if (/^5[1-5]/.test(number)) return 'mastercard';
    if (/^3[47]/.test(number)) return 'amex';
    if (/^(636368|438935|504175)/.test(number)) return 'elo';
    if (/^606282/.test(number)) return 'hipercard';

    return 'visa';
  }
}
