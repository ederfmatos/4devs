import React, { useState } from 'react';
import { Password } from '@/domain';
import Icons from '@/components/Icons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';

const PasswordValidatorComponent = () => {
  const [password, setPassword] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    strength?: any;
    errors?: string[];
  } | null>(null);

  const validatePassword = () => {
    if (!password.trim()) {
      setValidationResult({
        isValid: false,
        message: 'Por favor, digite uma senha',
      });
      return;
    }

    const passwordInstance = new Password(password);
    const details = passwordInstance.validateWithDetails();
    setValidationResult(details);
  };

  const clearValidation = () => {
    setPassword('');
    setValidationResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validatePassword();
    }
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Lock className='w-6 h-6 text-blue-600' />
          Validador de Senha
        </Text>
        <Text variant='body' color='secondary'>
          Digite uma senha para validar sua força e segurança
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <Input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Digite sua senha...'
              size='lg'
              fullWidth
            />
          </div>
          <Button
            onClick={validatePassword}
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
                {validationResult.isValid ? 'Senha Válida' : 'Senha Inválida'}
              </Text>
            </div>
            <Button onClick={clearValidation} variant='secondary' size='md'>
              Limpar
            </Button>
          </div>

          {validationResult.strength && (
            <div className='mb-6'>
              <div className='flex items-center justify-between mb-2'>
                <Text variant='body-sm' weight='medium' color='primary'>
                  Força da Senha
                </Text>
                <Text
                  variant='body-sm'
                  weight='medium'
                  className={validationResult.strength.color}
                >
                  {validationResult.strength.score}%
                </Text>
              </div>
              <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2'>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    validationResult.strength.score >= 80
                      ? 'bg-green-500'
                      : validationResult.strength.score >= 60
                        ? 'bg-blue-500'
                        : validationResult.strength.score >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                  }`}
                  style={{ width: `${validationResult.strength.score}%` }}
                />
              </div>
              <Text
                variant='body-sm'
                weight='medium'
                className={`mt-1 ${validationResult.strength.color}`}
              >
                {validationResult.strength.level === 'very-strong'
                  ? 'Muito Forte'
                  : validationResult.strength.level === 'strong'
                    ? 'Forte'
                    : validationResult.strength.level === 'medium'
                      ? 'Média'
                      : 'Fraca'}
              </Text>
            </div>
          )}

          {validationResult.checks && (
            <div className='mb-6'>
              <Text
                variant='h5'
                weight='medium'
                color='primary'
                className='mb-3'
              >
                Verificações de Segurança
              </Text>
              <div className='space-y-2'>
                {validationResult.checks.map((check: any, index: number) => (
                  <div key={index} className='flex items-center gap-2'>
                    {check.passed ? (
                      <Icons.CheckCircle className='w-4 h-4 text-green-600' />
                    ) : (
                      <Icons.AlertCircle className='w-4 h-4 text-red-600' />
                    )}
                    <Text
                      variant='body'
                      color={check.passed ? 'success' : 'error'}
                    >
                      {check.name}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {validationResult.suggestions &&
            validationResult.suggestions.length > 0 && (
              <div>
                <Text
                  variant='h5'
                  weight='medium'
                  color='primary'
                  className='mb-3'
                >
                  Sugestões de Melhoria
                </Text>
                <ul className='list-disc list-inside space-y-1'>
                  {validationResult.suggestions.map(
                    (suggestion: string, index: number) => (
                      <li key={index}>
                        <Text variant='body-sm' color='info'>
                          {suggestion}
                        </Text>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default PasswordValidatorComponent;
