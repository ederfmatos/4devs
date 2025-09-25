import { Button, Icons, Text } from '@/components';
import { ChaveNFe } from '@/domain';
import { useState } from 'react';

const FiscalDocumentGenerator = () => {
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [multipleResults, setMultipleResults] = useState<string[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const quantityOptions = [
    { value: 1, label: '1 Chave NFe' },
    { value: 5, label: '5 Chaves NFe' },
    { value: 10, label: '10 Chaves NFe' },
    { value: 20, label: '20 Chaves NFe' },
    { value: 50, label: '50 Chaves NFe' },
  ];

  const generateSingleDocument = () => {
    const document = ChaveNFe.generate().format();
    setGeneratedDocument(document);
    setMultipleResults([]);
  };

  const generateMultipleDocuments = () => {
    const documents = ChaveNFe.generateMultiple(quantity).map(doc =>
      doc.format(),
    );
    setMultipleResults(documents);
    setGeneratedDocument('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ''));
      showCopyFeedback('Chave NFe copiada!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllDocuments = async () => {
    if (multipleResults.length === 0) return;

    const allDocuments = multipleResults
      .map(doc => doc.replace(/\s/g, ''))
      .join('\n');
    try {
      await navigator.clipboard.writeText(allDocuments);
      showCopyFeedback('Todas as chaves NFe copiadas!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const clearResults = () => {
    setGeneratedDocument('');
    setMultipleResults([]);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de Documentos Fiscais
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere chaves de acesso de Nota Fiscal Eletrônica (NFe) válidas
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Documento
            </Text>
            <Text variant='body-sm' color='secondary'>
              Chave de Acesso NFe (44 dígitos)
            </Text>
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Quantidade
            </Text>
            <select
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {quantityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateSingleDocument}
            icon='Plus'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar 1 Chave NFe
          </Button>

          <Button
            onClick={generateMultipleDocuments}
            icon='RefreshCw'
            variant='success'
            size='lg'
            fullWidth
          >
            Gerar {quantity} Chaves NFe
          </Button>

          <Button
            onClick={clearResults}
            icon='RotateCcw'
            variant='outline'
            size='lg'
            fullWidth
          >
            Limpar
          </Button>
        </div>
      </div>

      {generatedDocument && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              Chave NFe Gerada
            </Text>
            <Button
              onClick={() => copyToClipboard(generatedDocument)}
              icon='Copy'
              variant='outline'
              size='sm'
            >
              Copiar
            </Button>
          </div>

          <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
            <Text variant='body-sm' className='font-mono text-center break-all'>
              {generatedDocument}
            </Text>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} Chave
              {multipleResults.length > 1 ? 's' : ''} NFe Gerada
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllDocuments}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todas
            </Button>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {multipleResults.map((document, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  <Text variant='caption' color='muted' className='w-8'>
                    #{index + 1}
                  </Text>
                  <Text
                    variant='body-sm'
                    className='font-mono break-all text-xs'
                  >
                    {document}
                  </Text>
                </div>
                <Button
                  onClick={() => copyToClipboard(document)}
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

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Chave de Acesso NFe
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Estrutura:</strong> 44 dígitos que identificam
                unicamente uma NFe
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Composição:</strong> UF + Ano/Mês + CNPJ + Modelo +
                Série + Número + Forma Emissão + Código + DV
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Validação:</strong> Dígito verificador calculado por
                módulo 11
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Para testes de sistemas fiscais e
                validação
              </Text>
              <Text variant='body-sm' color='info'>
                • Todas as chaves são geradas aleatoriamente para fins de teste
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiscalDocumentGenerator;
