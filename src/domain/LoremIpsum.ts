export type LoremLanguage = 'latin' | 'portuguese' | 'english';

export class LoremIpsum {
  private language: LoremLanguage;

  constructor(language: LoremLanguage = 'latin') {
    this.language = language;
  }

  static generate(
    type: 'words' | 'sentences' | 'paragraphs',
    count: number,
    language: LoremLanguage = 'latin',
  ): string {
    const generator = new LoremIpsum(language);

    switch (type) {
      case 'words':
        return generator.generateWords(count);
      case 'sentences':
        return generator.generateSentences(count);
      case 'paragraphs':
        return generator.generateParagraphs(count);
      default:
        return '';
    }
  }

  private getWords(): string[] {
    const words = {
      latin: [
        'lorem',
        'ipsum',
        'dolor',
        'sit',
        'amet',
        'consectetur',
        'adipiscing',
        'elit',
        'sed',
        'do',
        'eiusmod',
        'tempor',
        'incididunt',
        'ut',
        'labore',
        'et',
        'dolore',
        'magna',
        'aliqua',
        'enim',
        'ad',
        'minim',
        'veniam',
        'quis',
        'nostrud',
        'exercitation',
        'ullamco',
        'laboris',
        'nisi',
        'aliquip',
        'ex',
        'ea',
        'commodo',
        'consequat',
        'duis',
        'aute',
        'irure',
        'in',
        'reprehenderit',
        'voluptate',
        'velit',
        'esse',
        'cillum',
        'fugiat',
        'nulla',
        'pariatur',
        'excepteur',
        'sint',
        'occaecat',
        'cupidatat',
        'non',
        'proident',
        'sunt',
        'culpa',
        'qui',
        'officia',
        'deserunt',
        'mollit',
        'anim',
        'id',
        'est',
        'laborum',
      ],
      portuguese: [
        'o',
        'que',
        'é',
        'um',
        'texto',
        'de',
        'exemplo',
        'para',
        'demonstrar',
        'como',
        'funciona',
        'este',
        'gerador',
        'de',
        'conteúdo',
        'em',
        'português',
        'brasileiro',
        'com',
        'palavras',
        'aleatórias',
        'e',
        'frases',
        'completas',
        'muito',
        'útil',
        'para',
        'testes',
        'desenvolvimento',
        'sistemas',
        'web',
        'aplicações',
        'móveis',
        'design',
        'layout',
        'interface',
        'usuário',
        'experiência',
        'navegação',
        'conteúdo',
        'informação',
        'dados',
        'processo',
        'resultado',
        'solução',
        'problema',
        'questão',
        'resposta',
        'pergunta',
      ],
      english: [
        'the',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'lazy',
        'dog',
        'this',
        'is',
        'sample',
        'text',
        'for',
        'testing',
        'purposes',
        'and',
        'demonstration',
        'of',
        'content',
        'generation',
        'in',
        'english',
        'language',
        'with',
        'random',
        'words',
        'sentences',
        'paragraphs',
        'very',
        'useful',
        'web',
        'development',
        'mobile',
        'applications',
        'design',
        'layout',
        'user',
        'interface',
        'experience',
        'navigation',
        'information',
        'data',
        'process',
        'result',
        'solution',
        'problem',
        'question',
        'answer',
        'response',
      ],
    };

    return words[this.language];
  }

  private generateWords(count: number): string {
    const words = this.getWords();
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }

    return result.join(' ');
  }

  private generateSentences(count: number): string {
    const sentences: string[] = [];

    for (let i = 0; i < count; i++) {
      const wordCount = Math.floor(Math.random() * 15) + 5;
      const words = this.generateWords(wordCount);
      const sentence = words.charAt(0).toUpperCase() + words.slice(1) + '.';
      sentences.push(sentence);
    }

    return sentences.join(' ');
  }

  private generateParagraphs(count: number): string {
    const paragraphs: string[] = [];

    for (let i = 0; i < count; i++) {
      const sentenceCount = Math.floor(Math.random() * 6) + 3;
      const paragraph = this.generateSentences(sentenceCount);
      paragraphs.push(paragraph);
    }

    return paragraphs.join('\n\n');
  }

  getLanguage(): LoremLanguage {
    return this.language;
  }

  setLanguage(language: LoremLanguage): void {
    this.language = language;
  }
}
