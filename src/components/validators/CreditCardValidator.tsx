import { Button, Icons, Text } from '@/components';
import { CartaoCredito, type BandeiraCartao } from '@/domain';
import { useState } from 'react';

interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: string;
  bandeira?: BandeiraCartao;
}

const CreditCardValidator = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const validateCard = (cardNumber: string): ValidationResult => {
    const card = new CartaoCredito(cardNumber);
    const isValid = card.isValid();
    const bandeira = card.detectBandeira();

    if (isValid) {
      return {
        isValid: true,
        message: 'Cartão válido',
        details: `Bandeira: ${bandeira.charAt(0).toUpperCase() + bandeira.slice(1)}, Formato: ${card.format()}`,
        bandeira,
      };
    }

    return {
      isValid: false,
      message: 'Cartão inválido',
      details: 'Número não passa na validação do algoritmo Luhn',
    };
  };

  const validateDocument = () => {
    if (!inputValue.trim()) {
      setResult({
        isValid: false,
        message: 'Digite um número de cartão para validar',
      });
      return;
    }

    const validationResult = validateCard(inputValue);
    setResult(validationResult);
  };

  const reset = () => {
    setInputValue('');
    setResult(null);
  };

  const getBandeiraColor = (bandeira?: BandeiraCartao) => {
    const colors = {
      visa: 'bg-blue-600',
      mastercard: 'bg-red-600',
      amex: 'bg-green-600',
      elo: 'bg-yellow-600',
      hipercard: 'bg-purple-600',
    };
    return bandeira ? colors[bandeira] : 'bg-gray-600';
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Validador de Cartão de Crédito
        </Text>
        <Text variant='body-lg' color='secondary'>
          Valide números de cartão de crédito usando o algoritmo Luhn
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Número do Cartão
        </Text>
        <input
          type='text'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder='4111 1111 1111 1111'
          className='w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono'
        />
        <Text variant='caption' color='secondary' className='mt-2'>
          Digite apenas números ou com espaços/hífens
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
            <div className='flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <Text
                  variant='h5'
                  weight='medium'
                  className={`${
                    result.isValid
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-red-700 dark:text-red-400'
                  }`}
                >
                  {result.message}
                </Text>
                {result.isValid && result.bandeira && (
                  <div
                    className={`px-3 py-1 rounded text-white text-sm font-medium ${getBandeiraColor(result.bandeira)}`}
                  >
                    {result.bandeira.charAt(0).toUpperCase() +
                      result.bandeira.slice(1)}
                  </div>
                )}
              </div>
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
          Validar Cartão
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

      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6'>
        <div className='flex items-start gap-3'>
          <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
          <div>
            <Text variant='h5' color='error' weight='medium' className='mb-1'>
              Aviso Importante
            </Text>
            <Text variant='body-sm' color='error'>
              Use apenas números de teste. NÃO insira dados reais de cartão de
              crédito.
            </Text>
          </div>
        </div>
      </div>

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Algoritmo Luhn
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Validação:</strong> Verifica se o número passa no
                algoritmo Luhn
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Bandeiras:</strong> Detecta automaticamente Visa,
                Mastercard, Amex, etc.
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Formato:</strong> Aceita números com ou sem formatação
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Segurança:</strong> Apenas validação, não armazena
                dados
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardValidator;
