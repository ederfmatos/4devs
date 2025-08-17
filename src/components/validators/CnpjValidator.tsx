import { useState } from 'react'
import { Cnpj } from '@/domain'
import Icons from '@/components/Icons'
import Button from '@/components/Button'

const CnpjValidatorComponent = () => {
    const [cnpj, setCnpj] = useState('')
    const [validationResult, setValidationResult] = useState<any>(null)

    const formatCnpj = (value: string) => {
        const cnpjInstance = new Cnpj(value)
        return cnpjInstance.format()
    }

    const handleValidation = () => {
        if (!cnpj.trim()) {
            setValidationResult(null)
            return
        }

        const cnpjInstance = new Cnpj(cnpj)
        const details = cnpjInstance.validateWithDetails()
        setValidationResult(details)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleValidation()
        }
    }

    const clearValidation = () => {
        setCnpj('')
        setValidationResult(null)
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Building className="w-6 h-6 text-blue-600" />
                    Validador de CNPJ
                </h2>
                <p className="text-gray-600">Digite um CNPJ para verificar se é válido</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCnpj(formatCnpj(e.target.value))}
                            onKeyPress={handleKeyPress}
                            placeholder="00.000.000/0000-00"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                            maxLength={18}
                        />
                    </div>
                    <Button
                        onClick={handleValidation}
                        disabled={!cnpj.trim()}
                        icon="Search"
                        variant="primary"
                        size="lg"
                    >
                        Validar
                    </Button>
                </div>
            </div>

            {validationResult && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {validationResult.isValid ? (
                                <Icons.CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                                <Icons.AlertCircle className="w-6 h-6 text-red-600" />
                            )}
                            <h3 className="text-gray-900 font-semibold text-lg">
                                {validationResult.isValid ? 'CNPJ Válido' : 'CNPJ Inválido'}
                            </h3>
                        </div>
                        <Button
                            onClick={clearValidation}
                            variant="secondary"
                            size="md"
                        >
                            Limpar
                        </Button>
                    </div>

                    {!validationResult.isValid && validationResult.errors && (
                        <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Erros encontrados:</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {validationResult.errors.map((error: string, index: number) => (
                                    <li key={index} className="text-red-600">{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {validationResult.steps && (
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Detalhes da validação:</h4>
                            <div className="space-y-2">
                                {validationResult.steps.map((step: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        {step.passed ? (
                                            <Icons.CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Icons.AlertCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className={step.passed ? 'text-green-700' : 'text-red-700'}>
                                            {step.step}
                                            {step.expected && step.found && (
                                                <span className="text-gray-600 ml-1">
                                                    (Esperado: {step.expected}, Encontrado: {step.found})
                                                </span>
                                            )}
                                        </span>
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

export default CnpjValidatorComponent 