import { Button, Icons, Text } from '@/components';
import {
  NumberConverter as NumberConverterDomain,
  type NumberBase,
} from '@/domain';
import { useState } from 'react';

const NumberConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputBase, setInputBase] = useState<NumberBase>('decimal');
  const [result, setResult] = useState<{
    decimal: string;
    binary: string;
    hexadecimal: string;
    roman: string;
    isValid: boolean;
    error?: string;
  } | null>(null);
  const [copyFeedback, setCopyFeedback] = useState('');

  const bases = [
    {
      value: 'decimal',
      label: 'Decimal',
      placeholder: '255',
      description: 'Base 10 (0-9)',
    },
    {
      value: 'binary',
      label: 'Binário',
      placeholder: '11111111',
      description: 'Base 2 (0-1)',
    },
    {
      value: 'hexadecimal',
      label: 'Hexadecimal',
      placeholder: 'FF',
      description: 'Base 16 (0-9, A-F)',
    },
    {
      value: 'roman',
      label: 'Romano',
      placeholder: 'CCLV',
      description: 'Números romanos (I, V, X, L, C, D, M)',
    },
  ];

  const convertNumber = () => {
    if (!inputValue.trim()) {
      setResult(null);
      return;
    }

    const conversion = NumberConverterDomain.convert(inputValue, inputBase);
    setResult(conversion);
  };

  const copyToClipboard = async (text: string, base: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback(`${base} copiado!`);
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const currentBase = bases.find(base => base.value === inputBase);

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Conversor de Números
        </Text>
        <Text variant='body-lg' color='secondary'>
          Converta números entre decimal, binário, hexadecimal e romano
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Número de Entrada
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Base de Origem
            </Text>
            <select
              value={inputBase}
              onChange={e => {
                setInputBase(e.target.value as NumberBase);
                setInputValue('');
                setResult(null);
              }}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {bases.map(base => (
                <option key={base.value} value={base.value}>
                  {base.label}
                </option>
              ))}
            </select>
            <Text variant='caption' color='secondary' className='mt-1'>
              {currentBase?.description}
            </Text>
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Valor
            </Text>
            <input
              type='text'
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={currentBase?.placeholder}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
            />
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={convertNumber}
            icon='RefreshCw'
            variant='primary'
            size='lg'
            fullWidth
            disabled={!inputValue.trim()}
          >
            Converter Número
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

      {result && (
        <div
          className={`rounded-lg shadow-md p-6 border ${
            result.isValid
              ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          {result.isValid ? (
            <>
              <Text variant='h5' weight='semibold' className='mb-4'>
                Conversões
              </Text>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <Text variant='body-sm' weight='medium'>
                      Decimal
                    </Text>
                    <Button
                      onClick={() => copyToClipboard(result.decimal, 'Decimal')}
                      className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                    >
                      <Icons.Copy className='w-4 h-4' />
                    </Button>
                  </div>
                  <Text variant='body-lg' className='font-mono'>
                    {result.decimal}
                  </Text>
                </div>

                <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <Text variant='body-sm' weight='medium'>
                      Binário
                    </Text>
                    <Button
                      onClick={() => copyToClipboard(result.binary, 'Binário')}
                      className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                    >
                      <Icons.Copy className='w-4 h-4' />
                    </Button>
                  </div>
                  <Text variant='body-lg' className='font-mono break-all'>
                    {result.binary}
                  </Text>
                </div>

                <div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <Text variant='body-sm' weight='medium'>
                      Hexadecimal
                    </Text>
                    <Button
                      onClick={() =>
                        copyToClipboard(result.hexadecimal, 'Hexadecimal')
                      }
                      className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                    >
                      <Icons.Copy className='w-4 h-4' />
                    </Button>
                  </div>
                  <Text variant='body-lg' className='font-mono'>
                    {result.hexadecimal}
                  </Text>
                </div>

                <div className='p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
                  <div className='flex items-center justify-between mb-2'>
                    <Text variant='body-sm' weight='medium'>
                      Romano
                    </Text>
                    <Button
                      onClick={() => copyToClipboard(result.roman, 'Romano')}
                      className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                    >
                      <Icons.Copy className='w-4 h-4' />
                    </Button>
                  </div>
                  <Text variant='body-lg' className='font-mono'>
                    {result.roman || 'N/A'}
                  </Text>
                </div>
              </div>
            </>
          ) : (
            <div className='flex items-start gap-3'>
              <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
              <div>
                <Text
                  variant='h5'
                  color='error'
                  weight='medium'
                  className='mb-1'
                >
                  Erro na Conversão
                </Text>
                <Text variant='body-sm' color='error'>
                  {result.error}
                </Text>
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
              Sistemas Numéricos
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Decimal:</strong> Base 10, usado no dia a dia (0-9)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Binário:</strong> Base 2, usado em computação (0-1)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Hexadecimal:</strong> Base 16, usado em programação
                (0-9, A-F)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Romano:</strong> Sistema antigo (I, V, X, L, C, D, M)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Limite:</strong> Números romanos: 1-3999
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberConverter;
