import { useState } from 'react'
import type { Section } from '@/types'
import Sidebar from '@/components/Sidebar'
import CepSearcher from '@/components/searchers/CepSearcher'
import CnpjSearcher from '@/components/searchers/CnpjSearcher'
import FeriadosSearcher from '@/components/searchers/FeriadosSearcher'
import DominiosSearcher from '@/components/searchers/DominiosSearcher'
import CambioSearcher from '@/components/searchers/CambioSearcher'
import CpfValidator from '@/components/validators/CpfValidator'
import CnpjValidator from '@/components/validators/CnpjValidator'
import CpfGenerator from '@/components/generators/CpfGenerator'
import CnpjGenerator from '@/components/generators/CnpjGenerator'
import CepGenerator from '@/components/generators/CepGenerator'
import PasswordGenerator from '@/components/generators/PasswordGenerator'
import UuidGenerator from '@/components/generators/UuidGenerator'
import Button from '@/components/Button'

const sectionComponents = {
  'cep': CepSearcher,
  'cnpj': CnpjSearcher,
  'feriados': FeriadosSearcher,
  'registro-br': DominiosSearcher,
  'cambio': CambioSearcher,
  'cpf-validator': CpfValidator,
  'cnpj-validator': CnpjValidator,
  'cpf-generator': CpfGenerator,
  'cnpj-generator': CnpjGenerator,
  'cep-generator': CepGenerator,
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
} as const

function App() {
  const [activeSection, setActiveSection] = useState<Section>('cep')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderSection = () => {
    const Component = sectionComponents[activeSection]
    return Component ? <Component /> : <CepSearcher />
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 lg:hidden z-50 p-3 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        onSectionChange={(section: Section) => setActiveSection(section)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 lg:py-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
