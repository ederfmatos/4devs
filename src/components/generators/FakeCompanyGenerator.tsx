import { Button, Icons, Text } from '@/components';
import { EmpresaFake } from '@/domain';
import { useState } from 'react';

const FakeCompanyGenerator = () => {
  const [generatedCompany, setGeneratedCompany] = useState<EmpresaFake | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [multipleResults, setMultipleResults] = useState<EmpresaFake[]>([]);
  const [copyFeedback, setCopyFeedback] = useState('');

  const quantityOptions = [
    { value: 1, label: '1 Empresa' },
    { value: 5, label: '5 Empresas' },
    { value: 10, label: '10 Empresas' },
    { value: 20, label: '20 Empresas' },
  ];

  const generateSingleCompany = () => {
    const company = EmpresaFake.generate();
    setGeneratedCompany(company);
    setMultipleResults([]);
  };

  const generateMultipleCompanies = () => {
    const companies = EmpresaFake.generateMultiple(quantity);
    setMultipleResults(companies);
    setGeneratedCompany(null);
  };

  const copyToClipboard = async (company: EmpresaFake) => {
    const dados = company.getDados();
    const text = `Razão Social: ${dados.razaoSocial}
Nome Fantasia: ${dados.nomeFantasia}
CNPJ: ${dados.cnpj}
Endereço: ${company.getEnderecoCompleto()}
Telefone: ${dados.telefone}
Email: ${dados.email}
Atividade: ${dados.atividade}`;

    try {
      await navigator.clipboard.writeText(text);
      showCopyFeedback('Empresa copiada!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const copyAllCompanies = async () => {
    if (multipleResults.length === 0) return;

    const allCompanies = multipleResults
      .map(company => {
        const dados = company.getDados();
        return `${dados.razaoSocial} | ${dados.cnpj} | ${company.getEnderecoCompleto()}`;
      })
      .join('\n');

    try {
      await navigator.clipboard.writeText(allCompanies);
      showCopyFeedback('Todas as empresas copiadas!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const clearResults = () => {
    setGeneratedCompany(null);
    setMultipleResults([]);
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Gerador de Empresa Fake
        </Text>
        <Text variant='body-lg' color='secondary'>
          Gere dados completos de empresas fictícias para testes
        </Text>
      </div>

      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <Text variant='h5' weight='semibold' className='mb-4'>
          Configurações
        </Text>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
            onClick={generateSingleCompany}
            icon='Plus'
            variant='primary'
            size='lg'
            fullWidth
          >
            Gerar 1 Empresa
          </Button>

          <Button
            onClick={generateMultipleCompanies}
            icon='RefreshCw'
            variant='success'
            size='lg'
            fullWidth
          >
            Gerar {quantity} Empresas
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

      {generatedCompany && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              Empresa Gerada
            </Text>
            <Button
              onClick={() => copyToClipboard(generatedCompany)}
              icon='Copy'
              variant='outline'
              size='sm'
            >
              Copiar
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-3'>
              <div>
                <Text variant='label' color='primary'>
                  Razão Social
                </Text>
                <Text variant='body-sm' className='font-mono'>
                  {generatedCompany.getRazaoSocial()}
                </Text>
              </div>
              <div>
                <Text variant='label' color='primary'>
                  Nome Fantasia
                </Text>
                <Text variant='body-sm' className='font-mono'>
                  {generatedCompany.getNomeFantasia()}
                </Text>
              </div>
              <div>
                <Text variant='label' color='primary'>
                  CNPJ
                </Text>
                <Text variant='body-sm' className='font-mono'>
                  {generatedCompany.getCnpj()}
                </Text>
              </div>
              <div>
                <Text variant='label' color='primary'>
                  Telefone
                </Text>
                <Text variant='body-sm' className='font-mono'>
                  {generatedCompany.getDados().telefone}
                </Text>
              </div>
            </div>

            <div className='space-y-3'>
              <div>
                <Text variant='label' color='primary'>
                  Email
                </Text>
                <Text variant='body-sm' className='font-mono'>
                  {generatedCompany.getDados().email}
                </Text>
              </div>
              <div>
                <Text variant='label' color='primary'>
                  Atividade
                </Text>
                <Text variant='body-sm'>
                  {generatedCompany.getDados().atividade}
                </Text>
              </div>
              <div>
                <Text variant='label' color='primary'>
                  Endereço Completo
                </Text>
                <Text variant='body-sm'>
                  {generatedCompany.getEnderecoCompleto()}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}

      {multipleResults.length > 0 && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h3' weight='semibold'>
              {multipleResults.length} Empresa
              {multipleResults.length > 1 ? 's' : ''} Gerada
              {multipleResults.length > 1 ? 's' : ''}
            </Text>
            <Button
              onClick={copyAllCompanies}
              icon='Copy'
              variant='primary'
              size='md'
            >
              Copiar Todas
            </Button>
          </div>

          <div className='space-y-3 max-h-96 overflow-y-auto'>
            {multipleResults.map((company, index) => (
              <div
                key={index}
                className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <Text variant='body-sm' weight='medium'>
                      {company.getRazaoSocial()}
                    </Text>
                    <Text variant='caption' color='secondary' className='block'>
                      CNPJ: {company.getCnpj()}
                    </Text>
                    <Text variant='caption' color='secondary' className='block'>
                      {company.getEnderecoCompleto()}
                    </Text>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(company)}
                    className='px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200'
                  >
                    <Icons.Copy className='w-4 h-4' />
                  </Button>
                </div>
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
              Dados Gerados
            </Text>
            <div className='space-y-1'>
              <Text variant='body-sm' color='info'>
                • <strong>Razão Social:</strong> Nome oficial da empresa
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>CNPJ:</strong> Gerado com dígitos verificadores
                válidos
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Endereço:</strong> Dados fictícios de localização
              </Text>
              <Text variant='body-sm' color='info'>
                • <strong>Contato:</strong> Telefone e email fictícios
              </Text>
              <Text variant='body-sm' color='info'>
                • Todos os dados são fictícios e apenas para testes
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeCompanyGenerator;
