import { Button, Icons, Text } from '@/components';
import { RegexTester as RegexTesterDomain } from '@/domain';
import { useState } from 'react';

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testText, setTestText] = useState('');
  const [result, setResult] = useState<{
    isValid: boolean;
    matches: any[];
    error?: string;
  } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  const commonFlags = [
    {
      value: 'g',
      label: 'Global (g)',
      description: 'Encontra todas as ocorrências',
    },
    {
      value: 'i',
      label: 'Ignore Case (i)',
      description: 'Ignora maiúsculas/minúsculas',
    },
    {
      value: 'm',
      label: 'Multiline (m)',
      description: 'Trata ^ e $ por linha',
    },
    {
      value: 's',
      label: 'Dotall (s)',
      description: '. corresponde a quebras de linha',
    },
  ];

  const examplePatterns = [
    { pattern: '\\d+', description: 'Números', example: '123, 456' },
    { pattern: '[a-zA-Z]+', description: 'Letras', example: 'abc, XYZ' },
    {
      pattern: '\\w+@\\w+\\.\\w+',
      description: 'Email simples',
      example: 'user@domain.com',
    },
    {
      pattern: '\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}',
      description: 'Telefone BR',
      example: '(11) 99999-9999',
    },
    {
      pattern: '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}',
      description: 'CPF',
      example: '123.456.789-01',
    },
  ];

  const testRegex = () => {
    if (!pattern) {
      setResult({ isValid: false, error: 'Digite um pattern para testar' });
      return;
    }

    const tester = new RegexTesterDomain(pattern, flags, testText);
    const testResult = tester.test();
    setResult(testResult);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setPattern('');
    setFlags('g');
    setTestText('');
    setResult(null);
  };

  const loadExample = (examplePattern: string) => {
    setPattern(examplePattern);
    setResult(null);
  };

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  const highlightMatches = () => {
    if (!result || !result.isValid || result.matches.length === 0) {
      return testText;
    }

    let highlightedText = testText;
    let offset = 0;

    result.matches.forEach((match: any) => {
      const startTag =
        '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">';
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
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Testador de Expressões Regulares
        </Text>
        <Text variant='body-lg' color='secondary'>
          Teste e valide expressões regulares com destaque visual
        </Text>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h4' weight='semibold' className='mb-4'>
            Expressão Regular
          </Text>

          <div className='space-y-4'>
            <div>
              <Text variant='label' color='primary' className='mb-2'>
                Pattern
              </Text>
              <input
                type='text'
                value={pattern}
                onChange={e => setPattern(e.target.value)}
                placeholder='Digite sua expressão regular...'
                className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
              />
            </div>

            <div>
              <Text variant='label' color='primary' className='mb-2'>
                Flags
              </Text>
              <div className='grid grid-cols-2 gap-2'>
                {commonFlags.map(flag => (
                  <label key={flag.value} className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={flags.includes(flag.value)}
                      onChange={() => toggleFlag(flag.value)}
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    />
                    <Text
                      variant='body-sm'
                      className='ml-2'
                      title={flag.description}
                    >
                      {flag.label}
                    </Text>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Text variant='label' color='primary' className='mb-2'>
                Exemplos Rápidos
              </Text>
              <div className='space-y-1'>
                {examplePatterns.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => loadExample(example.pattern)}
                    className='w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                  >
                    <Text
                      variant='body-sm'
                      className='font-mono text-blue-600 dark:text-blue-400'
                    >
                      {example.pattern}
                    </Text>
                    <Text variant='caption' color='secondary' className='block'>
                      {example.description} - {example.example}
                    </Text>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h4' weight='semibold' className='mb-4'>
            Texto de Teste
          </Text>

          <textarea
            value={testText}
            onChange={e => setTestText(e.target.value)}
            placeholder='Digite o texto para testar a expressão regular...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={testRegex}
          icon='Search'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!pattern}
        >
          Testar Regex
        </Button>

        <Button
          onClick={() => copyToClipboard(pattern)}
          icon='Copy'
          variant='success'
          size='lg'
          fullWidth
          disabled={!pattern}
        >
          Copiar Pattern
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
                {result.isValid
                  ? `${result.matches.length} correspondência(s) encontrada(s)`
                  : 'Erro na expressão regular'}
              </Text>
              {result.error && (
                <Text variant='body-sm' color='error'>
                  {result.error}
                </Text>
              )}
            </div>
          </div>

          {result.isValid && result.matches.length > 0 && (
            <>
              <div className='mb-4'>
                <Text variant='h6' weight='semibold' className='mb-2'>
                  Texto com Destaques
                </Text>
                <div
                  className='p-4 bg-white dark:bg-gray-700 rounded border font-mono text-sm whitespace-pre-wrap'
                  dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                />
              </div>

              <div>
                <Text variant='h6' weight='semibold' className='mb-2'>
                  Correspondências Encontradas
                </Text>
                <div className='space-y-2 max-h-48 overflow-y-auto'>
                  {result.matches.map((match: any, index: number) => (
                    <div
                      key={index}
                      className='p-3 bg-gray-50 dark:bg-gray-700 rounded'
                    >
                      <div className='flex items-center justify-between'>
                        <Text variant='body-sm' className='font-mono'>
                          "{match.match}"
                        </Text>
                        <Text variant='caption' color='secondary'>
                          Posição: {match.index}
                        </Text>
                      </div>
                      {match.groups && match.groups.length > 0 && (
                        <Text
                          variant='caption'
                          color='secondary'
                          className='mt-1'
                        >
                          Grupos: {match.groups.join(', ')}
                        </Text>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
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
              Guia Rápido de Regex
            </Text>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <Text variant='body-sm' color='info'>
                • <code>\d</code> - Dígitos (0-9)
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>\w</code> - Letras, números e _
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>\s</code> - Espaços em branco
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>.</code> - Qualquer caractere
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>+</code> - Uma ou mais vezes
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>*</code> - Zero ou mais vezes
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>?</code> - Zero ou uma vez
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>^</code> - Início da linha
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>$</code> - Fim da linha
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>[abc]</code> - Qualquer um: a, b ou c
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>(abc)</code> - Grupo de captura
              </Text>
              <Text variant='body-sm' color='info'>
                • <code>{'{2,5}'}</code> - Entre 2 e 5 vezes
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
