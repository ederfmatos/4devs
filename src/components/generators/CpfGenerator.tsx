import { useState } from 'react'
import { Cpf } from '@/domain'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Select from '../Select'

const CpfGenerator = () => {
    const [quantity, setQuantity] = useState(1)
    const [generatedCpfs, setGeneratedCpfs] = useState<Cpf[]>([])
    const [copyFeedback, setCopyFeedback] = useState('')

    const generateCpfs = () => {
        if (quantity < 1 || quantity > 100) {
            return
        }

        const cpfs = Cpf.generateMultiple(quantity)
        setGeneratedCpfs(cpfs)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            showCopyFeedback('CPF copiado!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const copyAllCpfs = async () => {
        if (generatedCpfs.length === 0) return

        const cpfsText = generatedCpfs.map((cpf, index) =>
            `${index + 1}. ${cpf.format()}`
        ).join('\n')

        try {
            await navigator.clipboard.writeText(cpfsText)
            showCopyFeedback('Todos os CPFs copiados!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const showCopyFeedback = (message: string) => {
        setCopyFeedback(message)
        setTimeout(() => setCopyFeedback(''), 2000)
    }

    const clearResults = () => {
        setGeneratedCpfs([])
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.CreditCard className="w-6 h-6 text-blue-600" />
                    Gerador de CPF
                </h2>
                <p className="text-gray-600">Gere CPFs válidos aleatoriamente</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantidade de CPFs
                        </label>
                        <Select
                            options={[{ value: 1, label: '1' }, { value: 2, label: '2' }, { value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }, { value: 6, label: '6' }, { value: 7, label: '7' }, { value: 8, label: '8' }, { value: 9, label: '9' }, { value: 10, label: '10' }]}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                        />
                    </div>
                    <div className="flex gap-3 ">
                        <Button
                            onClick={generateCpfs}
                            icon="Plus"
                            variant="primary"
                            size="md"
                        >
                            Gerar CPFs
                        </Button>
                        {generatedCpfs.length > 0 && (
                            <Button
                                onClick={clearResults}
                                variant="secondary"
                                size="md"
                            >
                                Limpar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {generatedCpfs.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {generatedCpfs.length} CPF{generatedCpfs.length > 1 ? 's' : ''} Gerado{generatedCpfs.length > 1 ? 's' : ''}
                            </h3>
                            <p className="text-gray-600 text-sm">Todos os CPFs são válidos e podem ser utilizados</p>
                        </div>
                        <Button
                            onClick={copyAllCpfs}
                            icon="Copy"
                            variant="success"
                            size="sm"
                        >
                            Copiar Todos
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {generatedCpfs.map((cpf, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 font-medium min-w-[40px]">#{index + 1}</span>
                                    <div>
                                        <span className="text-lg font-mono text-gray-900">{cpf.format()}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Icons.CheckCircle className="w-3 h-3 mr-1" />
                                                Válido
                                            </span>
                                            <span className="text-xs text-gray-500">Dígitos: {cpf.getDigits()}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(cpf.format())}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                        <h4 className="text-blue-900 font-medium mb-1">Sobre o Gerador de CPF</h4>
                        <div className="text-blue-800 text-sm space-y-1">
                            <p>• <strong>CPFs Válidos:</strong> Todos os CPFs gerados passam na validação oficial</p>
                            <p>• <strong>Algoritmo Oficial:</strong> Usa o mesmo algoritmo da Receita Federal</p>
                            <p>• <strong>Formatação:</strong> CPFs são exibidos no formato padrão XXX.XXX.XXX-XX</p>
                            <p>• <strong>Uso:</strong> Apenas para fins educacionais e de teste</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CpfGenerator 