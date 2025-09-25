import { Button, Icons, Text } from '@/components';
import { CartaoCredito, type BandeiraCartao } from '@/domain';
import { useState } from 'react';

const CreditCardGenerator = () => {
  const [bandeira, setBandeira] = useState<BandeiraCartao>('visa');
  const [generatedCard, setGeneratedCard] = useState<CartaoCredito | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [multipleResults, setMultipleResults] = useState<CartaoCredito[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const bandeiras = [
    { value: 'visa', label: 'Visa', color: 'bg-blue-600' },
    { value: 'mastercard', label: 'Mastercard', color: 'bg-red-600' },
    { value: 'amex', label: 'American Express', color: 'bg-green-600' },
    { value: 'elo', label: 'Elo', color: 'bg-yellow-600' },
    { value: 'hipercard', label: 'Hipercard', color: 'bg-purple-600' },
  ];

  const quantityOptions = [
    { value: 1, label: '1 Cartão' },
    { value: 5, label: '5 Cartões' },
    { value: 10, label: '10 Cartões' },
    { value: 20, label: '20 Cartões' },
    { value: 50, label: '50 Cartões' },
  ];

  const generateSingleCard = () => {
    const card = CartaoCredito.generate(bandeira);
    setGeneratedCard(card);
    setMultipleResults([]);
  };

  const generateMultipleCards = () => {
    const cards = CartaoCredito.generateMultiple(quantity, bandeira);
    setMultipleResults(cards);
    setGeneratedCard(null);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Cartão copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllCards = async () => {
    if (multipleResults.length === 0) return;

    const allCards = multipleResults.map(card => card.format()).join('\n');
    try {
      await navigator.clipboard.writeText(allCards);
      showCopyFeedback('Todos os cartões copiados!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const clearResults = () => {
    setGeneratedCard(null);
    setMultipleResults([]);
  };

  const currentBandeira = bandeiras.find(b => b.value === bandeira);

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de Cartão de Crédito
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere números de cartão de crédito válidos para testes (algoritmo Luhn)
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Bandeira do Cartão
            </Text>
            <div className='space-y-2'>
              {bandeiras.map(b => (
                <label key={b.value} className='flex items-center'>
                  <input
                    type='radio'
                    name='bandeira'
                    value={b.value}
                    checked={bandeira === b.value}
                    onChange={e =>
                      setBandeira(e.target.value as BandeiraCartao)
                    }
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <div className='flex items-center ml-2 gap-2'>
                    <div className={`w-3 h-3 rounded ${b.color}`}></div>
                    <Text variant='body-sm'>{b.label}</Text>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Quantidade
            </Text>
            <select
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {quantityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex gap-3 mt-6'>
          <Button
            onClick={generateSingleCard}
            icon='Plus'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar 1 Cartão {currentBandeira?.label}
          </Button>

          <Button
            onClick={generateMultipleCards}
            icon='RefreshCw'
            variant='success'
            size='lg'
            fullWidth
          >
            Gerar {quantity} Cartões
          </Button>

          <Button
            onClick={clearResults}
            icon='RotateCcw'
            variant='outline'
            size='lg'
            fullWidth
          >
            Limpar
          </Button>
        </div>
      </div>

      {generatedCard && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              Cartão {currentBandeira?.label} Gerado
            </Text>
            <Button
              onClick={() => copyToClipboard(generatedCard.format())}
              icon='Copy'
              variant='outline'
              size='sm'
            >
              Copiar
            </Button>
          </div>

          <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg'>
            <div className='flex items-center justify-between mb-4'>
              <div
                className={`px-3 py-1 rounded text-white text-sm font-medium ${currentBandeira?.color}`}
              >
                {currentBandeira?.label}
              </div>
              <Icons.CreditCard className='w-8 h-8 text-gray-400' />
            </div>
            <Text variant='h4' className='font-mono text-center tracking-wider'>
              {generatedCard.format()}
            </Text>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} Cartão
              {multipleResults.length > 1 ? 'ões' : ''} {currentBandeira?.label}{' '}
              Gerado
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllCards}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todos
            </Button>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {multipleResults.map((card, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  <Text variant='caption' color='muted' className='w-8'>
                    #{index + 1}
                  </Text>
                  <Text variant='body-sm' className='font-mono break-all'>
                    {card.format()}
                  </Text>
                </div>
                <Button
                  onClick={() => copyToClipboard(card.format())}
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

      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6'>
        <div className='flex items-start gap-3'>
          <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
          <div>
            <Text variant='h5' color='error' weight='medium' className='mb-1'>
              Aviso Importante
            </Text>
            <Text variant='body-sm' color='error'>
              Estes números são gerados apenas para fins de teste e
              desenvolvimento. NÃO use para transações reais ou atividades
              fraudulentas.
            </Text>
          </div>
        </div>
      </div>

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Sobre o Algoritmo Luhn
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Validação:</strong> Todos os números passam no
                algoritmo Luhn
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Prefixos:</strong> Cada bandeira tem prefixos
                específicos
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Comprimento:</strong> Visa/Mastercard (16), Amex (15)
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Apenas para testes de sistemas de
                pagamento
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardGenerator;
