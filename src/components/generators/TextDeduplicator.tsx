import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

const TextDeduplicator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const removeDuplicates = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n');
    const uniqueLines = [...new Set(lines)];
    const result = uniqueLines.join('\n');
    setOutputText(result);
  };

  const copyToClipboard = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      showCopyFeedback('Texto copiado!');
    } catch (err) {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setInputText('');
    setOutputText('');
  };

  const getStats = () => {
    if (!inputText.trim()) return { original: 0, unique: 0, removed: 0 };

    const originalLines = inputText.split('\n').filter(line => line.trim());
    const uniqueLines = outputText.split('\n').filter(line => line.trim());

    return {
      original: originalLines.length,
      unique: uniqueLines.length,
      removed: originalLines.length - uniqueLines.length,
    };
  };

  const stats = getStats();

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Removedor de Linhas Duplicadas
        </Text>
        <Text variant='body-lg' color='secondary'>
          Remova linhas duplicadas de qualquer texto de forma rápida e eficiente
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
                {stats.original} linha{stats.original !== 1 ? 's' : ''}
              </Text>
            )}
          </div>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder='Cole seu texto aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>

        {/* Campo de saída */}
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              Texto Sem Duplicatas
            </Text>
            {stats.unique > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.unique} linha{stats.unique !== 1 ? 's' : ''} únicas
              </Text>
            )}
          </div>

          <textarea
            value={outputText}
            readOnly
            placeholder='O texto sem duplicatas aparecerá aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>
      </div>

      {/* Estatísticas */}
      {stats.original > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Estatísticas
          </Text>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <Text variant='h4' weight='bold' color='primary'>
                {stats.original}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Linhas Originais
              </Text>
            </div>
            <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-green-600 dark:text-green-400'
              >
                {stats.unique}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Linhas Únicas
              </Text>
            </div>
            <div className='text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-red-600 dark:text-red-400'
              >
                {stats.removed}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Duplicatas Removidas
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={removeDuplicates}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputText.trim()}
        >
          Remover Duplicatas
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
              <Text variant='body-sm' color='info' as='p'>
                • Cole seu texto no campo "Texto Original"
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                • Clique em "Remover Duplicatas" para processar
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                • O texto sem duplicatas aparecerá no campo da direita
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                • Use "Copiar Resultado" para copiar o texto processado
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                • Use "Resetar" para limpar todos os campos
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextDeduplicator;
