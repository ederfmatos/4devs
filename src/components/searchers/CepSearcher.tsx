import { useCepSearcher } from './CepSearcher.hook'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Input from '@/components/Input'
import CopyToClipboardButton from '@/components/CopyToClipboardButton'
import LabelValue from '@/components/LabelValue'

const CepSearcher = () => {
    const {
        cep,
        setCep,
        loading,
        error,
        data,
        formatCep,
        searchCep,
        clearSearch
    } = useCepSearcher()

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            searchCep()
        }
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Search className="w-6 h-6 text-blue-600" />
                    Consulta CEP
                </h2>
                <p className="text-gray-600">Digite um CEP para buscar informações do endereço</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            type="text"
                            value={cep}
                            onChange={(e) => setCep(formatCep(e.target.value))}
                            onKeyPress={handleKeyPress}
                            placeholder="00000-000"
                            maxLength={9}
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <Button
                        onClick={() => searchCep()}
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
                        <span className="text-gray-600">Buscando informações do CEP...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Icons.AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-red-800 font-semibold">CEP não encontrado</h3>
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

            {data && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                            <h3 className="text-gray-900 font-semibold text-lg">Informações do CEP</h3>
                        </div>
                        <CopyToClipboardButton
                            text={data.cep}
                            variant="outline"
                            size="sm"
                            feedbackMessage="CEP copiado!"
                        >
                            Copiar CEP
                        </CopyToClipboardButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <LabelValue
                                label="CEP"
                                value={formatCep(data.cep)}
                            />
                            <LabelValue
                                label="Logradouro"
                                value={data.street || 'Não informado'}
                            />
                            <LabelValue
                                label="Bairro"
                                value={data.neighborhood || 'Não informado'}
                            />
                        </div>
                        <div className="space-y-3">
                            <LabelValue
                                label="Cidade"
                                value={data.city || 'Não informado'}
                            />
                            <LabelValue
                                label="Estado"
                                value={data.state || 'Não informado'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CepSearcher 