import { Button, Icons, Input, Select, Text } from '@/components';
import { Password } from '@/domain';
import type { PasswordOptions } from '@/domain/Password';
import { useState } from 'react';

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState<Password | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [multipleResults, setMultipleResults] = useState<Password[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });

  const quantityOptions = [
    { value: 1, label: '1 Senha' },
    { value: 5, label: '5 Senhas' },
    { value: 10, label: '10 Senhas' },
    { value: 20, label: '20 Senhas' },
    { value: 50, label: '50 Senhas' },
  ];

  const generateSinglePassword = () => {
    try {
      const password = Password.generate(options);
      setGeneratedPassword(password);
      setMultipleResults([]);
    } catch (error: any) {
      console.error('Erro ao gerar senha:', error.message);
    }
  };

  const generateMultiplePasswords = () => {
    try {
      const passwords = Password.generateMultiple(quantity, options);
      setMultipleResults(passwords);
      setGeneratedPassword(null);
    } catch (error: any) {
      console.error('Erro ao gerar senhas:', error.message);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Senha copiada!');
    } catch (err) {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllPasswords = async () => {
    if (multipleResults.length === 0) return;

    const allPasswords = multipleResults.map(pwd => pwd.getValue()).join('\n');
    try {
      await navigator.clipboard.writeText(allPasswords);
      showCopyFeedback('Todas as senhas copiadas!');
    } catch (err) {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const clearResults = () => {
    setGeneratedPassword(null);
    setMultipleResults([]);
  };

  const updateOption = (
    key: keyof PasswordOptions,
    value: boolean | number
  ) => {
    setOptions((prev: PasswordOptions) => ({ ...prev, [key]: value }));
  };

  const getPasswordStrength = (
    password: string
  ): { level: string; color: string; percentage: number } => {
    if (!password || password === 'Selecione pelo menos um tipo de caractere') {
      return { level: 'Inválida', color: 'text-red-600', percentage: 0 };
    }

    const passwordInstance = new Password(password);
    const strength = passwordInstance.validateStrength();

    return {
      level:
        strength.level === 'very-strong'
          ? 'Muito Forte'
          : strength.level === 'strong'
            ? 'Forte'
            : strength.level === 'medium'
              ? 'Média'
              : 'Fraca',
      color: strength.color,
      percentage: strength.score,
    };
  };

  const strength = getPasswordStrength(generatedPassword?.getValue() || '');

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Key className='w-6 h-6 text-blue-600' />
          Gerador de Senha
        </Text>
        <Text variant='body' color='secondary'>
          Gere senhas seguras e personalizadas
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Comprimento: {options.length}
            </Text>
            <Input
              type='range'
              min='4'
              max='48'
              value={options.length}
              onChange={e => updateOption('length', Number(e.target.value))}
              className='w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer'
            />
            <div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1'>
              <Text variant='caption' color='muted'>
                4
              </Text>
              <Text variant='caption' color='muted'>
                48
              </Text>
            </div>
          </div>

          <div>
            <Select
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              options={quantityOptions}
              label='Quantidade'
              size='md'
              fullWidth
            />
          </div>

          <div className='md:col-span-2 lg:col-span-1'>
            <Text variant='label' color='primary' className='mb-2'>
              Tipos de Caracteres
            </Text>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.includeUppercase}
                  onChange={e =>
                    updateOption('includeUppercase', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Maiúsculas (A-Z)
                </Text>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.includeLowercase}
                  onChange={e =>
                    updateOption('includeLowercase', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Minúsculas (a-z)
                </Text>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.includeNumbers}
                  onChange={e =>
                    updateOption('includeNumbers', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Números (0-9)
                </Text>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.includeSymbols}
                  onChange={e =>
                    updateOption('includeSymbols', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Símbolos (!@#$%^&*)
                </Text>
              </label>
            </div>
          </div>

          <div className='md:col-span-2 lg:col-span-1'>
            <Text variant='label' color='primary' className='mb-2'>
              Opções Avançadas
            </Text>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.excludeSimilar}
                  onChange={e =>
                    updateOption('excludeSimilar', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Excluir similares (0,O,1,I,l)
                </Text>
              </label>
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={options.excludeAmbiguous}
                  onChange={e =>
                    updateOption('excludeAmbiguous', e.target.checked)
                  }
                  className='rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800'
                />
                <Text variant='body-sm' className='ml-2'>
                  Excluir ambíguos (0,1)
                </Text>
              </label>
            </div>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateSinglePassword}
            icon='Plus'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar 1 Senha
          </Button>

          <Button
            onClick={generateMultiplePasswords}
            icon='RefreshCw'
            variant='success'
            size='lg'
            fullWidth
          >
            Gerar {quantity} Senhas
          </Button>
        </div>
      </div>

      {generatedPassword && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              Senha Gerada
            </Text>
            <div className='flex items-center gap-2'>
              <Text
                variant='body-sm'
                weight='medium'
                className={strength.color}
              >
                {strength.level}
              </Text>
              <Button
                onClick={() => copyToClipboard(generatedPassword.getValue())}
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
              {generatedPassword.getValue()}
            </Text>
          </div>

          <div className='mt-4'>
            <div className='flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1'>
              <Text variant='body-sm' color='secondary'>
                Força da Senha
              </Text>
              <Text variant='body-sm' color='secondary'>
                {strength.percentage}%
              </Text>
            </div>
            <div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2'>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength.percentage >= 75
                    ? 'bg-green-500'
                    : strength.percentage >= 50
                      ? 'bg-blue-500'
                      : strength.percentage >= 25
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                }`}
                style={{ width: `${strength.percentage}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} Senha
              {multipleResults.length > 1 ? 's' : ''} Gerada
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllPasswords}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todas
            </Button>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {multipleResults.map((password, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  <Text variant='caption' color='muted' className='w-8'>
                    #{index + 1}
                  </Text>
                  <Text variant='body-sm' className='font-mono break-all'>
                    {password.getValue()}
                  </Text>
                </div>
                <Button
                  onClick={() => copyToClipboard(password.getValue())}
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
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Dicas de Segurança
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • Use pelo menos 12 caracteres
              </Text>
              <Text variant='body-sm' color='info'>
                • Combine maiúsculas, minúsculas, números e símbolos
              </Text>
              <Text variant='body-sm' color='info'>
                • Evite informações pessoais (nomes, datas)
              </Text>
              <Text variant='body-sm' color='info'>
                • Use senhas únicas para cada conta
              </Text>
              <Text variant='body-sm' color='info'>
                • Considere usar um gerenciador de senhas
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
