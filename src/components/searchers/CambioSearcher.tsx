import { Button, Icons, LabelValue, Text } from '@/components';
import { useCambioSearcher } from './CambioSearcher.hook';

const CambioSearcher = () => {
  const {
    loading,
    error,
    cambioData,
    fetchCambio,
    formatCurrency,
    formatPercentage,
    getVariationColor,
  } = useCambioSearcher();

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.RefreshCw className='w-6 h-6 text-blue-600' />
          Cotações de Câmbio
        </Text>
        <Text variant='body' color='secondary'>
          Cotações em tempo real das principais moedas
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <Text variant='h3' weight='semibold'>
              Cotações Atualizadas
            </Text>
            <Text variant='body-sm' color='secondary'>
              Última atualização:{' '}
              {cambioData.length > 0
                ? new Date(cambioData[0].timestamp).toLocaleString('pt-BR')
                : 'Carregando...'}
            </Text>
          </div>
          <div className='flex gap-3'>
            <Button
              onClick={fetchCambio}
              loading={loading}
              icon='RefreshCw'
              variant='primary'
              size='md'
            >
              {loading ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-center gap-3'>
            <Icons.RefreshCw className='animate-spin h-6 w-6 text-blue-600' />
            <Text variant='body' color='secondary'>
              Buscando cotações de câmbio...
            </Text>
          </div>
        </div>
      )}

      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6'>
          <div className='flex items-center gap-3 mb-3'>
            <Icons.AlertCircle className='w-6 h-6 text-red-600 dark:text-red-400' />
            <Text variant='h4' color='error' weight='semibold'>
              Erro na busca
            </Text>
          </div>
          <Text variant='body' color='error' className='mb-4'>
            {error}
          </Text>
          <Button onClick={fetchCambio} variant='danger' size='md'>
            Tentar Novamente
          </Button>
        </div>
      )}

      {cambioData.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cambioData.map((cambio, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200'
            >
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <Text variant='h4' weight='semibold'>
                    {cambio.name}
                  </Text>
                  <Text variant='body-sm' color='secondary'>
                    {cambio.code}/{cambio.codein}
                  </Text>
                </div>
              </div>

              <div className='space-y-3'>
                <LabelValue label='Compra' value={formatCurrency(cambio.bid)} />
                <LabelValue label='Venda' value={formatCurrency(cambio.ask)} />
                <LabelValue
                  label='Variação'
                  value={formatPercentage(cambio.pctChange)}
                  valueClassName={`font-semibold ${getVariationColor(cambio.pctChange)}`}
                />
                <LabelValue
                  label='Máxima'
                  value={formatCurrency(cambio.high)}
                />
                <LabelValue label='Mínima' value={formatCurrency(cambio.low)} />
              </div>

              <div className='mt-4 pt-3 border-t border-gray-200 dark:border-gray-700'>
                <Text variant='caption' color='muted'>
                  Atualizado:{' '}
                  {new Date(cambio.timestamp).toLocaleTimeString('pt-BR')}
                </Text>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Sobre as Cotações
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Cotações em Tempo Real:</strong> Dados atualizados
                constantemente
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Compra/Venda:</strong> Valores para compra e venda das
                moedas
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Variação:</strong> Mudança percentual em relação ao
                fechamento anterior
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Máxima/Mínima:</strong> Valores extremos do dia
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CambioSearcher;
