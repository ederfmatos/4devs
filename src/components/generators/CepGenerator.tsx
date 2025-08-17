import {
    Button,
    CopyToClipboardButton,
    Icons,
    Select,
    Text,
} from '@/components';
import { useCepGenerator } from './CepGenerator.hook';

const CepGenerator = () => {
  const {
    quantity,
    setQuantity,
    generatedCeps,
    showCopyFeedback,
    generateCeps,
    clearResults,
    copyAllCeps,
  } = useCepGenerator();

  return (
    <div>
      <div className='text-center mb-8'>
        <Text
          variant='h2'
          className='mb-2 flex items-center justify-center gap-2'
        >
          <Icons.Search className='w-6 h-6 text-blue-600' />
          Gerador de CEP
        </Text>
        <Text variant='body' color='secondary'>
          Gere CEPs válidos para testes e desenvolvimento
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Quantidade
            </Text>

            <Select
              options={[
                { value: 1, label: '1' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 50, label: '50' },
              ]}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className='md:col-span-1 flex gap-3'>
            <Button
              onClick={generateCeps}
              icon='RefreshCw'
              variant='primary'
              size='md'
              className='flex-1'
            >
              Gerar CEPs
            </Button>
            {generatedCeps.length > 0 && (
              <Button
                onClick={clearResults}
                icon='AlertCircle'
                variant='danger'
                size='md'
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
      </div>

      {generatedCeps.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-3'>
              <Icons.CheckCircle className='w-6 h-6 text-green-600' />
              <Text variant='h3' weight='semibold'>
                {generatedCeps.length} CEP{generatedCeps.length > 1 ? 's' : ''}{' '}
                Gerado{generatedCeps.length > 1 ? 's' : ''}
              </Text>
            </div>
            <Button onClick={copyAllCeps} variant='outline' size='sm'>
              Copiar Todos
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {generatedCeps.map((cep, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <Text variant='body' className='font-mono'>
                  {cep.format()}
                </Text>
                <CopyToClipboardButton
                  text={cep.format()}
                  variant='ghost'
                  size='sm'
                  feedbackMessage='CEP copiado!'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showCopyFeedback && (
        <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300'>
          CEPs copiados!
        </div>
      )}
    </div>
  );
};

export default CepGenerator;
