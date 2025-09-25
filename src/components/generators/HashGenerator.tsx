import { Button, Icons, Text } from '@/components';
import { HashGenerator as HashGeneratorDomain, type HashType } from '@/domain';
import { useState } from 'react';

const HashGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<HashType[]>([
    'md5',
    'sha1',
    'sha256',
  ]);
  const [results, setResults] = useState<
    { original: string; hash: string; type: string; length: number }[]
  >([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const hashTypes = [
    { value: 'md5', label: 'MD5', description: '128-bit (32 caracteres hex)' },
    {
      value: 'sha1',
      label: 'SHA-1',
      description: '160-bit (40 caracteres hex)',
    },
    {
      value: 'sha256',
      label: 'SHA-256',
      description: '256-bit (64 caracteres hex)',
    },
  ];

  const generateHashes = () => {
    if (!inputText.trim()) {
      setResults([]);
      return;
    }

    const hashes = HashGeneratorDomain.generateMultiple(
      inputText,
      selectedTypes,
    );
    setResults(hashes);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback(`${type} copiado!`);
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
    setResults([]);
  };

  const toggleHashType = (type: HashType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de HASH
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere hashes MD5, SHA-1 e SHA-256 de qualquer texto
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Texto para Hash
        </Text>

        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder='Digite o texto que deseja gerar o hash...'
          className='w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
        />
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Tipos de Hash
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {hashTypes.map(type => (
            <label key={type.value} className='flex items-start'>
              <input
                type='checkbox'
                checked={selectedTypes.includes(type.value as HashType)}
                onChange={() => toggleHashType(type.value as HashType)}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1'
              />
              <div className='ml-2'>
                <Text variant='body-sm' weight='medium'>
                  {type.label}
                </Text>
                <Text variant='caption' color='secondary' className='block'>
                  {type.description}
                </Text>
              </div>
            </label>
          ))}
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateHashes}
            icon='RefreshCw'
            variant='primary'
            size='lg'
            fullWidth
            disabled={!inputText.trim() || selectedTypes.length === 0}
          >
            Gerar Hashes
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

      {results.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <Text variant='h5' weight='semibold' className='mb-4'>
            Hashes Gerados
          </Text>

          <div className='space-y-4'>
            {results.map((result, index) => (
              <div
                key={index}
                className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center justify-between mb-2'>
                  <Text variant='body-sm' weight='medium'>
                    {result.type.toUpperCase()}
                  </Text>
                  <Button
                    onClick={() =>
                      copyToClipboard(result.hash, result.type.toUpperCase())
                    }
                    className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                  >
                    <Icons.Copy className='w-4 h-4' />
                  </Button>
                </div>
                <div className='bg-white dark:bg-gray-800 p-3 rounded border font-mono text-sm break-all'>
                  {result.hash}
                </div>
                <Text variant='caption' color='secondary' className='mt-1'>
                  {result.length} caracteres
                </Text>
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
              Sobre Funções Hash
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>MD5:</strong> Rápido, mas não recomendado para
                segurança
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>SHA-1:</strong> Mais seguro que MD5, mas também
                obsoleto
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>SHA-256:</strong> Padrão atual, altamente seguro
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Verificação de integridade, senhas,
                assinaturas
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;
