import { Button, Icons, Text } from '@/components';
import { CaseConverter as CaseConverterDomain, type CaseType } from '@/domain';
import { useState } from 'react';

const CaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<Record<CaseType, string> | null>(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  const caseTypes: { key: CaseType; label: string; description: string }[] = [
    {
      key: 'camelCase',
      label: 'camelCase',
      description: 'primeiraLetraMinuscula',
    },
    {
      key: 'PascalCase',
      label: 'PascalCase',
      description: 'PrimeiraLetraMaiuscula',
    },
    {
      key: 'snake_case',
      label: 'snake_case',
      description: 'palavras_separadas_por_underscore',
    },
    {
      key: 'kebab-case',
      label: 'kebab-case',
      description: 'palavras-separadas-por-hifen',
    },
    {
      key: 'UPPER_CASE',
      label: 'UPPER_CASE',
      description: 'PALAVRAS_EM_MAIUSCULA',
    },
    {
      key: 'lower case',
      label: 'lower case',
      description: 'palavras em minúscula',
    },
  ];

  const convertText = () => {
    if (!inputText.trim()) {
      setResults(null);
      return;
    }

    const converted = CaseConverterDomain.convertToAll(inputText);
    setResults(converted);
  };

  const copyToClipboard = async (text: string, caseType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback(`${caseType} copiado!`);
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setInputText('');
    setResults(null);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Conversor de Cases
        </Text>
        <Text variant='body-lg' color='secondary'>
          Converta texto entre diferentes formatos de nomenclatura
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Texto Original
        </Text>

        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder='Digite o texto que deseja converter...'
          className='w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
        />

        <div className='flex gap-3 mt-4'>
          <Button
            onClick={convertText}
            icon='RefreshCw'
            variant='primary'
            size='lg'
            fullWidth
            disabled={!inputText.trim()}
          >
            Converter Cases
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

      {results && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Resultados da Conversão
          </Text>

          <div className='space-y-4'>
            {caseTypes.map(caseType => (
              <div
                key={caseType.key}
                className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center justify-between mb-2'>
                  <div>
                    <Text variant='body-sm' weight='medium'>
                      {caseType.label}
                    </Text>
                    <Text variant='caption' color='secondary'>
                      {caseType.description}
                    </Text>
                  </div>
                  <Button
                    onClick={() =>
                      copyToClipboard(results[caseType.key], caseType.label)
                    }
                    className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                  >
                    <Icons.Copy className='w-4 h-4' />
                  </Button>
                </div>
                <div className='bg-white dark:bg-gray-800 p-3 rounded border font-mono text-sm'>
                  {results[caseType.key]}
                </div>
              </div>
            ))}
          </div>
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
              Tipos de Case
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>camelCase:</strong> Usado em JavaScript, Java
                (variáveis)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>PascalCase:</strong> Usado em C#, Java (classes)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>snake_case:</strong> Usado em Python, Ruby
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>kebab-case:</strong> Usado em CSS, URLs
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>UPPER_CASE:</strong> Usado para constantes
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>lower case:</strong> Texto normal em minúsculas
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
