import {
  Button,
  CambioSearcher,
  CepGenerator,
  CepSearcher,
  CnpjGenerator,
  CnpjSearcher,
  CnpjValidator,
  CpfGenerator,
  CpfValidator,
  DominiosSearcher,
  FeriadosSearcher,
  JsonFormatter,
  PasswordGenerator,
  PasswordValidator,
  Sidebar,
  TextDeduplicator,
  TextSorter,
  ThemeToggle,
  UuidGenerator,
} from '@/components';
import type { Section } from '@/types';
import { useState } from 'react';

const sectionComponents = {
  cep: CepSearcher,
  cnpj: CnpjSearcher,
  feriados: FeriadosSearcher,
  'registro-br': DominiosSearcher,
  cambio: CambioSearcher,
  'cpf-validator': CpfValidator,
  'cnpj-validator': CnpjValidator,
  'password-validator': PasswordValidator,
  'cpf-generator': CpfGenerator,
  'cnpj-generator': CnpjGenerator,
  'cep-generator': CepGenerator,
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
  'text-deduplicator': TextDeduplicator,
  'json-formatter': JsonFormatter,
  'text-sorter': TextSorter,
} as const;

function App() {
  const [activeSection, setActiveSection] = useState<Section>('cep');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    const Component = sectionComponents[activeSection];
    return Component ? <Component /> : <CepSearcher />;
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200'>
      <div className='fixed top-4 left-4 lg:hidden z-50 flex gap-2'>
        <Button
          onClick={() => setSidebarOpen(true)}
          className='p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600'
        >
          <svg
            className='w-6 h-6 text-gray-600 dark:text-gray-300'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </Button>
      </div>

      <div className='fixed top-4 right-4 z-50 block'>
        <ThemeToggle size='md' />
      </div>

      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        onSectionChange={(section: Section) => setActiveSection(section)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className='lg:ml-64 transition-all duration-300'>
        <div className='container mx-auto px-4 py-4 lg:py-8'>
          <div className='max-w-6xl mx-auto'>{renderSection()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
