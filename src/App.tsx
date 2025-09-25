import {
  Base64Converter,
  Button,
  CambioSearcher,
  CaseConverter,
  CepGenerator,
  CepSearcher,
  CnpjGenerator,
  CnpjSearcher,
  CnpjValidator,
  CpfGenerator,
  CpfValidator,
  CreditCardGenerator,
  CreditCardValidator,
  CronGenerator,
  DominiosSearcher,
  FakeCompanyGenerator,
  FeriadosSearcher,
  FiscalDocumentGenerator,
  GlobalDocumentGenerator,
  GlobalDocumentValidator,
  HashGenerator,
  JsonFormatter,
  LoremIpsumGenerator,
  NumberConverter,
  PasswordGenerator,
  PasswordValidator,
  PersonalDocumentGenerator,
  PersonalDocumentValidator,
  RegexTester,
  Sidebar,
  TextCounter,
  TextDeduplicator,
  TextSorter,
  ThemeToggle,
  UuidGenerator,
  UuidValidator,
  VehicleDocumentGenerator,
} from '@/components';
import type { Section } from '@/types';
import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const sectionComponents = {
  cep: CepSearcher,
  cnpj: CnpjSearcher,
  feriados: FeriadosSearcher,
  'registro-br': DominiosSearcher,
  cambio: CambioSearcher,
  'cpf-validator': CpfValidator,
  'cnpj-validator': CnpjValidator,
  'password-validator': PasswordValidator,
  'uuid-validator': UuidValidator,
  'credit-card-validator': CreditCardValidator,
  'personal-document-validator': PersonalDocumentValidator,
  'global-document-validator': GlobalDocumentValidator,
  'cpf-generator': CpfGenerator,
  'cnpj-generator': CnpjGenerator,
  'cep-generator': CepGenerator,
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
  'credit-card-generator': CreditCardGenerator,
  'fake-company-generator': FakeCompanyGenerator,
  'lorem-ipsum-generator': LoremIpsumGenerator,
  'hash-generator': HashGenerator,
  'personal-document-generator': PersonalDocumentGenerator,
  'vehicle-document-generator': VehicleDocumentGenerator,
  'fiscal-document-generator': FiscalDocumentGenerator,
  'global-document-generator': GlobalDocumentGenerator,
  'text-deduplicator': TextDeduplicator,
  'json-formatter': JsonFormatter,
  'text-sorter': TextSorter,
  base64: Base64Converter,
  'regex-tester': RegexTester,
  'case-converter': CaseConverter,
  'text-counter': TextCounter,
  'number-converter': NumberConverter,
  'cron-generator': CronGenerator,
} as const;

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentSection = location.pathname.slice(1) || 'cep';

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/cep', { replace: true });
    }
  }, [location.pathname, navigate]);

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
        <ThemeToggle size='md' />
      </div>

      <div className='fixed top-4 right-4 z-50 lg:block hidden'>
        <ThemeToggle size='md' />
      </div>

      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={currentSection as Section}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className='lg:ml-64 transition-all duration-300'>
        <div className='container mx-auto px-4 py-4 lg:py-8'>
          <div className='max-w-6xl mx-auto'>
            <Routes>
              <Route path='/' element={<Navigate to='/cep' replace />} />
              {Object.entries(sectionComponents).map(([key, Component]) => (
                <Route key={key} path={`/${key}`} element={<Component />} />
              ))}
              <Route path='*' element={<Navigate to='/cep' replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
