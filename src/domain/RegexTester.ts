export interface RegexMatch {
  match: string;
  index: number;
  groups?: string[];
}

export interface RegexTestResult {
  isValid: boolean;
  matches: RegexMatch[];
  error?: string;
}

export class RegexTester {
  private pattern: string;
  private flags: string;
  private text: string;

  constructor(pattern: string = '', flags: string = 'g', text: string = '') {
    this.pattern = pattern;
    this.flags = flags;
    this.text = text;
  }

  test(): RegexTestResult {
    if (!this.pattern) {
      return {
        isValid: false,
        matches: [],
        error: 'Pattern não pode estar vazio',
      };
    }

    try {
      const regex = new RegExp(this.pattern, this.flags);
      const matches: RegexMatch[] = [];

      if (this.flags.includes('g')) {
        let match;
        while ((match = regex.exec(this.text)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });

          if (match.index === regex.lastIndex) {
            break;
          }
        }
      } else {
        const match = regex.exec(this.text);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return {
        isValid: true,
        matches,
      };
    } catch (error) {
      return {
        isValid: false,
        matches: [],
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  highlightMatches(): string {
    const result = this.test();
    if (!result.isValid || result.matches.length === 0) {
      return this.text;
    }

    let highlightedText = this.text;
    let offset = 0;

    result.matches.forEach(match => {
      const startTag = '<mark>';
      const endTag = '</mark>';
      const start = match.index + offset;
      const end = start + match.match.length;

      highlightedText =
        highlightedText.slice(0, start) +
        startTag +
        highlightedText.slice(start, end) +
        endTag +
        highlightedText.slice(end);

      offset += startTag.length + endTag.length;
    });

    return highlightedText;
  }

  getPattern(): string {
    return this.pattern;
  }

  getFlags(): string {
    return this.flags;
  }

  getText(): string {
    return this.text;
  }

  setPattern(pattern: string): void {
    this.pattern = pattern;
  }

  setFlags(flags: string): void {
    this.flags = flags;
  }

  setText(text: string): void {
    this.text = text;
  }
}
