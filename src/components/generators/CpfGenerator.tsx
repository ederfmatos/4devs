import { Button, Icons, Text } from '@/components';
import { Cpf, type EstadoCpf } from '@/domain';
import { useState } from 'react';

const CpfGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [estado, setEstado] = useState<EstadoCpf | undefined>(undefined);
  const [generatedCpfs, setGeneratedCpfs] = useState<Cpf[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const estados = [
    { value: undefined, label: 'Qualquer Estado' },
    { value: 'RS', label: 'Rio Grande do Sul (RS)' },
    { value: 'DF-GO-MS-TO', label: 'DF, GO, MS, TO' },
    { value: 'MT', label: 'Mato Grosso (MT)' },
    { value: 'BA-SE', label: 'Bahia, Sergipe (BA, SE)' },
    { value: 'PR', label: 'Paraná (PR)' },
    { value: 'CE-MA-PI', label: 'CE, MA, PI' },
    { value: 'PE-RN-PB-AL', label: 'PE, RN, PB, AL' },
    { value: 'MG', label: 'Minas Gerais (MG)' },
    { value: 'RJ-ES', label: 'Rio de Janeiro, Espírito Santo (RJ, ES)' },
    { value: 'SP', label: 'São Paulo (SP)' },
    { value: 'RO-AC-AM-RR-AP-PA', label: 'RO, AC, AM, RR, AP, PA' },
  ];

  const quantityOptions = [
    { value: 1, label: '1 CPF' },
    { value: 5, label: '5 CPFs' },
    { value: 10, label: '10 CPFs' },
    { value: 20, label: '20 CPFs' },
    { value: 50, label: '50 CPFs' },
    { value: 100, label: '100 CPFs' },
  ];

  const generateCpfs = () => {
    if (quantity < 1 || quantity > 100) {
      return;
    }

    const cpfs = Cpf.generateMultiple(quantity, estado);
    setGeneratedCpfs(cpfs);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('CPF copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllCpfs = async () => {
    if (generatedCpfs.length === 0) return;

    const cpfsText = generatedCpfs.map(cpf => cpf.format()).join('\n');

    try {
      await navigator.clipboard.writeText(cpfsText);
      showCopyFeedback('Todos os CPFs copiados!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const clearResults = () => {
    setGeneratedCpfs([]);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de CPF
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere CPFs válidos aleatoriamente com opção de estado específico
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Text variant='label' color='primary' className='mb-2'>
              Estado/Região
            </Text>
            <select
              value={estado || ''}
              onChange={e => setEstado(e.target.value || undefined)}
              className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            >
              {estados.map(est => (
                <option key={est.value || 'any'} value={est.value || ''}>
                  {est.label}
                </option>
              ))}
            </select>
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
            onClick={generateCpfs}
            icon='RefreshCw'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar {quantity} CPF{quantity > 1 ? 's' : ''}
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

      {generatedCpfs.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {generatedCpfs.length} CPF{generatedCpfs.length > 1 ? 's' : ''}{' '}
              Gerado{generatedCpfs.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllCpfs}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todos
            </Button>
          </div>

          <div className='space-y-2 max-h-96 overflow-y-auto'>
            {generatedCpfs.map((cpf, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  <Text variant='caption' color='muted' className='w-8'>
                    #{index + 1}
                  </Text>
                  <div>
                    <Text variant='body-sm' className='font-mono'>
                      {cpf.format()}
                    </Text>
                    <Text variant='caption' color='secondary'>
                      Estado: {cpf.getEstado() || 'N/A'}
                    </Text>
                  </div>
                </div>
                <Button
                  onClick={() => copyToClipboard(cpf.format())}
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

      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Sobre o CPF
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Estrutura:</strong> 11 dígitos com 2 dígitos
                verificadores
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>9º Dígito:</strong> Indica a região fiscal de emissão
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Validação:</strong> Algoritmo oficial da Receita
                Federal
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Uso:</strong> Apenas para testes de sistemas
              </Text>
              <Text variant='body-sm' color='info'>
                • Todos os CPFs gerados são válidos mas fictícios
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CpfGenerator;
