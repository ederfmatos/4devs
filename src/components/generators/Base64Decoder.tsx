import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

const Base64Decoder = () => {
  const [inputText, setInputText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [error, setError] = useState('');

  const decodeText = () => {
    if (!inputText.trim()) {
      setDecodedText('');
      setError('');
      return;
    }

    try {
      // Remove espaços em branco e quebras de linha
      const cleanInput = inputText.replace(/\s/g, '');

      // Valida se é Base64 válido
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanInput)) {
        throw new Error('Formato Base64 inválido');
      }

      const decoded = decodeURIComponent(escape(atob(cleanInput)));
      setDecodedText(decoded);
      setError('');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError('Erro ao decodificar: ' + errorMessage);
      setDecodedText('');
    }
  };

  const copyToClipboard = async () => {
    if (!decodedText) return;

    try {
      await navigator.clipboard.writeText(decodedText);
      showCopyFeedback('Texto decodificado copiado!');
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
    setDecodedText('');
    setError('');
  };

  const isValidBase64 = () => {
    if (!inputText.trim()) return false;
    try {
      const cleanInput = inputText.replace(/\s/g, '');
      return /^[A-Za-z0-9+/]*={0,2}$/.test(cleanInput);
    } catch {
      return false;
    }
  };

  const getStats = () => {
    if (!inputText.trim()) return { original: 0, decoded: 0 };

    return {
      original: inputText.length,
      decoded: decodedText.length,
    };
  };

  const stats = getStats();

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Decodificador Base64
        </Text>
        <Text variant='body-lg' color='secondary'>
          Decodifique texto Base64 de forma rápida e segura
        </Text>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Campo de entrada */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              Texto Base64
            </Text>
            <div className='flex items-center gap-2'>
              {inputText.trim() && (
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
            placeholder='Cole o texto codificado em Base64 aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm'
          />
        </div>

        {/* Campo de saída */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              Texto Decodificado
            </Text>
            {stats.decoded > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.decoded} caractere{stats.decoded !== 1 ? 's' : ''}
              </Text>
            )}
          </div>

          <textarea
            value={decodedText}
            readOnly
            placeholder='O texto decodificado aparecerá aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
            <div>
              <Text variant='h5' color='error' weight='medium' className='mb-1'>
                Erro de Decodificação
              </Text>
              <Text variant='body-sm' color='error'>
                {error}
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      {stats.original > 0 && !error && (
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
                Caracteres Base64
              </Text>
            </div>
            <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-green-600 dark:text-green-400'
              >
                {stats.decoded}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres Decodificados
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={decodeText}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputText.trim()}
        >
          Decodificar Base64
        </Button>

        <Button
          onClick={copyToClipboard}
          icon='Copy'
          variant='success'
          size='lg'
          fullWidth
          disabled={!decodedText}
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
              Como Funciona
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • Cole o texto codificado em Base64 no campo da esquerda
              </Text>
              <Text variant='body-sm' color='info'>
                • O sistema valida automaticamente se é Base64 válido
              </Text>
              <Text variant='body-sm' color='info'>
                • Clique em "Decodificar Base64" para processar
              </Text>
              <Text variant='body-sm' color='info'>
                • O texto decodificado aparecerá no campo da direita
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Copiar Resultado" para copiar o texto decodificado
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Resetar" para limpar todos os campos
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Decoder;
