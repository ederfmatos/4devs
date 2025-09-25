import { Button, Icons, Text } from '@/components';
import { Passaporte, Pis, TituloEleitor } from '@/domain';
import { useState } from 'react';

type PersonalDocumentType = 'pis' | 'titulo-eleitor' | 'passaporte';

interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: string;
}

const PersonalDocumentValidator = () => {
  const [documentType, setDocumentType] = useState<PersonalDocumentType>('pis');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const documentTypes = [
    {
      value: 'pis',
      label: 'PIS/PASEP/NIS',
      placeholder: '12345678901',
      mask: '###.#####.##-#',
    },
    {
      value: 'titulo-eleitor',
      label: 'Título de Eleitor',
      placeholder: '123456780175',
      mask: '#### #### ####',
    },
    {
      value: 'passaporte',
      label: 'Passaporte Brasileiro',
      placeholder: 'AB123456',
      mask: 'AA######',
    },
  ];

  const validatePIS = (pis: string): ValidationResult => {
    const pisInstance = new Pis(pis);
    const isValid = pisInstance.isValid();

    if (isValid) {
      return {
        isValid: true,
        message: 'PIS válido',
        details: `Formatado: ${pisInstance.format()}`,
      };
    }

    return {
      isValid: false,
      message: 'PIS inválido',
      details: 'Verifique o formato e os dígitos verificadores',
    };
  };

  const validateTituloEleitor = (titulo: string): ValidationResult => {
    const tituloInstance = new TituloEleitor(titulo);
    const isValid = tituloInstance.isValid();

    if (isValid) {
      return {
        isValid: true,
        message: 'Título de Eleitor válido',
        details: `Formatado: ${tituloInstance.format()}`,
      };
    }

    return {
      isValid: false,
      message: 'Título de Eleitor inválido',
      details: 'Verifique o formato e os dígitos verificadores',
    };
  };

  const validatePassaporte = (passaporte: string): ValidationResult => {
    const passaporteInstance = new Passaporte(passaporte);
    const isValid = passaporteInstance.isValid();

    if (isValid) {
      return {
        isValid: true,
        message: 'Formato de passaporte válido',
        details: `Série: ${passaporteInstance.getSerie()}, Número: ${passaporteInstance.getNumber()}`,
      };
    }

    return {
      isValid: false,
      message: 'Passaporte inválido',
      details: 'Deve ter 2 letras seguidas de 6 números',
    };
  };

  const validateDocument = () => {
    if (!inputValue.trim()) {
      setResult({ isValid: false, message: 'Digite um valor para validar' });
      return;
    }

    let validationResult: ValidationResult;

    switch (documentType) {
      case 'pis':
        validationResult = validatePIS(inputValue);
        break;
      case 'titulo-eleitor':
        validationResult = validateTituloEleitor(inputValue);
        break;
      case 'passaporte':
        validationResult = validatePassaporte(inputValue);
        break;
      default:
        validationResult = {
          isValid: false,
          message: 'Tipo de documento não suportado',
        };
    }

    setResult(validationResult);
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const currentDocType = documentTypes.find(doc => doc.value === documentType);

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Validador de Documentos Pessoais
        </Text>
        <Text variant='body-lg' color='secondary'>
          Valide PIS/PASEP/NIS, Título de Eleitor e Passaporte Brasileiro
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Tipo de Documento
        </Text>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {documentTypes.map(doc => (
            <label key={doc.value} className='flex items-center'>
              <input
                type='radio'
                name='documentType'
                value={doc.value}
                checked={documentType === doc.value}
                onChange={e => {
                  setDocumentType(e.target.value as PersonalDocumentType);
                  setInputValue('');
                  setResult(null);
                }}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <Text variant='body-sm' className='ml-2'>
                {doc.label}
              </Text>
            </label>
          ))}
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          {currentDocType?.label}
        </Text>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={currentDocType?.placeholder}
          className='w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
        />
        <Text variant='caption' color='secondary' className='mt-2'>
          Formato: {currentDocType?.mask}
        </Text>
      </div>

      {result && (
        <div
          className={`rounded-lg shadow-md p-6 border ${
            result.isValid
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className='flex items-start gap-3'>
            {result.isValid ? (
              <Icons.CheckCircle className='w-5 h-5 text-green-600 dark:text-green-400 mt-0.5' />
            ) : (
              <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
            )}
            <div>
              <Text
                variant='h5'
                weight='medium'
                className={`mb-1 ${
                  result.isValid
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}
              >
                {result.message}
              </Text>
              {result.details && (
                <Text
                  variant='body-sm'
                  className={
                    result.isValid
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }
                >
                  {result.details}
                </Text>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={validateDocument}
          icon='CheckCircle'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputValue.trim()}
        >
          Validar Documento
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

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Documentos Pessoais
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>PIS/PASEP/NIS:</strong> Programa de Integração Social,
                validado por módulo 11
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Título de Eleitor:</strong> Documento eleitoral
                brasileiro com 12 dígitos
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Passaporte:</strong> Documento de viagem com 2 letras
                + 6 números
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDocumentValidator;
