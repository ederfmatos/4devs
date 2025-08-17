export class Cep {
  private value: string;

  constructor(value: string = '') {
    this.value = value.replace(/\D/g, '');
  }

  /**
   * Cria uma instância de CEP com valor aleatório
   */
  static generate(): Cep {
    const numbers = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10)
    );
    return new Cep(numbers.join(''));
  }

  /**
   * Gera múltiplos CEPs aleatórios
   */
  static generateMultiple(count: number): Cep[] {
    return Array.from({ length: count }, () => Cep.generate());
  }

  /**
   * Formata o CEP no padrão XXXXX-XXX
   */
  format(): string {
    const numbers = this.value;
    if (numbers.length > 8) return numbers.substring(0, 8);
    if (numbers.length > 5) {
      return numbers.substring(0, 5) + '-' + numbers.substring(5);
    }
    return numbers;
  }

  /**
   * Valida se o CEP é válido
   */
  isValid(): boolean {
    return this.value.length === 8 && /^\d{8}$/.test(this.value);
  }
}
