import { useCepGenerator } from './CepGenerator.hook'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import CopyToClipboardButton from '@/components/CopyToClipboardButton'
import Select from '../Select'

const CepGenerator = () => {
    const {
        quantity,
        setQuantity,
        generatedCeps,
        showCopyFeedback,
        generateCeps,
        clearResults,
        copyToClipboard,
        copyAllCeps
    } = useCepGenerator()

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Search className="w-6 h-6 text-blue-600" />
                    Gerador de CEP
                </h2>
                <p className="text-gray-600">Gere CEPs válidos para testes e desenvolvimento</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantidade
                        </label>

                        <Select
                            options={[{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }, { value: 50, label: '50' }]}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <div className="md:col-span-1 flex gap-3">
                        <Button
                            onClick={generateCeps}
                            icon="RefreshCw"
                            variant="primary"
                            size="md"
                            className="flex-1"
                        >
                            Gerar CEPs
                        </Button>
                        {generatedCeps.length > 0 && (
                            <Button
                                onClick={clearResults}
                                icon="AlertCircle"
                                variant="danger"
                                size="md"
                            >
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {generatedCeps.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                            <h3 className="text-gray-900 font-semibold text-lg">
                                {generatedCeps.length} CEP{generatedCeps.length > 1 ? 's' : ''} Gerado{generatedCeps.length > 1 ? 's' : ''}
                            </h3>
                        </div>
                        <Button
                            onClick={copyAllCeps}
                            variant="outline"
                            size="sm"
                        >
                            Copiar Todos
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {generatedCeps.map((cep, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="font-mono text-gray-900">{cep.format()}</span>
                                <CopyToClipboardButton
                                    text={cep.format()}
                                    variant="ghost"
                                    size="sm"
                                    feedbackMessage="CEP copiado!"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showCopyFeedback && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
                    CEPs copiados!
                </div>
            )}
        </div>
    )
}

export default CepGenerator 