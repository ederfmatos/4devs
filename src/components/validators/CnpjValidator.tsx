import React, { useState } from 'react';
import { Button, Icons, Input, Text } from '@/components';
import { Cnpj } from '@/domain';

const CnpjValidator = () => {
  const [cnpj, setCnpj] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors?: string[];
    steps?: any[];
  } | null>(null);

  const formatCnpj = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
    }
    return value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5',
    );
  };

  const handleValidation = () => {
    if (!cnpj.trim()) return;

    const cnpjInstance = new Cnpj(cnpj);
    const result = cnpjInstance.validateWithDetails();
    setValidationResult(result);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidation();
    }
  };

  const clearValidation = () => {
    setCnpj('');
    setValidationResult(null);
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Building className='w-6 h-6 text-blue-600' />
          Validador de CNPJ
        </Text>
        <Text variant='body' color='secondary'>
          Digite um CNPJ para verificar se é válido
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <Input
              type='text'
              value={cnpj}
              onChange={e => setCnpj(formatCnpj(e.target.value))}
              onKeyPress={handleKeyPress}
              placeholder='00.000.000/0000-00'
              size='lg'
              fullWidth
              maxLength={18}
            />
          </div>
          <Button
            onClick={handleValidation}
            disabled={!cnpj.trim()}
            icon='Search'
            variant='primary'
            size='lg'
          >
            Validar
          </Button>
        </div>
      </div>

      {validationResult && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              {validationResult.isValid ? (
                <Icons.CheckCircle className='w-6 h-6 text-green-600' />
              ) : (
                <Icons.AlertCircle className='w-6 h-6 text-red-600' />
              )}
              <Text variant='h3' weight='semibold'>
                {validationResult.isValid ? 'CNPJ Válido' : 'CNPJ Inválido'}
              </Text>
            </div>
            <Button onClick={clearValidation} variant='secondary' size='md'>
              Limpar
            </Button>
          </div>

          {!validationResult.isValid && validationResult.errors && (
            <div className='mb-4'>
              <Text variant='h5' weight='medium' className='mb-2'>
                Erros encontrados:
              </Text>
              <ul className='list-disc list-inside space-y-1'>
                {validationResult.errors.map((error: string, index: number) => (
                  <li key={index}>
                    <Text variant='body' color='error'>
                      {error}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.steps && (
            <div>
              <Text
                variant='h5'
                weight='medium'
                color='primary'
                className='mb-2'
              >
                Detalhes da validação:
              </Text>
              <div className='space-y-2'>
                {validationResult.steps.map((step: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    {step.passed ? (
                      <Icons.CheckCircle className='w-4 h-4 text-green-600' />
                    ) : (
                      <Icons.AlertCircle className='w-4 h-4 text-red-600' />
                    )}
                    <Text
                      variant='body'
                      color={step.passed ? 'success' : 'error'}
                    >
                      {step.step}
                      {step.expected && step.found && (
                        <Text variant='body' color='muted' className='ml-1'>
                          (Esperado: {step.expected}, Encontrado: {step.found})
                        </Text>
                      )}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CnpjValidator;
