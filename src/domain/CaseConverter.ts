export type CaseType =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'UPPER_CASE'
  | 'lower case';

export class CaseConverter {
  private text: string;

  constructor(text: string = '') {
    this.text = text;
  }

  static convert(text: string, targetCase: CaseType): string {
    const converter = new CaseConverter(text);

    switch (targetCase) {
      case 'camelCase':
        return converter.toCamelCase();
      case 'PascalCase':
        return converter.toPascalCase();
      case 'snake_case':
        return converter.toSnakeCase();
      case 'kebab-case':
        return converter.toKebabCase();
      case 'UPPER_CASE':
        return converter.toUpperCase();
      case 'lower case':
        return converter.toLowerCase();
      default:
        return text;
    }
  }

  static convertToAll(text: string): { [_key in CaseType]: string } {
    const converter = new CaseConverter(text);

    return {
      camelCase: converter.toCamelCase(),
      PascalCase: converter.toPascalCase(),
      snake_case: converter.toSnakeCase(),
      'kebab-case': converter.toKebabCase(),
      UPPER_CASE: converter.toUpperCase(),
      'lower case': converter.toLowerCase(),
    };
  }

  private normalizeText(): string[] {
    return this.text
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[_-]/g, ' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 0);
  }

  private toCamelCase(): string {
    const words = this.normalizeText();
    if (words.length === 0) return '';

    return (
      words[0] +
      words
        .slice(1)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  }

  private toPascalCase(): string {
    const words = this.normalizeText();
    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private toSnakeCase(): string {
    return this.normalizeText().join('_');
  }

  private toKebabCase(): string {
    return this.normalizeText().join('-');
  }

  private toUpperCase(): string {
    return this.normalizeText().join('_').toUpperCase();
  }

  private toLowerCase(): string {
    return this.normalizeText().join(' ');
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }
}
