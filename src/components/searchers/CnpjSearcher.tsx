import React from 'react';
import { useCnpjSearcher } from './CnpjSearcher.hook';
import Icons from '@/components/Icons';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CopyToClipboardButton from '@/components/CopyToClipboardButton';
import LabelValue from '@/components/LabelValue';
import Text from '@/components/Text';

const CnpjSearcher = () => {
  const {
    cnpj,
    setCnpj,
    loading,
    error,
    data,
    formatCnpj,
    searchCnpj,
    clearSearch,
  } = useCnpjSearcher();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchCnpj();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Building className='w-6 h-6 text-blue-600' />
          Consulta CNPJ
        </Text>
        <Text variant='body' color='secondary'>
          Digite um CNPJ para buscar informações da empresa
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
              maxLength={18}
              size='lg'
              fullWidth
            />
          </div>
          <Button
            onClick={() => searchCnpj()}
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
              Buscando informações do CNPJ...
            </Text>
          </div>
        </div>
      )}

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6'>
          <div className='flex items-center gap-3 mb-3'>
            <Icons.AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
            <Text variant='h4' color='error' weight='semibold'>
              CNPJ não encontrado
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
        <div className='space-y-6'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-3'>
                <Icons.CheckCircle className='w-6 h-6 text-green-600' />
                <Text variant='h3' color='primary' weight='semibold'>
                  Informações da Empresa
                </Text>
              </div>
              <CopyToClipboardButton
                text={data.cnpj}
                variant='outline'
                size='sm'
                feedbackMessage='CNPJ copiado!'
              >
                Copiar CNPJ
              </CopyToClipboardButton>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-3'>
                <LabelValue
                  label='CNPJ'
                  value={data.cnpj}
                  valueClassName='font-semibold'
                />
                <LabelValue label='Razão Social' value={data.razao_social} />
                <LabelValue
                  label='Nome Fantasia'
                  value={data.nome_fantasia || 'Não informado'}
                />
                <LabelValue
                  label='Data de Início'
                  value={formatDate(data.data_inicio_atividade)}
                />
              </div>
              <div className='space-y-3'>
                <LabelValue
                  label='Natureza Jurídica'
                  value={data.natureza_juridica}
                />
                <LabelValue label='Porte' value={data.porte} />
                <LabelValue
                  label='Situação'
                  value={data.descricao_situacao_cadastral}
                />
                <LabelValue
                  label='Capital Social'
                  value={formatCurrency(data.capital_social)}
                />
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
            <Text
              variant='h4'
              color='primary'
              weight='semibold'
              className='mb-4'
            >
              Endereço
            </Text>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-3'>
                <LabelValue
                  label='Logradouro'
                  value={`${data.descricao_tipo_de_logradouro} ${data.logradouro}`}
                />
                <LabelValue label='Número' value={data.numero} />
                <LabelValue
                  label='Complemento'
                  value={data.complemento || 'Não informado'}
                />
                <LabelValue label='Bairro' value={data.bairro} />
              </div>
              <div className='space-y-3'>
                <LabelValue label='Município' value={data.municipio} />
                <LabelValue label='UF' value={data.uf} />
                <LabelValue label='CEP' value={data.cep} />
                <LabelValue
                  label='Telefone'
                  value={data.ddd_telefone_1 || 'Não informado'}
                />
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
            <Text
              variant='h4'
              color='primary'
              weight='semibold'
              className='mb-4'
            >
              Informações Adicionais
            </Text>
            <LabelValue
              label='CNAE Fiscal'
              value={`${data.cnae_fiscal} - ${data.cnae_fiscal_descricao}`}
              valueClassName='truncate mx-2'
              className='truncate'
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-3'>
                <LabelValue
                  label='Matriz/Filial'
                  value={data.descricao_identificador_matriz_filial}
                />
                <LabelValue
                  label='Opção pelo MEI'
                  value={data.opcao_pelo_mei ? 'Sim' : 'Não'}
                />
                <LabelValue
                  label='Opção pelo Simples'
                  value={data.opcao_pelo_simples ? 'Sim' : 'Não'}
                />
              </div>
              <div className='space-y-3'>
                <LabelValue
                  label='Email'
                  value={data.email || 'Não informado'}
                />
                <LabelValue
                  label='Fax'
                  value={data.ddd_fax || 'Não informado'}
                />
                <LabelValue
                  label='Telefone 2'
                  value={data.ddd_telefone_2 || 'Não informado'}
                />
                <LabelValue
                  label='Situação Especial'
                  value={data.situacao_especial || 'Não informado'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CnpjSearcher;
