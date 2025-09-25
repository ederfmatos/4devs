import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

type GlobalDocumentType = 'iban' | 'isbn' | 'issn' | 'sus' | 'imei';

interface ValidationResult {
  isValid: boolean;
  message: string;
  details?: string;
}

const GlobalDocumentValidator = () => {
  const [documentType, setDocumentType] = useState<GlobalDocumentType>('iban');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);

  const documentTypes = [
    {
      value: 'iban',
      label: 'IBAN',
      placeholder: 'BR1800000000141455123924100',
      mask: 'AA## #### #### #### #### #### #',
    },
    {
      value: 'isbn',
      label: 'ISBN',
      placeholder: '9788535902773',
      mask: '###-##-####-##-# ou ##########',
    },
    {
      value: 'issn',
      label: 'ISSN',
      placeholder: '01234567',
      mask: '####-####',
    },
    {
      value: 'sus',
      label: 'Cartão SUS',
      placeholder: '123456789012345',
      mask: '### #### #### ###',
    },
    {
      value: 'imei',
      label: 'IMEI',
      placeholder: '123456789012345',
      mask: '## ###### ###### #',
    },
  ];

  const validateIBAN = (iban: string): ValidationResult => {
    const cleanIBAN = iban.replace(/\s/g, '').toUpperCase();

    if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
      return {
        isValid: false,
        message: 'IBAN deve ter entre 15 e 34 caracteres',
      };
    }

    if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(cleanIBAN)) {
      return {
        isValid: false,
        message: 'IBAN deve começar com 2 letras e 2 dígitos',
      };
    }

    const rearranged = cleanIBAN.substring(4) + cleanIBAN.substring(0, 4);
    let numericString = '';

    for (const char of rearranged) {
      if (/[A-Z]/.test(char)) {
        numericString += (char.charCodeAt(0) - 55).toString();
      } else {
        numericString += char;
      }
    }

    let remainder = 0;
    for (const digit of numericString) {
      remainder = (remainder * 10 + parseInt(digit)) % 97;
    }

    if (remainder === 1) {
      return {
        isValid: true,
        message: 'IBAN válido',
        details: `País: ${cleanIBAN.substring(0, 2)}, Check digits: ${cleanIBAN.substring(2, 4)}`,
      };
    }

    return { isValid: false, message: 'IBAN inválido' };
  };

  const validateISBN = (isbn: string): ValidationResult => {
    const cleanISBN = isbn.replace(/\D/g, '');

    if (cleanISBN.length === 10) {
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanISBN[i]) * (10 - i);
      }
      const remainder = sum % 11;
      const digit = remainder === 0 ? 0 : 11 - remainder;
      const lastChar = cleanISBN[9];

      if ((digit === 10 && lastChar === 'X') || digit.toString() === lastChar) {
        return {
          isValid: true,
          message: 'ISBN-10 válido',
          details: `Dígito verificador: ${digit === 10 ? 'X' : digit}`,
        };
      }
      return { isValid: false, message: 'ISBN-10 inválido' };
    } else if (cleanISBN.length === 13) {
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(cleanISBN[i]) * (i % 2 === 0 ? 1 : 3);
      }
      const digit = (10 - (sum % 10)) % 10;

      if (parseInt(cleanISBN[12]) === digit) {
        return {
          isValid: true,
          message: 'ISBN-13 válido',
          details: `Dígito verificador: ${digit}`,
        };
      }
      return { isValid: false, message: 'ISBN-13 inválido' };
    }

    return { isValid: false, message: 'ISBN deve ter 10 ou 13 dígitos' };
  };

  const validateISSN = (issn: string): ValidationResult => {
    const cleanISSN = issn.replace(/\D/g, '');

    if (cleanISSN.length !== 8) {
      return { isValid: false, message: 'ISSN deve ter 8 dígitos' };
    }

    let sum = 0;
    for (let i = 0; i < 7; i++) {
      sum += parseInt(cleanISSN[i]) * (8 - i);
    }
    const remainder = sum % 11;
    const digit = remainder === 0 ? 0 : 11 - remainder;
    const lastChar = cleanISSN[7];

    if ((digit === 10 && lastChar === 'X') || digit.toString() === lastChar) {
      return {
        isValid: true,
        message: 'ISSN válido',
        details: `Dígito verificador: ${digit === 10 ? 'X' : digit}`,
      };
    }

    return { isValid: false, message: 'ISSN inválido' };
  };

  const validateSUS = (sus: string): ValidationResult => {
    const cleanSUS = sus.replace(/\D/g, '');

    if (cleanSUS.length !== 15) {
      return { isValid: false, message: 'Cartão SUS deve ter 15 dígitos' };
    }

    if (!/^[1-2]/.test(cleanSUS)) {
      return { isValid: false, message: 'Cartão SUS deve começar com 1 ou 2' };
    }

    const sequence = cleanSUS.substring(0, 11);
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += parseInt(sequence[i]) * (15 - i);
    }
    const remainder = sum % 11;
    const digit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cleanSUS[11]) === digit) {
      return {
        isValid: true,
        message: 'Cartão SUS válido',
        details: `Dígito verificador: ${digit}`,
      };
    }

    return { isValid: false, message: 'Cartão SUS inválido' };
  };

  const validateIMEI = (imei: string): ValidationResult => {
    const cleanIMEI = imei.replace(/\D/g, '');

    if (cleanIMEI.length !== 15) {
      return { isValid: false, message: 'IMEI deve ter 15 dígitos' };
    }

    let sum = 0;
    for (let i = 0; i < 14; i++) {
      let digit = parseInt(cleanIMEI[i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit = Math.floor(digit / 10) + (digit % 10);
        }
      }
      sum += digit;
    }

    const digit = (10 - (sum % 10)) % 10;

    if (parseInt(cleanIMEI[14]) === digit) {
      const tac = cleanIMEI.substring(0, 8);
      const snr = cleanIMEI.substring(8, 14);
      return {
        isValid: true,
        message: 'IMEI válido',
        details: `TAC: ${tac}, SNR: ${snr}, DV: ${digit}`,
      };
    }

    return { isValid: false, message: 'IMEI inválido' };
  };

  const validateDocument = () => {
    if (!inputValue.trim()) {
      setResult({ isValid: false, message: 'Digite um valor para validar' });
      return;
    }

    let validationResult: ValidationResult;

    switch (documentType) {
      case 'iban':
        validationResult = validateIBAN(inputValue);
        break;
      case 'isbn':
        validationResult = validateISBN(inputValue);
        break;
      case 'issn':
        validationResult = validateISSN(inputValue);
        break;
      case 'sus':
        validationResult = validateSUS(inputValue);
        break;
      case 'imei':
        validationResult = validateIMEI(inputValue);
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
          Validador de Documentos Globais
        </Text>
        <Text variant='body-lg' color='secondary'>
          Valide IBAN, ISBN, ISSN, Cartão SUS e IMEI
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Tipo de Documento
        </Text>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {documentTypes.map(doc => (
            <label key={doc.value} className='flex items-center'>
              <input
                type='radio'
                name='documentType'
                value={doc.value}
                checked={documentType === doc.value}
                onChange={e => {
                  setDocumentType(e.target.value as GlobalDocumentType);
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
              Documentos Globais
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>IBAN:</strong> International Bank Account Number
                (módulo 97)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>ISBN:</strong> International Standard Book Number (10
                ou 13 dígitos)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>ISSN:</strong> International Standard Serial Number (8
                dígitos)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Cartão SUS:</strong> Sistema Único de Saúde (15
                dígitos)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>IMEI:</strong> International Mobile Equipment Identity
                (15 dígitos, Luhn)
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalDocumentValidator;
