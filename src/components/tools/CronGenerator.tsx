import { Button, Icons, Text } from '@/components';
import { CronExpression, type CronValidation } from '@/domain';
import { useState } from 'react';

const CronGenerator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<
    CronValidation | { isValid: false; error: string } | null
  >(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  const commonExpressions = [
    { expression: '0 * * * *', description: 'A cada hora' },
    { expression: '0 0 * * *', description: 'Diariamente à meia-noite' },
    { expression: '0 0 * * 0', description: 'Semanalmente aos domingos' },
    { expression: '0 0 1 * *', description: 'Mensalmente no dia 1º' },
    { expression: '0 0 1 1 *', description: 'Anualmente no dia 1º de janeiro' },
    { expression: '*/5 * * * *', description: 'A cada 5 minutos' },
    { expression: '0 */2 * * *', description: 'A cada 2 horas' },
    { expression: '0 9 * * 1-5', description: 'Dias úteis às 9h' },
    { expression: '0 0 * * 1', description: 'Todas as segundas-feiras' },
    { expression: '30 14 * * *', description: 'Diariamente às 14:30' },
  ];

  const validateExpression = () => {
    if (!expression.trim()) {
      setResult({ isValid: false, error: 'Digite uma expressão cron' });
      return;
    }

    const cronExpression = new CronExpression(expression);
    const validation = cronExpression.validate();
    setResult(validation);
  };

  const loadExample = (expr: string) => {
    setExpression(expr);
    setResult(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Expressão copiada!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setExpression('');
    setResult(null);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador e Validador de Cron
        </Text>
        <Text variant='body-lg' color='secondary'>
          Crie e valide expressões cron para agendamento de tarefas
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Expressão Cron
        </Text>

        <input
          type='text'
          value={expression}
          onChange={e => setExpression(e.target.value)}
          placeholder='0 0 * * *'
          className='w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
        />
        <Text variant='caption' color='secondary' className='mt-2'>
          Formato: minuto hora dia-do-mês mês dia-da-semana
        </Text>

        <div className='flex gap-3 mt-4'>
          <Button
            onClick={validateExpression}
            icon='CheckCircle'
            variant='primary'
            size='lg'
            fullWidth
            disabled={!expression.trim()}
          >
            Validar Expressão
          </Button>

          <Button
            onClick={() => copyToClipboard(expression)}
            icon='Copy'
            variant='success'
            size='lg'
            fullWidth
            disabled={!expression.trim()}
          >
            Copiar
          </Button>

          <Button
            onClick={reset}
            icon='RotateCcw'
            variant='outline'
            size='lg'
            fullWidth
          >
            Resetar
          </Button>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Exemplos Comuns
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {commonExpressions.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(example.expression)}
              className='text-left p-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            >
              <Text
                variant='body-sm'
                className='font-mono text-blue-600 dark:text-blue-400'
              >
                {example.expression}
              </Text>
              <Text variant='caption' color='secondary' className='block'>
                {example.description}
              </Text>
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div
          className={`rounded-lg shadow-md p-6 border ${
            result.isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className='flex items-start gap-3 mb-4'>
            {result.isValid ? (
              <Icons.CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400 mt-0.5' />
            ) : (
              <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
            )}
            <div>
              <Text
                variant='h5'
                weight='medium'
                className={`mb-1 ${
                  result.isValid
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}
              >
                {result.isValid ? 'Expressão Válida' : 'Expressão Inválida'}
              </Text>
              <Text
                variant='body-sm'
                className={
                  result.isValid
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }
              >
                {'description' in result ? result.description : result.error}
              </Text>
            </div>
          </div>

          {result.isValid && 'fields' in result && result.fields && (
            <div>
              <Text variant='h6' weight='semibold' className='mb-3'>
                Detalhes dos Campos
              </Text>
              <div className='space-y-2'>
                {result.fields.map((field, index: number) => (
                  <div
                    key={index}
                    className='flex items-center gap-3 p-2 bg-white dark:bg-gray-700 rounded'
                  >
                    {field.isValid ? (
                      <Icons.CheckCircle className='w-4 h-4 text-green-600' />
                    ) : (
                      <Icons.AlertCircle className='w-4 h-4 text-red-600' />
                    )}
                    <div className='flex-1'>
                      <Text variant='body-sm' weight='medium'>
                        {field.name}: {field.value}
                      </Text>
                      <Text variant='caption' color='secondary'>
                        {field.description || field.error}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {copyFeedback && (
        <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300'>
          {copyFeedback}
        </div>
      )}

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Formato Cron
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Formato:</strong> minuto hora dia-do-mês mês
                dia-da-semana
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Valores:</strong> * (qualquer), números específicos,
                intervalos (1-5)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Listas:</strong> 1,3,5 (valores múltiplos)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Passos:</strong> */5 (a cada 5 unidades)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Linux crontab, sistemas de agendamento
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CronGenerator;
