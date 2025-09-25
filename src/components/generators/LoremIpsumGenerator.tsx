import { Button, Icons, Text } from '@/components';
import { LoremIpsum, type LoremLanguage } from '@/domain';
import { useState } from 'react';

const LoremIpsumGenerator = () => {
  const [language, setLanguage] = useState<LoremLanguage>('latin');
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>(
    'paragraphs',
  );
  const [count, setCount] = useState(3);
  const [generatedText, setGeneratedText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const languages = [
    { value: 'latin', label: 'Latim (Lorem Ipsum)' },
    { value: 'portuguese', label: 'Português' },
    { value: 'english', label: 'Inglês' },
  ];

  const types = [
    { value: 'words', label: 'Palavras', min: 5, max: 100, default: 50 },
    { value: 'sentences', label: 'Frases', min: 1, max: 20, default: 5 },
    { value: 'paragraphs', label: 'Parágrafos', min: 1, max: 10, default: 3 },
  ];

  const generateText = () => {
    const text = LoremIpsum.generate(type, count, language);
    setGeneratedText(text);
  };

  const copyToClipboard = async () => {
    if (!generatedText) return;

    try {
      await navigator.clipboard.writeText(generatedText);
      showCopyFeedback('Texto copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setGeneratedText('');
  };

  const currentType = types.find(t => t.value === type);

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de Lorem Ipsum
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere texto de exemplo em latim, português ou inglês
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Idioma
            </Text>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value as LoremLanguage)}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Tipo
            </Text>
            <select
              value={type}
              onChange={e => {
                const newType = e.target.value as
                  | 'words'
                  | 'sentences'
                  | 'paragraphs';
                setType(newType);
                const typeConfig = types.find(t => t.value === newType);
                if (typeConfig) {
                  setCount(typeConfig.default);
                }
              }}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {types.map(t => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Quantidade
            </Text>
            <input
              type='number'
              value={count}
              onChange={e => setCount(parseInt(e.target.value) || 1)}
              min={currentType?.min}
              max={currentType?.max}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            />
            <Text variant='caption' color='secondary' className='mt-1'>
              {currentType?.min} - {currentType?.max}
            </Text>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateText}
            icon='RefreshCw'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar {count} {currentType?.label}
          </Button>

          <Button
            onClick={copyToClipboard}
            icon='Copy'
            variant='success'
            size='lg'
            fullWidth
            disabled={!generatedText}
          >
            Copiar Texto
          </Button>

          <Button
            onClick={reset}
            icon='RotateCcw'
            variant='outline'
            size='lg'
            fullWidth
          >
            Limpar
          </Button>
        </div>
      </div>

      {generatedText && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Texto Gerado
          </Text>

          <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-96 overflow-y-auto'>
            <Text
              variant='body-sm'
              className='whitespace-pre-wrap leading-relaxed'
            >
              {generatedText}
            </Text>
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
              Sobre Lorem Ipsum
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Lorem Ipsum:</strong> Texto padrão da indústria
                gráfica desde 1500
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Português:</strong> Texto em português brasileiro para
                testes
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Inglês:</strong> Texto em inglês para aplicações
                internacionais
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Preenchimento de layouts, testes de
                design
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoremIpsumGenerator;
