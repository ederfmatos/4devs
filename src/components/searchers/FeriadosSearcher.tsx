import Button from '@/components/Button';
import Icons from '@/components/Icons';
import Select from '@/components/Select';
import Text from '@/components/Text';
import { useFeriadosSearcher } from './FeriadosSearcher.hook';

const FeriadosSearcher = () => {
  const {
    year,
    loading,
    error,
    feriados,
    getFeriadosByMonth,
    searchFeriados,
    formatDate,
    getDayOfWeek,
    getMonthName,
  } = useFeriadosSearcher();

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const yearOption = new Date().getFullYear() + i;
    return {
      value: yearOption.toString(),
      label: yearOption.toString(),
    };
  });

  const feriadosByMonth = getFeriadosByMonth();

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Calendar className='w-6 h-6 text-blue-600' />
          Feriados Nacionais
        </Text>
        <Text variant='body' color='secondary'>
          Consulte os feriados nacionais por ano
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between'>
          <div>
            <Text variant='h3' weight='semibold'>
              Feriados {year}
            </Text>
            <Text variant='body-sm' color='secondary'>
              Total de {feriados.length} feriados encontrados
            </Text>
          </div>
          <div className='w-48'>
            <Select
              value={year.toString()}
              onChange={e => searchFeriados(Number(e.target.value))}
              options={yearOptions}
              label='Ano'
              size='md'
              fullWidth
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-center gap-3'>
            <Icons.RefreshCw className='animate-spin h-6 w-6 text-blue-600' />
            <Text variant='body' color='secondary'>
              Buscando feriados...
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
          <Button
            onClick={() => searchFeriados(year)}
            variant='danger'
            size='md'
          >
            Tentar Novamente
          </Button>
        </div>
      )}

      {feriados.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Object.entries(feriadosByMonth).map(([month, monthFeriados]) => (
            <div
              key={month}
              className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'
            >
              <Text
                variant='h4'
                weight='semibold'
                className='mb-4 flex items-center gap-2'
              >
                <Icons.Calendar className='w-5 h-5 text-blue-600' />
                {getMonthName(Number(month))}
              </Text>
              <div className='space-y-3'>
                {monthFeriados.map((feriado, index) => (
                  <div
                    key={index}
                    className='border-l-4 border-blue-500 pl-3 gap-1 flex flex-col'
                  >
                    <Text variant='body' weight='medium' as='p'>
                      {feriado.name}
                    </Text>
                    <Text variant='body-sm' color='secondary' as='p'>
                      {formatDate(feriado.date)} - {getDayOfWeek(feriado.date)}
                    </Text>
                    <Text
                      variant='caption'
                      color='muted'
                      className='mt-1'
                      as='p'
                    >
                      {feriado.type}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {feriados.length === 0 && !loading && !error && (
        <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6'>
          <div className='flex items-center gap-3'>
            <Icons.Info className='w-6 h-6 text-yellow-600 dark:text-yellow-400' />
            <div>
              <Text variant='h4' color='warning' weight='semibold'>
                Nenhum feriado encontrado
              </Text>
              <Text variant='body' color='warning' as='p'>
                Não foram encontrados feriados para o ano {year}.
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeriadosSearcher;
