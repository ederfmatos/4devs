import { useDominiosSearcher } from './DominiosSearcher.hook'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Input from '@/components/Input'
import CopyToClipboardButton from '@/components/CopyToClipboardButton'
import LabelValue from '@/components/LabelValue'

const DominiosSearcher = () => {
    const {
        domain,
        setDomain,
        loading,
        error,
        domainInfo,
        searchDomain,
        clearSearch
    } = useDominiosSearcher()

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchDomain()
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Globe className="w-6 h-6 text-blue-600" />
                    Consulta de Domínios
                </h2>
                <p className="text-gray-600">Verifique informações sobre domínios .br</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            type="text"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="exemplo.com.br"
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <Button
                        onClick={() => searchDomain()}
                        loading={loading}
                        icon="Search"
                        variant="primary"
                        size="lg"
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </div>
            </div>

            {loading && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-center gap-3">
                        <Icons.RefreshCw className="animate-spin h-6 w-6 text-blue-600" />
                        <span className="text-gray-600">Buscando informações do domínio...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Icons.AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-red-800 font-semibold">Domínio não encontrado</h3>
                    </div>
                    <p className="text-red-700 mb-4">{error}</p>
                    <Button
                        onClick={clearSearch}
                        variant="danger"
                        size="md"
                    >
                        Tentar Novamente
                    </Button>
                </div>
            )}

            {domainInfo && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                            <h3 className="text-gray-900 font-semibold text-lg">Informações do Domínio</h3>
                        </div>
                        <CopyToClipboardButton
                            text={domainInfo.fqdn}
                            variant="outline"
                            size="sm"
                            feedbackMessage="Domínio copiado!"
                        >
                            Copiar Domínio
                        </CopyToClipboardButton>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <LabelValue label="Domínio" value={domainInfo.fqdn} />
                        <LabelValue label="Status" value={domainInfo.status} />
                        <LabelValue label="Expira em" value={formatDate(domainInfo['expires-at'])} />
                    </div>

                    {domainInfo.nameservers?.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-gray-900 font-semibold mb-3">Nameservers</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {domainInfo.nameservers.map((ns, index) => (
                                    <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                                        {ns}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default DominiosSearcher 