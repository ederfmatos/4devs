export class TituloEleitor {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  static generate(): TituloEleitor {
    const sequence = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    );

    const state = Math.floor(Math.random() * 29) + 1;
    const stateDigits = state.toString().padStart(2, '0').split('').map(Number);

    const firstDigit = TituloEleitor.calculateFirstDigit(sequence);
    const secondDigit = TituloEleitor.calculateSecondDigit(
      stateDigits,
      firstDigit,
    );

    const allDigits = [...sequence, ...stateDigits, firstDigit, secondDigit];
    return new TituloEleitor(allDigits.join(''));
  }

  static generateMultiple(count: number): TituloEleitor[] {
    return Array.from({ length: count }, () => TituloEleitor.generate());
  }

  private static calculateFirstDigit(sequence: number[]): number {
    const weights = [2, 3, 4, 5, 6, 7, 8, 9];
    let sum = 0;

    for (let i = 0; i < 8; i++) {
      sum += sequence[i] * weights[i];
    }

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  private static calculateSecondDigit(
    state: number[],
    firstDigit: number,
  ): number {
    const weights = [7, 8, 9];
    let sum = 0;

    sum += state[0] * weights[0];
    sum += state[1] * weights[1];
    sum += firstDigit * weights[2];

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  }

  isValid(): boolean {
    const digits = this.value.split('').map(Number);

    if (digits.length !== 12) return false;

    const sequence = digits.slice(0, 8);
    const state = digits.slice(8, 10);
    const checkDigits = digits.slice(10, 12);

    const expectedFirstDigit = TituloEleitor.calculateFirstDigit(sequence);
    const expectedSecondDigit = TituloEleitor.calculateSecondDigit(
      state,
      expectedFirstDigit,
    );

    return (
      checkDigits[0] === expectedFirstDigit &&
      checkDigits[1] === expectedSecondDigit
    );
  }

  format(): string {
    const digits = this.value;
    if (digits.length !== 12) return this.value;

    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
  }

  getDigits(): string {
    return this.value;
  }
}
