import { useCambioSearcher } from './CambioSearcher.hook'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import LabelValue from '@/components/LabelValue'

const CambioSearcher = () => {
    const {
        loading,
        error,
        cambioData,
        fetchCambio,
        formatCurrency,
        formatPercentage,
        getVariationColor
    } = useCambioSearcher()

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.RefreshCw className="w-6 h-6 text-blue-600" />
                    Cotações de Câmbio
                </h2>
                <p className="text-gray-600">Cotações em tempo real das principais moedas</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Cotações Atualizadas</h3>
                        <p className="text-gray-600 text-sm">
                            Última atualização: {cambioData.length > 0 ? new Date(cambioData[0].timestamp).toLocaleString('pt-BR') : 'Carregando...'}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={fetchCambio}
                            loading={loading}
                            icon="RefreshCw"
                            variant="primary"
                            size="md"
                        >
                            {loading ? 'Atualizando...' : 'Atualizar'}
                        </Button>

                    </div>
                </div>
            </div>

            {loading && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-center gap-3">
                        <Icons.RefreshCw className="animate-spin h-6 w-6 text-blue-600" />
                        <span className="text-gray-600">Buscando cotações de câmbio...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Icons.AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-red-800 font-semibold">Erro na busca</h3>
                    </div>
                    <p className="text-red-700 mb-4">{error}</p>
                    <Button
                        onClick={fetchCambio}
                        variant="danger"
                        size="md"
                    >
                        Tentar Novamente
                    </Button>
                </div>
            )}

            {cambioData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cambioData.map((cambio, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{cambio.name}</h4>
                                    <p className="text-gray-600 text-sm">{cambio.code}/{cambio.codein}</p>
                                </div>

                            </div>

                            <div className="space-y-3">
                                <LabelValue
                                    label="Compra"
                                    value={formatCurrency(cambio.bid)}
                                />
                                <LabelValue
                                    label="Venda"
                                    value={formatCurrency(cambio.ask)}
                                />
                                <LabelValue
                                    label="Variação"
                                    value={formatPercentage(cambio.pctChange)}
                                    valueClassName={`font-semibold ${getVariationColor(cambio.pctChange)}`}
                                />
                                <LabelValue
                                    label="Máxima"
                                    value={formatCurrency(cambio.high)}
                                />
                                <LabelValue
                                    label="Mínima"
                                    value={formatCurrency(cambio.low)}
                                />
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500">
                                    Atualizado: {new Date(cambio.timestamp).toLocaleTimeString('pt-BR')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                    <Icons.Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="text-blue-900 font-medium mb-1">Sobre as Cotações</h4>
                        <div className="text-blue-800 text-sm space-y-1">
                            <p>• <strong>Cotações em Tempo Real:</strong> Dados atualizados constantemente</p>
                            <p>• <strong>Compra/Venda:</strong> Valores para compra e venda das moedas</p>
                            <p>• <strong>Variação:</strong> Mudança percentual em relação ao fechamento anterior</p>
                            <p>• <strong>Máxima/Mínima:</strong> Valores extremos do dia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CambioSearcher 