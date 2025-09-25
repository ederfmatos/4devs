import { Button, Icons, Text } from '@/components';
import { Placa, Renavam } from '@/domain';
import { useState } from 'react';

type VehicleDocumentType = 'renavam' | 'placa-normal' | 'placa-mercosul';

const VehicleDocumentGenerator = () => {
  const [documentType, setDocumentType] =
    useState<VehicleDocumentType>('renavam');
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [multipleResults, setMultipleResults] = useState<string[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const documentTypes = [
    { value: 'renavam', label: 'RENAVAM', mask: '####.###.###-#' },
    { value: 'placa-normal', label: 'Placa Normal', mask: 'AAA-####' },
    { value: 'placa-mercosul', label: 'Placa Mercosul', mask: 'AAA-#A##' },
  ];

  const quantityOptions = [
    { value: 1, label: '1 Documento' },
    { value: 5, label: '5 Documentos' },
    { value: 10, label: '10 Documentos' },
    { value: 20, label: '20 Documentos' },
    { value: 50, label: '50 Documentos' },
  ];

  const generateSingleDocument = () => {
    let document: string;

    switch (documentType) {
      case 'renavam':
        document = Renavam.generate().format();
        break;
      case 'placa-normal':
        document = Placa.generate('normal').format();
        break;
      case 'placa-mercosul':
        document = Placa.generate('mercosul').format();
        break;
      default:
        document = '';
    }

    setGeneratedDocument(document);
    setMultipleResults([]);
  };

  const generateMultipleDocuments = () => {
    let documents: string[] = [];

    switch (documentType) {
      case 'renavam':
        documents = Renavam.generateMultiple(quantity).map(doc => doc.format());
        break;
      case 'placa-normal':
        documents = Placa.generateMultiple(quantity, 'normal').map(doc =>
          doc.format(),
        );
        break;
      case 'placa-mercosul':
        documents = Placa.generateMultiple(quantity, 'mercosul').map(doc =>
          doc.format(),
        );
        break;
    }

    setMultipleResults(documents);
    setGeneratedDocument('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Documento copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllDocuments = async () => {
    if (multipleResults.length === 0) return;

    const allDocuments = multipleResults.join('\n');
    try {
      await navigator.clipboard.writeText(allDocuments);
      showCopyFeedback('Todos os documentos copiados!');
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

  const currentDocType = documentTypes.find(doc => doc.value === documentType);

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de Documentos Veiculares
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere RENAVAM e Placas (Normal e Mercosul) válidos
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Tipo de Documento
            </Text>
            <div className='space-y-2'>
              {documentTypes.map(doc => (
                <label key={doc.value} className='flex items-center'>
                  <input
                    type='radio'
                    name='documentType'
                    value={doc.value}
                    checked={documentType === doc.value}
                    onChange={e =>
                      setDocumentType(e.target.value as VehicleDocumentType)
                    }
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <Text variant='body-sm' className='ml-2'>
                    {doc.label}
                  </Text>
                </label>
              ))}
            </div>
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
            Gerar 1 {currentDocType?.label}
          </Button>

          <Button
            onClick={generateMultipleDocuments}
            icon='RefreshCw'
            variant='success'
            size='lg'
            fullWidth
          >
            Gerar {quantity} Documentos
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
              {currentDocType?.label} Gerado
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
            <Text variant='body-lg' className='font-mono text-center break-all'>
              {generatedDocument}
            </Text>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} {currentDocType?.label}
              {multipleResults.length > 1 ? 's' : ''} Gerado
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllDocuments}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todos
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
                  <Text variant='body-sm' className='font-mono break-all'>
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
              Documentos Veiculares
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>RENAVAM:</strong> Gerado com dígito verificador válido
                (módulo 11)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Placa Normal:</strong> Formato antigo AAA-#### (3
                letras + 4 números)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Placa Mercosul:</strong> Novo formato AAA-#A## (padrão
                internacional)
              </Text>
              <Text variant='body-sm' color='info'>
                • Todos os documentos são gerados aleatoriamente para fins de
                teste
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDocumentGenerator;
