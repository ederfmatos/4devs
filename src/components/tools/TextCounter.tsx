import { Icons, Text } from '@/components';
import { TextCounter as TextCounterDomain, type TextStats } from '@/domain';
import { useState } from 'react';

const TextCounter = () => {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState<TextStats | null>(null);

  const analyzeText = (text: string) => {
    if (!text.trim()) {
      setStats(null);
      return;
    }

    const analysis = TextCounterDomain.analyze(text);
    setStats(analysis);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Contador de Texto
        </Text>
        <Text variant='body-lg' color='secondary'>
          Analise estatísticas detalhadas do seu texto
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Texto para Análise
        </Text>

        <textarea
          value={inputText}
          onChange={e => {
            setInputText(e.target.value);
            analyzeText(e.target.value);
          }}
          placeholder='Digite ou cole o texto que deseja analisar...'
          className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
        />
      </div>

      {stats && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Estatísticas do Texto
          </Text>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
              <Text variant='h4' weight='bold' color='primary'>
                {stats.characters.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Caracteres
              </Text>
            </div>

            <div className='text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-green-600 dark:text-green-400'
              >
                {stats.charactersNoSpaces.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Sem Espaços
              </Text>
            </div>

            <div className='text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-purple-600 dark:text-purple-400'
              >
                {stats.words.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Palavras
              </Text>
            </div>

            <div className='text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-yellow-600 dark:text-yellow-400'
              >
                {stats.sentences.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Frases
              </Text>
            </div>

            <div className='text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-red-600 dark:text-red-400'
              >
                {stats.paragraphs.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Parágrafos
              </Text>
            </div>

            <div className='text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-indigo-600 dark:text-indigo-400'
              >
                {stats.lines.toLocaleString()}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Linhas
              </Text>
            </div>

            <div className='text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-pink-600 dark:text-pink-400'
              >
                {stats.averageWordsPerSentence}
              </Text>
              <Text variant='body-sm' color='secondary'>
                Palavras/Frase
              </Text>
            </div>

            <div className='text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg'>
              <Text
                variant='h4'
                weight='bold'
                className='text-teal-600 dark:text-teal-400'
              >
                {stats.readingTime} min
              </Text>
              <Text variant='body-sm' color='secondary'>
                Tempo Leitura
              </Text>
            </div>
          </div>
        </div>
      )}

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Análise em Tempo Real
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Caracteres:</strong> Total incluindo espaços e
                pontuação
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Palavras:</strong> Contagem baseada em espaços
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Tempo de Leitura:</strong> Baseado em 200 palavras por
                minuto
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Análise:</strong> Atualizada automaticamente conforme
                você digita
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCounter;
