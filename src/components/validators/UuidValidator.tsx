import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: string;
  version?: number;
}

const UuidValidator = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const validateUuid = (uuid: string): ValidationResult => {
    const cleanUuid = uuid.replace(/\s/g, '');

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        cleanUuid,
      )
    ) {
      return {
        isValid: false,
        message:
          'UUID deve ter o formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      };
    }

    const version = parseInt(cleanUuid[14], 16);
    const variant = parseInt(cleanUuid[19], 16);

    let versionName = '';
    switch (version) {
      case 1:
        versionName = 'Baseado em timestamp e MAC';
        break;
      case 2:
        versionName = 'DCE Security';
        break;
      case 3:
        versionName = 'Baseado em MD5';
        break;
      case 4:
        versionName = 'Aleatório';
        break;
      case 5:
        versionName = 'Baseado em SHA-1';
        break;
      default:
        versionName = 'Versão desconhecida';
    }

    const variantInfo =
      variant >= 8 && variant <= 11 ? 'RFC 4122' : 'Não padrão';

    return {
      isValid: true,
      message: 'UUID válido',
      details: `Versão: ${version} (${versionName}), Variante: ${variantInfo}`,
      version,
    };
  };

  const validateDocument = () => {
    if (!inputValue.trim()) {
      setResult({ isValid: false, message: 'Digite um UUID para validar' });
      return;
    }

    const validationResult = validateUuid(inputValue);
    setResult(validationResult);
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Validador de UUID
        </Text>
        <Text variant='body-lg' color='secondary'>
          Valide UUIDs e identifique sua versão e variante
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          UUID para Validação
        </Text>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='550e8400-e29b-41d4-a716-446655440000'
          className='w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
        />
        <Text variant='caption' color='secondary' className='mt-2'>
          Formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
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
          Validar UUID
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
              Sobre UUIDs
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Versão 1:</strong> Baseado em timestamp e endereço MAC
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Versão 4:</strong> Gerado aleatoriamente (mais comum)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Formato:</strong> 8-4-4-4-12 caracteres hexadecimais
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Identificadores únicos em sistemas
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UuidValidator;
