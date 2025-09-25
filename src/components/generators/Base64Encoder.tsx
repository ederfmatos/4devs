import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

const Base64Encoder = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const encodeText = () => {
    if (!inputText.trim()) {
      setEncodedText('');
      return;
    }

    try {
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setEncodedText(encoded);
    } catch {
      setEncodedText('Erro ao codificar o texto');
    }
  };

  const copyToClipboard = async () => {
    if (!encodedText) return;

    try {
      await navigator.clipboard.writeText(encodedText);
      showCopyFeedback('Texto codificado copiado!');
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
    setEncodedText('');
  };

  const getStats = () => {
    if (!inputText.trim()) return { original: 0, encoded: 0 };

    return {
      original: inputText.length,
      encoded: encodedText.length,
    };
  };

  const stats = getStats();

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Codificador Base64
        </Text>
        <Text variant='body-lg' color='secondary'>
          Codifique texto em Base64 de forma rápida e segura
        </Text>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Campo de entrada */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              Texto Original
            </Text>
            {stats.original > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.original} caractere{stats.original !== 1 ? 's' : ''}
              </Text>
            )}
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='Digite ou cole o texto que deseja codificar...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>

        {/* Campo de saída */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              Texto Codificado
            </Text>
            {stats.encoded > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.encoded} caractere{stats.encoded !== 1 ? 's' : ''}
              </Text>
            )}
          </div>

          <textarea
            value={encodedText}
            readOnly
            placeholder='O texto codificado em Base64 aparecerá aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm'
          />
        </div>
      </div>

      {/* Estatísticas */}
      {stats.original > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Estatísticas
          </Text>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <Text variant='h4' weight='bold' color='primary'>
                {stats.original}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres Originais
              </Text>
            </div>
            <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-green-600 dark:text-green-400'
              >
                {stats.encoded}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres Codificados
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={encodeText}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputText.trim()}
        >
          Codificar em Base64
        </Button>

        <Button
          onClick={copyToClipboard}
          icon='Copy'
          variant='success'
          size='lg'
          fullWidth
          disabled={!encodedText}
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

      {/* Feedback de cópia */}
      {copyFeedback && (
        <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300'>
          {copyFeedback}
        </div>
      )}

      {/* Informações */}
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
                • Comumente usado para transmitir dados binários via texto
              </Text>
              <Text variant='body-sm' color='info'>
                • Amplamente utilizado em emails, URLs e armazenamento
              </Text>
              <Text variant='body-sm' color='info'>
                • Suporta caracteres especiais e acentos corretamente
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Encoder;
