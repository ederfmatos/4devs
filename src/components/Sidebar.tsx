import { Icons, Text } from '@/components';
import type { Section } from '@/types';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const sections = [
  {
    id: 'cep' as Section,
    title: 'Consulta CEP',
    icon: 'Search',
    description: 'Busque informações de endereços por CEP',
    category: 'Buscadores',
  },
  {
    id: 'cnpj' as Section,
    title: 'Consulta CNPJ',
    icon: 'Building',
    description: 'Busque informações de empresas por CNPJ',
    category: 'Buscadores',
  },
  {
    id: 'feriados' as Section,
    title: 'Feriados',
    icon: 'Calendar',
    description: 'Consulte feriados nacionais e estaduais',
    category: 'Buscadores',
  },
  {
    id: 'registro-br' as Section,
    title: 'Consulta Domínios',
    icon: 'Globe',
    description: 'Verifique disponibilidade de domínios .br',
    category: 'Buscadores',
  },
  {
    id: 'cambio' as Section,
    title: 'Cotações de Câmbio',
    icon: 'RefreshCw',
    description: 'Cotações em tempo real das principais moedas',
    category: 'Buscadores',
  },
  {
    id: 'cpf-validator' as Section,
    title: 'Validador de CPF',
    icon: 'CreditCard',
    description: 'Valide CPFs usando o algoritmo oficial',
    category: 'Validadores',
  },
  {
    id: 'cnpj-validator' as Section,
    title: 'Validador de CNPJ',
    icon: 'Building',
    description: 'Valide CNPJs usando o algoritmo oficial',
    category: 'Validadores',
  },
  {
    id: 'password-validator' as Section,
    title: 'Validador de Senha',
    icon: 'Key',
    description: 'Valide a força e segurança de senhas',
    category: 'Validadores',
  },
  {
    id: 'cpf-generator' as Section,
    title: 'Gerador de CPF',
    icon: 'CreditCard',
    description: 'Gere CPFs válidos aleatoriamente',
    category: 'Geradores',
  },
  {
    id: 'cnpj-generator' as Section,
    title: 'Gerador de CNPJ',
    icon: 'Building',
    description: 'Gere CNPJs válidos aleatoriamente',
    category: 'Geradores',
  },
  {
    id: 'cep-generator' as Section,
    title: 'Gerador de CEP',
    icon: 'Search',
    description: 'Gere CEPs válidos para testes',
    category: 'Geradores',
  },
  {
    id: 'password-generator' as Section,
    title: 'Gerador de Senha',
    icon: 'Key',
    description: 'Gere senhas seguras e personalizadas',
    category: 'Geradores',
  },
  {
    id: 'uuid-generator' as Section,
    title: 'Gerador de UUID',
    icon: 'Hash',
    description: 'Gere UUIDs em diferentes versões',
    category: 'Geradores',
  },
  {
    id: 'text-deduplicator' as Section,
    title: 'Removedor de Duplicatas',
    icon: 'FileText',
    description: 'Remova linhas duplicadas de qualquer texto',
    category: 'Texto',
  },
  {
    id: 'json-formatter' as Section,
    title: 'Formatador de JSON',
    icon: 'FileText',
    description: 'Formate e valide JSON de forma rápida',
    category: 'Texto',
  },
  {
    id: 'text-sorter' as Section,
    title: 'Ordenador de Linhas',
    icon: 'FileText',
    description: 'Ordene linhas alfabeticamente',
    category: 'Texto',
  },
];

export default function Sidebar({
  activeSection,
  onSectionChange,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Search: Icons.Search,
      Building: Icons.Building,
      Calendar: Icons.Calendar,
      Globe: Icons.Globe,
      RefreshCw: Icons.RefreshCw,
      CreditCard: Icons.CreditCard,
      Key: Icons.Key,
      Hash: Icons.Hash,
      FileText: Icons.FileText,
    };
    return iconMap[iconName] || Icons.Search;
  };

  // Agrupar seções por categoria
  const groupedSections = sections.reduce(
    (acc, section) => {
      if (!acc[section.category]) {
        acc[section.category] = [];
      }
      acc[section.category].push(section);
      return acc;
    },
    {} as { [key: string]: typeof sections },
  );

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center'>
                <Icons.Settings className='w-6 h-6 text-white' />
              </div>
              <div>
                <Text variant='h4' weight='bold' className='text-blue-600'>
                  4Devs
                </Text>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 overflow-y-auto p-4'>
            <div className='space-y-6'>
              {Object.entries(groupedSections).map(
                ([category, categorySections]) => (
                  <div key={category}>
                    <Text
                      variant='body-sm'
                      weight='semibold'
                      color='muted'
                      className='mb-3 px-2 uppercase tracking-wide'
                    >
                      {category}
                    </Text>
                    <div className='space-y-1'>
                      {categorySections.map(section => {
                        const IconComponent = getIconComponent(section.icon);
                        const isActive = activeSection === section.id;

                        return (
                          <button
                            key={section.id}
                            onClick={() => {
                              onSectionChange(section.id);
                              if (onClose) onClose();
                            }}
                            className={`
                            w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200
                            ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }
                          `}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${
                                isActive
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            />
                            <div className='flex-1 min-w-0'>
                              <Text
                                variant='body-sm'
                                weight={isActive ? 'medium' : 'normal'}
                                className='truncate'
                              >
                                {section.title}
                              </Text>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ),
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='text-center'>
              <Text variant='caption' color='muted'>
                © 2025 4Devs
              </Text>
              <Text variant='caption' color='muted' className='block mt-1'>
                Ferramentas gratuitas para desenvolvedores
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
