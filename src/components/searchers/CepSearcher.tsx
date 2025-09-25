import React from 'react';
import { useCepSearcher } from './CepSearcher.hook';
import Icons from '@/components/Icons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import LabelValue from '@/components/LabelValue';
import Text from '@/components/Text';

const CepSearcher = () => {
  const {
    cep,
    setCep,
    loading,
    error,
    data,
    formatCep,
    searchCep,
    clearSearch,
  } = useCepSearcher();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchCep();
    }
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Search className='w-6 h-6 text-blue-600' />
          Consulta CEP
        </Text>
        <Text variant='body' color='secondary'>
          Digite um CEP para buscar informações do endereço
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <Input
              type='text'
              value={cep}
              onChange={e => setCep(formatCep(e.target.value))}
              onKeyPress={handleKeyPress}
              placeholder='00000-000'
              maxLength={9}
              size='lg'
              fullWidth
            />
          </div>
          <Button
            onClick={() => searchCep()}
            loading={loading}
            icon='Search'
            variant='primary'
            size='lg'
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>
      </div>

      {loading && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-center gap-3'>
            <Icons.RefreshCw className='animate-spin h-6 w-6 text-blue-600' />
            <Text variant='body' color='secondary'>
              Buscando informações do CEP...
            </Text>
          </div>
        </div>
      )}

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6'>
          <div className='flex items-center gap-3 mb-3'>
            <Icons.AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
            <Text variant='h4' color='error' weight='semibold'>
              CEP não encontrado
            </Text>
          </div>
          <Text variant='body' color='error' className='mb-4'>
            {error}
          </Text>
          <Button onClick={clearSearch} variant='danger' size='md'>
            Tentar Novamente
          </Button>
        </div>
      )}

      {data && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Icons.CheckCircle className='w-6 h-6 text-green-600' />
              <Text variant='h3' weight='semibold'>
                Informações do CEP
              </Text>
            </div>
            <CopyToClipboardButton
              text={data.cep}
              variant='outline'
              size='sm'
              feedbackMessage='CEP copiado!'
            >
              Copiar CEP
            </CopyToClipboardButton>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-3'>
              <LabelValue label='CEP' value={formatCep(data.cep)} />
              <LabelValue
                label='Logradouro'
                value={data.street || 'Não informado'}
              />
              <LabelValue
                label='Bairro'
                value={data.neighborhood || 'Não informado'}
              />
            </div>
            <div className='space-y-3'>
              <LabelValue label='Cidade' value={data.city || 'Não informado'} />
              <LabelValue
                label='Estado'
                value={data.state || 'Não informado'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CepSearcher;
