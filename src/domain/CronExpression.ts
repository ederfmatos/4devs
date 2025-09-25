export interface CronField {
  name: string;
  value: string;
  description: string;
  isValid: boolean;
  error?: string;
}

export interface CronValidation {
  isValid: boolean;
  fields: CronField[];
  description: string;
  nextRuns?: Date[];
}

export class CronExpression {
  private expression: string;

  constructor(expression: string = '') {
    this.expression = expression.trim();
  }

  static generate(
    minute?: string,
    hour?: string,
    dayOfMonth?: string,
    month?: string,
    dayOfWeek?: string,
  ): CronExpression {
    const parts = [
      minute || '*',
      hour || '*',
      dayOfMonth || '*',
      month || '*',
      dayOfWeek || '*',
    ];

    return new CronExpression(parts.join(' '));
  }

  static generateCommon(
    type: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly',
  ): CronExpression {
    const expressions = {
      hourly: '0 * * * *',
      daily: '0 0 * * *',
      weekly: '0 0 * * 0',
      monthly: '0 0 1 * *',
      yearly: '0 0 1 1 *',
    };

    return new CronExpression(expressions[type]);
  }

  validate(): CronValidation {
    const parts = this.expression.split(/\s+/);

    if (parts.length !== 5) {
      return {
        isValid: false,
        fields: [],
        description: 'Expressão cron deve ter 5 campos separados por espaço',
      };
    }

    const fieldDefinitions = [
      { name: 'Minuto', min: 0, max: 59, index: 0 },
      { name: 'Hora', min: 0, max: 23, index: 1 },
      { name: 'Dia do Mês', min: 1, max: 31, index: 2 },
      { name: 'Mês', min: 1, max: 12, index: 3 },
      { name: 'Dia da Semana', min: 0, max: 7, index: 4 },
    ];

    const fields: CronField[] = [];
    let allValid = true;

    fieldDefinitions.forEach(field => {
      const value = parts[field.index];
      const validation = this.validateField(
        value,
        field.min,
        field.max,
        field.name,
      );

      fields.push({
        name: field.name,
        value,
        description: validation.description,
        isValid: validation.isValid,
        error: validation.error,
      });

      if (!validation.isValid) {
        allValid = false;
      }
    });

    const description = allValid
      ? this.generateDescription(parts)
      : 'Expressão inválida';

    return {
      isValid: allValid,
      fields,
      description,
      nextRuns: allValid ? this.calculateNextRuns() : undefined,
    };
  }

  private validateField(
    value: string,
    min: number,
    max: number,
    fieldName: string,
  ) {
    if (value === '*') {
      return {
        isValid: true,
        description: `Qualquer ${fieldName.toLowerCase()}`,
      };
    }

    if (value.includes('/')) {
      const [, step] = value.split('/');
      const stepNum = parseInt(step);
      if (isNaN(stepNum) || stepNum <= 0) {
        return {
          isValid: false,
          description: '',
          error: 'Passo inválido',
        };
      }
      return {
        isValid: true,
        description: `A cada ${stepNum} ${fieldName.toLowerCase()}(s)`,
      };
    }

    if (value.includes('-')) {
      const [start, end] = value.split('-').map(Number);
      if (
        isNaN(start) ||
        isNaN(end) ||
        start < min ||
        end > max ||
        start > end
      ) {
        return {
          isValid: false,
          description: '',
          error: `Intervalo inválido (${min}-${max})`,
        };
      }
      return {
        isValid: true,
        description: `De ${start} até ${end}`,
      };
    }

    if (value.includes(',')) {
      const values = value.split(',').map(Number);
      const invalid = values.some(v => isNaN(v) || v < min || v > max);
      if (invalid) {
        return {
          isValid: false,
          description: '',
          error: `Valores inválidos (${min}-${max})`,
        };
      }
      return {
        isValid: true,
        description: `Valores específicos: ${values.join(', ')}`,
      };
    }

    const num = parseInt(value);
    if (isNaN(num) || num < min || num > max) {
      return {
        isValid: false,
        description: '',
        error: `Deve estar entre ${min} e ${max}`,
      };
    }

    return {
      isValid: true,
      description: `Valor específico: ${num}`,
    };
  }

  private generateDescription(parts: string[]): string {
    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

    if (this.expression === '0 * * * *') return 'A cada hora';
    if (this.expression === '0 0 * * *') return 'Diariamente à meia-noite';
    if (this.expression === '0 0 * * 0')
      return 'Semanalmente aos domingos à meia-noite';
    if (this.expression === '0 0 1 * *')
      return 'Mensalmente no dia 1º à meia-noite';
    if (this.expression === '0 0 1 1 *')
      return 'Anualmente no dia 1º de janeiro à meia-noite';

    let description = 'Executa ';

    if (minute !== '*') description += `no minuto ${minute} `;
    if (hour !== '*') description += `na hora ${hour} `;
    if (dayOfMonth !== '*') description += `no dia ${dayOfMonth} `;
    if (month !== '*') description += `no mês ${month} `;
    if (dayOfWeek !== '*') description += `no dia da semana ${dayOfWeek} `;

    return description.trim();
  }

  private calculateNextRuns(): Date[] {
    const now = new Date();
    const runs: Date[] = [];

    for (let i = 0; i < 5; i++) {
      const nextRun = new Date(now.getTime() + (i + 1) * 60 * 60 * 1000);
      runs.push(nextRun);
    }

    return runs;
  }

  getExpression(): string {
    return this.expression;
  }

  setExpression(expression: string): void {
    this.expression = expression.trim();
  }
}
