import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

const TextSorter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortLines = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const lines = inputText.split('\n').filter(line => line.trim());
    const sortedLines = [...lines].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' });
      } else {
        return b.localeCompare(a, 'pt-BR', { sensitivity: 'base' });
      }
    });

    const result = sortedLines.join('\n');
    setOutputText(result);
  };

  const copyToClipboard = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      showCopyFeedback('Texto ordenado copiado!');
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
    setOutputText('');
  };

  const getStats = () => {
    if (!inputText.trim()) return { original: 0, sorted: 0 };

    const originalLines = inputText.split('\n').filter(line => line.trim());
    const sortedLines = outputText.split('\n').filter(line => line.trim());

    return {
      original: originalLines.length,
      sorted: sortedLines.length,
    };
  };

  const stats = getStats();

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Ordenador de Linhas
        </Text>
        <Text variant='body-lg' color='secondary'>
          Ordene linhas de texto alfabeticamente de forma rápida e eficiente
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
              Texto Ordenado
            </Text>
            {stats.sorted > 0 && (
              <Text variant='body-sm' color='secondary'>
                {stats.sorted} linha{stats.sorted !== 1 ? 's' : ''} ordenadas
              </Text>
            )}
          </div>

          <textarea
            value={outputText}
            readOnly
            placeholder='O texto ordenado aparecerá aqui...'
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
          />
        </div>
      </div>

      {/* Opções de ordenação */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Opções de Ordenação
        </Text>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex items-center gap-3'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='sortOrder'
                value='asc'
                checked={sortOrder === 'asc'}
                onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <Text variant='body-sm' className='ml-2'>
                Ordem Crescente (A → Z)
              </Text>
            </label>
          </div>
          <div className='flex items-center gap-3'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='sortOrder'
                value='desc'
                checked={sortOrder === 'desc'}
                onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <Text variant='body-sm' className='ml-2'>
                Ordem Decrescente (Z → A)
              </Text>
            </label>
          </div>
        </div>
      </div>

      {/* Botões de ação */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={sortLines}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputText.trim()}
        >
          Ordenar Linhas
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
            <div className='space-y-1 flex flex-col gap-1'>
              <Text variant='body-sm' color='info'>
                • Cole seu texto no campo "Texto Original"
              </Text>
              <Text variant='body-sm' color='info'>
                • Escolha a ordem de ordenação (crescente ou decrescente)
              </Text>
              <Text variant='body-sm' color='info'>
                • Clique em "Ordenar Linhas" para processar
              </Text>
              <Text variant='body-sm' color='info'>
                • O texto ordenado aparecerá no campo da direita
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Copiar Resultado" para copiar o texto processado
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Resetar" para limpar todos os campos
              </Text>
              <Text variant='body-sm' color='info'>
                • A ordenação é feita considerando acentos e
                maiúsculas/minúsculas
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSorter;
