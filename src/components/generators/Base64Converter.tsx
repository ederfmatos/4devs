import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

type ConversionMode = 'encode' | 'decode';

const Base64Converter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ConversionMode>('encode');

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      setError('');
      return;
    }

    if (mode === 'encode') {
      try {
        const encoded = btoa(unescape(encodeURIComponent(inputText)));
        setOutputText(encoded);
        setError('');
      } catch {
        setError('Erro ao codificar o texto');
        setOutputText('');
      }
    } else {
      try {
        const cleanInput = inputText.replace(/\s/g, '');

        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanInput)) {
          throw new Error('Formato Base64 inválido');
        }

        const decoded = decodeURIComponent(escape(atob(cleanInput)));
        setOutputText(decoded);
        setError('');
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro desconhecido';
        setError('Erro ao decodificar: ' + errorMessage);
        setOutputText('');
      }
    }
  };

  const copyToClipboard = async () => {
    if (!outputText) return;

    await navigator.clipboard.writeText(outputText);
    showCopyFeedback('Texto copiado!');
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  const switchMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInputText(outputText);
    setOutputText('');
    setError('');
  };

  const isValidBase64 = () => {
    if (!inputText.trim() || mode === 'encode') return true;
    try {
      const cleanInput = inputText.replace(/\s/g, '');
      return /^[A-Za-z0-9+/]*={0,2}$/.test(cleanInput);
    } catch {
      return false;
    }
  };

  const getStats = () => {
    if (!inputText.trim()) return { input: 0, output: 0 };

    return {
      input: inputText.length,
      output: outputText.length,
    };
  };

  const stats = getStats();

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Conversor Base64
        </Text>
        <Text variant='body-lg' color='secondary'>
          Codifique e decodifique texto em Base64 de forma rápida e segura
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Modo de Conversão
        </Text>
        <div className='flex flex-col sm:flex-row gap-4'>
          <label className='flex items-center'>
            <input
              type='radio'
              name='mode'
              value='encode'
              checked={mode === 'encode'}
              onChange={e => setMode(e.target.value as ConversionMode)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <Text variant='body-sm' className='ml-2'>
              Codificar (Texto → Base64)
            </Text>
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='mode'
              value='decode'
              checked={mode === 'decode'}
              onChange={e => setMode(e.target.value as ConversionMode)}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
            />
            <Text variant='body-sm' className='ml-2'>
              Decodificar (Base64 → Texto)
            </Text>
          </label>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              {mode === 'encode' ? 'Texto Original' : 'Texto Base64'}
            </Text>
            <div className='flex items-center gap-2'>
              {stats.input > 0 && (
                <Text variant='body-sm' color='secondary'>
                  {stats.input} caractere{stats.input !== 1 ? 's' : ''}
                </Text>
              )}
              {mode === 'decode' && inputText.trim() && (
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    isValidBase64()
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  }`}
                >
                  <Icons.CheckCircle className='w-3 h-3' />
                  {isValidBase64() ? 'Válido' : 'Inválido'}
                </div>
              )}
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={
              mode === 'encode'
                ? 'Digite ou cole o texto que deseja codificar...'
                : 'Cole o texto codificado em Base64 aqui...'
            }
            className={`w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
              mode === 'decode' ? 'font-mono text-sm' : ''
            }`}
          />
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              {mode === 'encode' ? 'Texto Codificado' : 'Texto Decodificado'}
            </Text>
            {stats.output > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.output} caractere{stats.output !== 1 ? 's' : ''}
              </Text>
            )}
          </div>

          <textarea
            value={outputText}
            readOnly
            placeholder={
              mode === 'encode'
                ? 'O texto codificado em Base64 aparecerá aqui...'
                : 'O texto decodificado aparecerá aqui...'
            }
            className={`w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 ${
              mode === 'encode' ? 'font-mono text-sm' : ''
            }`}
          />
        </div>
      </div>

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
            <div>
              <Text variant='h5' color='error' weight='medium' className='mb-1'>
                Erro de {mode === 'encode' ? 'Codificação' : 'Decodificação'}
              </Text>
              <Text variant='body-sm' color='error'>
                {error}
              </Text>
            </div>
          </div>
        </div>
      )}

      {stats.input > 0 && stats.output > 0 && !error && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Estatísticas
          </Text>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <Text variant='h4' weight='bold' color='primary'>
                {stats.input}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres de Entrada
              </Text>
            </div>
            <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-green-600 dark:text-green-400'
              >
                {stats.output}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres de Saída
              </Text>
            </div>
            <div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-purple-600 dark:text-purple-400'
              >
                {mode === 'encode'
                  ? `+${Math.round(((stats.output - stats.input) / stats.input) * 100)}%`
                  : `-${Math.round(((stats.input - stats.output) / stats.input) * 100)}%`}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Diferença de Tamanho
              </Text>
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={processText}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputText.trim()}
        >
          {mode === 'encode' ? 'Codificar em Base64' : 'Decodificar Base64'}
        </Button>

        <Button
          onClick={switchMode}
          icon='RefreshCw'
          variant='secondary'
          size='lg'
          fullWidth
          disabled={!outputText}
        >
          Inverter Conversão
        </Button>

        <Button
          onClick={copyToClipboard}
          icon='Copy'
          variant='success'
          size='lg'
          fullWidth
          disabled={!outputText}
        >
          Copiar Resultado
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
              Sobre Base64
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • Base64 é um esquema de codificação binário-para-texto
              </Text>
              <Text variant='body-sm' color='info'>
                • Usa apenas 64 caracteres: A-Z, a-z, 0-9, + e /
              </Text>
              <Text variant='body-sm' color='info'>
                • Aumenta o tamanho dos dados em aproximadamente 33%
              </Text>
              <Text variant='body-sm' color='info'>
                • Amplamente utilizado em emails, URLs e armazenamento
              </Text>
              <Text variant='body-sm' color='info'>
                • Suporta caracteres especiais e acentos corretamente
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Inverter Conversão" para alternar rapidamente entre modos
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
