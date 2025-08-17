import type { Section, SidebarProps, NavItemProps } from '@/types'
import Icons from '@/components/Icons'
import Button from '@/components/Button'

const NavItem = ({ icon, children, isActive, onClick }: NavItemProps) => (
    <Button
        onClick={onClick}
        className={`w-full px-6 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 text-left `}
        variant={isActive ? 'primary' : 'ghost'}
        size='sm'
    >
        {/* ${isActive
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-transparent gray-600'
        } */}
        <span className="w-5 h-5 flex-shrink-0">{icon}</span>
        <span className='w-full' >{children}</span>
    </Button>
)

const sections = [
    {
        name: 'Buscadores',
        items: [
            { name: 'CEP', icon: <Icons.Search className="w-5 h-5" />, section: 'cep' },
            { name: 'CNPJ', icon: <Icons.Building className="w-5 h-5" />, section: 'cnpj' },
            { name: 'Feriados', icon: <Icons.Calendar className="w-5 h-5" />, section: 'feriados' },
            { name: 'Domínios', icon: <Icons.Globe className="w-5 h-5" />, section: 'registro-br' },
            { name: 'Câmbio', icon: <Icons.RefreshCw className="w-5 h-5" />, section: 'cambio' },
        ]
    },
    {
        name: 'Validadores',
        items: [
            { name: 'CPF', icon: <Icons.Users className="w-5 h-5" />, section: 'cpf-validator' },
            { name: 'CNPJ', icon: <Icons.Building className="w-5 h-5" />, section: 'cnpj-validator' },
        ]
    },
    {
        name: 'Geradores',
        items: [
            { name: 'CPF', icon: <Icons.CreditCard className="w-5 h-5" />, section: 'cpf-generator' },
            { name: 'CNPJ', icon: <Icons.Building className="w-5 h-5" />, section: 'cnpj-generator' },
            { name: 'CEP', icon: <Icons.Search className="w-5 h-5" />, section: 'cep-generator' },
            { name: 'Senha', icon: <Icons.Key className="w-5 h-5" />, section: 'password-generator' },
            { name: 'UUID', icon: <Icons.Hash className="w-5 h-5" />, section: 'uuid-generator' },
        ]
    }
]

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) => {
    const handleSectionChange = (section: Section) => {
        onSectionChange(section)
        onClose()
    }

    return (
        <aside className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                    <Icons.Globe className="w-6 h-6 text-blue-600" />
                    <h2 className="font-semibold text-gray-900">4Devs</h2>
                </div>
                <Button
                    onClick={onClose}
                    className="lg:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                    <Icons.Settings className="w-6 h-6 text-gray-600" />
                </Button>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {sections.map((section) => (
                        <li key={section.name}>
                            <p className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {section.name}
                            </p>

                            <ul className="space-y-1">
                                {section.items.map((item) => (
                                    <NavItem
                                        key={item.name}
                                        section={item.section}
                                        icon={item.icon}
                                        isActive={activeSection === item.section}
                                        onClick={() => handleSectionChange(item.section as Section)}
                                    >
                                        {item.name}
                                    </NavItem>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
                <div className="text-center">
                    <p className="text-xs text-gray-500 font-medium">
                        Ferramentas para desenvolvedores
                    </p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar 