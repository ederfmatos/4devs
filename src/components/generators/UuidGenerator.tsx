import { Button, Icons, Input, Select, Text } from '@/components';
import { useState } from 'react';
import { v1, v3, v4, v5 } from 'uuid';

type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7';

const UuidGenerator = () => {
  const [generatedUuid, setGeneratedUuid] = useState('');
  const [version, setVersion] = useState<UuidVersion>('v4');
  const [quantity, setQuantity] = useState(1);
  const [namespace, setNamespace] = useState('');
  const [name, setName] = useState('');
  const [multipleResults, setMultipleResults] = useState<string[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const generateUuidV6 = (): string => {
    const timestamp = Date.now();
    const randomBytes = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 256),
    );

    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHi = (((timestamp >> 48) & 0x0fff) | 0x6000)
      .toString(16)
      .padStart(4, '0');

    const randomPart = randomBytes
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return `${timeLow}-${timeMid}-${timeHi}-${randomPart.slice(0, 4)}-${randomPart.slice(4, 16)}`;
  };

  const generateUuidV7 = (): string => {
    const timestamp = Date.now();
    const randomBytes = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 256),
    );

    const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0');
    const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0');
    const timeHi = (((timestamp >> 48) & 0x0fff) | 0x7000)
      .toString(16)
      .padStart(4, '0');

    const randomPart = randomBytes
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return `${timeLow}-${timeMid}-${timeHi}-${randomPart.slice(0, 4)}-${randomPart.slice(4, 16)}`;
  };

  const generateUuid = (): string => {
    switch (version) {
      case 'v1':
        return v1();
      case 'v3':
        return v3(name, namespace || v3.URL);
      case 'v4':
        return v4();
      case 'v5':
        return v5(name, namespace || v5.URL);
      case 'v6':
        return generateUuidV6();
      case 'v7':
        return generateUuidV7();
      default:
        return v4();
    }
  };

  const generateSingleUuid = () => {
    const uuid = generateUuid();
    setGeneratedUuid(uuid);
    setMultipleResults([]);
  };

  const generateMultipleUuids = () => {
    const uuids: string[] = [];
    for (let i = 0; i < quantity; i++) {
      uuids.push(generateUuid());
    }
    setMultipleResults(uuids);
    setGeneratedUuid('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('UUID copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllUuids = async () => {
    if (multipleResults.length === 0) return;

    const uuidsText = multipleResults
      .map((uuid, index) => `${index + 1}. ${uuid}`)
      .join('\n');

    try {
      await navigator.clipboard.writeText(uuidsText);
      showCopyFeedback('Todos os UUIDs copiados!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const getVersionColor = (version: UuidVersion): string => {
    const colors = {
      v1: 'text-blue-600 dark:text-blue-400',
      v3: 'text-green-600 dark:text-green-400',
      v4: 'text-purple-600 dark:text-purple-400',
      v5: 'text-orange-600 dark:text-orange-400',
      v6: 'text-pink-600 dark:text-pink-400',
      v7: 'text-indigo-600 dark:text-indigo-400',
    };
    return colors[version] || 'text-gray-600 dark:text-gray-400';
  };

  const getVersionDescription = (version: UuidVersion): string => {
    const descriptions = {
      v1: 'Baseado em timestamp e endereço MAC',
      v3: 'Baseado em namespace e nome usando MD5',
      v4: 'Gerado aleatoriamente (mais comum)',
      v5: 'Baseado em namespace e nome usando SHA-1',
      v6: 'Baseado em timestamp (ordenável)',
      v7: 'Baseado em timestamp (ordenável, mais recente)',
    };
    return descriptions[version] || 'Versão não suportada';
  };

  const versionOptions = [
    { value: 'v1', label: 'UUID v1' },
    { value: 'v3', label: 'UUID v3' },
    { value: 'v4', label: 'UUID v4' },
    { value: 'v5', label: 'UUID v5' },
    { value: 'v6', label: 'UUID v6' },
    { value: 'v7', label: 'UUID v7' },
  ];

  const quantityOptions = [
    { value: 1, label: '1 UUID' },
    { value: 5, label: '5 UUIDs' },
    { value: 10, label: '10 UUIDs' },
    { value: 20, label: '20 UUIDs' },
    { value: 50, label: '50 UUIDs' },
  ];

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Hash className='w-6 h-6 text-blue-600' />
          Gerador de UUID
        </Text>
        <Text variant='body' color='secondary'>
          Gere UUIDs válidos em diferentes versões
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Versão
            </Text>
            <Select
              value={version}
              onChange={e => setVersion(e.target.value as UuidVersion)}
              options={versionOptions}
              size='md'
              fullWidth
            />
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Quantidade
            </Text>
            <Select
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              options={quantityOptions}
              size='md'
              fullWidth
            />
          </div>

          {(version === 'v3' || version === 'v5') && (
            <>
              <div>
                <Text variant='label' color='primary' className='mb-2'>
                  Namespace
                </Text>
                <Input
                  type='text'
                  value={namespace}
                  onChange={e => setNamespace(e.target.value)}
                  placeholder='URL ou UUID'
                  size='md'
                  fullWidth
                />
              </div>
              <div>
                <Text variant='label' color='primary' className='mb-2'>
                  Nome
                </Text>
                <Input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Nome para gerar UUID'
                  size='md'
                  fullWidth
                />
              </div>
            </>
          )}
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateSingleUuid}
            icon='Plus'
            variant='primary'
            size='md'
            fullWidth
          >
            Gerar 1 UUID
          </Button>

          <Button
            onClick={generateMultipleUuids}
            icon='RefreshCw'
            variant='success'
            size='md'
            fullWidth
          >
            Gerar {quantity} UUIDs
          </Button>
        </div>
      </div>

      {generatedUuid && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              UUID Gerado
            </Text>
            <div className='flex items-center gap-2'>
              <Text
                variant='body-sm'
                weight='medium'
                className={getVersionColor(version)}
              >
                {version.toUpperCase()}
              </Text>
              <Button
                onClick={() => copyToClipboard(generatedUuid)}
                icon='Copy'
                variant='outline'
                size='sm'
              >
                Copiar
              </Button>
            </div>
          </div>

          <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
            <Text variant='body-lg' className='font-mono text-center break-all'>
              {generatedUuid}
            </Text>
          </div>

          <div className='mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg'>
            <div className='flex items-center gap-2'>
              <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400' />
              <Text variant='body-sm' color='info'>
                {getVersionDescription(version)}
              </Text>
            </div>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} UUID
              {multipleResults.length > 1 ? 's' : ''} Gerado
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <div className='flex items-center gap-2'>
              <Text
                variant='body-sm'
                weight='medium'
                className={getVersionColor(version)}
              >
                {version.toUpperCase()}
              </Text>
              <Button
                onClick={copyAllUuids}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2'
              >
                <Icons.Copy className='w-5 h-5' />
                Copiar Todos
              </Button>
            </div>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {multipleResults.map((uuid, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  <Text variant='caption' color='muted' className='w-8'>
                    #{index + 1}
                  </Text>
                  <Text variant='body-sm' className='font-mono break-all'>
                    {uuid}
                  </Text>
                  <Text
                    variant='caption'
                    weight='medium'
                    className={getVersionColor(version)}
                  >
                    {version.toUpperCase()}
                  </Text>
                </div>
                <Button
                  onClick={() => copyToClipboard(uuid)}
                  className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                >
                  <Icons.Copy className='w-4 h-4' />
                </Button>
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

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-2'>
              Versões de UUID
            </Text>
            <div className='space-y-2'>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v1:</strong> Baseado em timestamp e endereço MAC
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v3:</strong> Baseado em namespace e nome usando MD5
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v4:</strong> Gerado aleatoriamente (mais comum)
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v5:</strong> Baseado em namespace e nome usando
                SHA-1
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v6:</strong> Baseado em timestamp (ordenável)
              </Text>
              <Text variant='body-sm' color='info' as='p'>
                <strong>UUID v7:</strong> Baseado em timestamp (ordenável, mais
                recente)
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UuidGenerator;
