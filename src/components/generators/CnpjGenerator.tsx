import { useState } from 'react'
import { Cnpj } from '@/domain'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Select from '../Select'

const CnpjGeneratorComponent = () => {
    const [generatedCnpj, setGeneratedCnpj] = useState<Cnpj | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [multipleResults, setMultipleResults] = useState<Cnpj[]>([])
    const [copyFeedback, setCopyFeedback] = useState('')

    const generateSingleCnpj = () => {
        const cnpj = Cnpj.generate()
        setGeneratedCnpj(cnpj)
        setMultipleResults([])
    }

    const generateMultipleCnpjs = () => {
        const cnpjs = Cnpj.generateMultiple(quantity)
        setMultipleResults(cnpjs)
        setGeneratedCnpj(null)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            showCopyFeedback('CNPJ copiado!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const copyAllCnpjs = async () => {
        if (multipleResults.length === 0) return

        const allCnpjs = multipleResults.map(cnpj => cnpj.format()).join('\n')
        try {
            await navigator.clipboard.writeText(allCnpjs)
            showCopyFeedback('Todos os CNPJs copiados!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const showCopyFeedback = (message: string) => {
        setCopyFeedback(message)
        setTimeout(() => setCopyFeedback(''), 2000)
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Building className="w-6 h-6 text-blue-600" />
                    Gerador de CNPJ
                </h2>
                <p className="text-gray-600">Gere CNPJs válidos para testes e desenvolvimento</p>
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
                            onClick={generateSingleCnpj}
                            icon="Plus"
                            variant="primary"
                            size="md"
                            fullWidth
                        >
                            Gerar 1 CNPJ
                        </Button>

                        <Button
                            onClick={generateMultipleCnpjs}
                            icon="RefreshCw"
                            variant="success"
                            size="md"
                            fullWidth
                        >
                            Gerar {quantity} CNPJs
                        </Button>
                    </div>
                </div>
            </div>

            {generatedCnpj && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">CNPJ Gerado</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-green-600 text-sm font-medium">✓ Válido</span>
                            <Button
                                onClick={() => copyToClipboard(generatedCnpj.format())}
                                icon="Copy"
                                variant="outline"
                                size="sm"
                            >
                                Copiar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-2xl font-mono text-gray-900 text-center">{generatedCnpj.format()}</p>
                    </div>

                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Icons.CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-800 text-sm">
                                Este CNPJ é válido e pode ser usado para testes
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {multipleResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {multipleResults.length} CNPJ{multipleResults.length > 1 ? 's' : ''} Gerado{multipleResults.length > 1 ? 's' : ''}
                        </h3>
                        <Button
                            onClick={copyAllCnpjs}
                            icon="Copy"
                            variant="primary"
                            size="md"
                        >
                            Copiar Todos
                        </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {multipleResults.map((cnpj, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                                    <span className="font-mono text-gray-900">{cnpj.format()}</span>
                                    <span className="text-green-600 text-xs">✓ Válido</span>
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(cnpj.format())}
                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <Icons.Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {copyFeedback && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
                    {copyFeedback}
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                    <Icons.Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="text-blue-900 font-medium mb-1">Sobre os CNPJs Gerados</h4>
                        <p className="text-blue-800 text-sm">
                            Todos os CNPJs gerados são válidos e seguem o algoritmo oficial de validação brasileiro.
                            Eles podem ser usados para testes, desenvolvimento e validação de sistemas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CnpjGeneratorComponent 