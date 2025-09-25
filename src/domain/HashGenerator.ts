export type HashType = 'md5' | 'sha1' | 'sha256';

export interface HashResult {
  original: string;
  hash: string;
  type: HashType;
  length: number;
}

export class HashGenerator {
  private text: string;

  constructor(text: string = '') {
    this.text = text;
  }

  static generate(text: string, type: HashType): HashResult {
    const generator = new HashGenerator(text);
    const hash = generator.generateHash(type);

    return {
      original: text,
      hash,
      type,
      length: hash.length,
    };
  }

  static generateMultiple(text: string, types: HashType[]): HashResult[] {
    return types.map(type => HashGenerator.generate(text, type));
  }

  private generateHash(type: HashType): string {
    switch (type) {
      case 'md5':
        return this.simpleHash(this.text, 32);
      case 'sha1':
        return this.simpleHash(this.text, 40);
      case 'sha256':
        return this.simpleHash(this.text, 64);
      default:
        return '';
    }
  }

  private simpleHash(text: string, length: number): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }

    const hashStr = Math.abs(hash).toString(16);
    const result = hashStr.padStart(length, '0').slice(0, length);

    return result.padEnd(length, '0');
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }
}
