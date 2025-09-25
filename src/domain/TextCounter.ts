export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  averageWordsPerSentence: number;
  averageCharactersPerWord: number;
  readingTime: number;
}

export class TextCounter {
  private text: string;

  constructor(text: string = '') {
    this.text = text;
  }

  static analyze(text: string): TextStats {
    const counter = new TextCounter(text);
    return counter.getStats();
  }

  getStats(): TextStats {
    const characters = this.text.length;
    const charactersNoSpaces = this.text.replace(/\s/g, '').length;
    const words = this.countWords();
    const sentences = this.countSentences();
    const paragraphs = this.countParagraphs();
    const lines = this.countLines();
    const averageWordsPerSentence =
      sentences > 0 ? Math.round((words / sentences) * 100) / 100 : 0;
    const averageCharactersPerWord =
      words > 0 ? Math.round((charactersNoSpaces / words) * 100) / 100 : 0;
    const readingTime = Math.ceil(words / 200);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      averageWordsPerSentence,
      averageCharactersPerWord,
      readingTime,
    };
  }

  private countWords(): number {
    if (!this.text.trim()) return 0;
    return this.text.trim().split(/\s+/).length;
  }

  private countSentences(): number {
    if (!this.text.trim()) return 0;
    return this.text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  }

  private countParagraphs(): number {
    if (!this.text.trim()) return 0;
    return this.text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  }

  private countLines(): number {
    if (!this.text.trim()) return 0;
    return this.text.split('\n').length;
  }

  getText(): string {
    return this.text;
  }

  setText(text: string): void {
    this.text = text;
  }
}
