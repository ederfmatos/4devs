import React from 'react';
import { useDominiosSearcher } from './DominiosSearcher.hook';
import Icons from '@/components/Icons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import LabelValue from '@/components/LabelValue';
import Text from '@/components/Text';

const DominiosSearcher = () => {
  const {
    domain,
    setDomain,
    loading,
    error,
    domainInfo,
    searchDomain,
    clearSearch,
  } = useDominiosSearcher();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchDomain();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Globe className='w-6 h-6 text-blue-600' />
          Consulta de Domínios
        </Text>
        <Text variant='body' color='secondary'>
          Verifique informações sobre domínios .br
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex gap-3'>
          <div className='flex-1'>
            <Input
              type='text'
              value={domain}
              onChange={e => setDomain(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='exemplo.com.br'
              size='lg'
              fullWidth
            />
          </div>
          <Button
            onClick={() => searchDomain()}
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
              Buscando informações do domínio...
            </Text>
          </div>
        </div>
      )}

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6'>
          <div className='flex items-center gap-3 mb-3'>
            <Icons.AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
            <Text variant='h4' color='error' weight='semibold'>
              Domínio não encontrado
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

      {domainInfo && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Icons.CheckCircle className='w-6 h-6 text-green-600' />
              <Text variant='h3' weight='semibold'>
                Informações do Domínio
              </Text>
            </div>
            <CopyToClipboardButton
              text={domainInfo.fqdn}
              variant='outline'
              size='sm'
              feedbackMessage='Domínio copiado!'
            >
              Copiar Domínio
            </CopyToClipboardButton>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <LabelValue label='Domínio' value={domainInfo.fqdn} />
            <LabelValue label='Status' value={domainInfo.status} />
            <LabelValue
              label='Expira em'
              value={formatDate(domainInfo['expires-at'])}
            />
          </div>

          {domainInfo.nameservers?.length > 0 && (
            <div className='mt-6'>
              <Text variant='h4' weight='semibold' className='mb-3'>
                Nameservers
              </Text>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {domainInfo.nameservers.map((ns, index) => (
                  <div
                    key={index}
                    className='bg-gray-50 dark:bg-gray-700 p-2 rounded'
                  >
                    <Text variant='body-sm'>{ns}</Text>
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

export default DominiosSearcher;
