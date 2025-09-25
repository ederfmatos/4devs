import { Cnpj } from './Cnpj';
import { Cpf } from './Cpf';

export type TipoChavePix = 'cpf' | 'cnpj' | 'email' | 'telefone' | 'aleatoria';

export class Pix {
  private value: string;
  private tipo: TipoChavePix;

  constructor(value: string = '', tipo: TipoChavePix = 'cpf') {
    this.value = value;
    this.tipo = tipo;
  }

  static generate(tipo: TipoChavePix = 'cpf'): Pix {
    let chave: string;

    switch (tipo) {
      case 'cpf':
        chave = Pix.generateCPF();
        break;
      case 'cnpj':
        chave = Pix.generateCNPJ();
        break;
      case 'email':
        chave = Pix.generateEmail();
        break;
      case 'telefone':
        chave = Pix.generateTelefone();
        break;
      case 'aleatoria':
        chave = Pix.generateChaveAleatoria();
        break;
      default:
        chave = Pix.generateCPF();
    }

    return new Pix(chave, tipo);
  }

  static generateMultiple(count: number, tipo: TipoChavePix = 'cpf'): Pix[] {
    return Array.from({ length: count }, () => Pix.generate(tipo));
  }

  private static generateCPF(): string {
    return Cpf.generate().getDigits();
  }

  private static generateCNPJ(): string {
    return Cnpj.generate().getDigits();
  }

  private static generateEmail(): string {
    const names = [
      'joao',
      'maria',
      'pedro',
      'ana',
      'carlos',
      'lucia',
      'jose',
      'fernanda',
    ];
    const domains = [
      'gmail.com',
      'hotmail.com',
      'yahoo.com.br',
      'outlook.com',
      'uol.com.br',
    ];

    const name = names[Math.floor(Math.random() * names.length)];
    const number = Math.floor(Math.random() * 999) + 1;
    const domain = domains[Math.floor(Math.random() * domains.length)];

    return `${name}${number}@${domain}`;
  }

  private static generateTelefone(): string {
    const ddd = Math.floor(Math.random() * 89) + 11;
    const firstDigit = Math.random() < 0.5 ? 9 : 8;
    const number = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    return `+55${ddd}${firstDigit}${number}`;
  }

  private static generateChaveAleatoria(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const segments = [8, 4, 4, 4, 12];

    return segments
      .map(length =>
        Array.from(
          { length },
          () => chars[Math.floor(Math.random() * chars.length)],
        ).join(''),
      )
      .join('-');
  }

  isValid(): boolean {
    switch (this.tipo) {
      case 'cpf':
        return this.isValidCPF();
      case 'cnpj':
        return this.isValidCNPJ();
      case 'email':
        return this.isValidEmail();
      case 'telefone':
        return this.isValidTelefone();
      case 'aleatoria':
        return this.isValidChaveAleatoria();
      default:
        return false;
    }
  }

  private isValidCPF(): boolean {
    return new Cpf(this.value).isValid();
  }

  private isValidCNPJ(): boolean {
    return new Cnpj(this.value).isValid();
  }

  private isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
  }

  private isValidTelefone(): boolean {
    const clean = this.value.replace(/\D/g, '');
    return /^55\d{2}[89]\d{8}$/.test(clean);
  }

  private isValidChaveAleatoria(): boolean {
    return /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/.test(
      this.value,
    );
  }

  format(): string {
    switch (this.tipo) {
      case 'cpf':
        return new Cpf(this.value).format();

      case 'cnpj':
        return new Cnpj(this.value).format();

      case 'telefone': {
        const tel = this.value.replace(/\D/g, '');
        if (tel.length !== 13) return this.value;
        return `+${tel.slice(0, 2)} (${tel.slice(2, 4)}) ${tel.slice(4, 5)} ${tel.slice(5, 9)}-${tel.slice(9)}`;
      }

      default:
        return this.value;
    }
  }

  getTipo(): TipoChavePix {
    return this.tipo;
  }

  getValue(): string {
    return this.value;
  }
}
