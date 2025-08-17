import { useState } from 'react'
import { Password } from '@/domain'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Input from '@/components/Input'

const PasswordValidatorComponent = () => {
    const [password, setPassword] = useState('')
    const [validationResult, setValidationResult] = useState<any>(null)

    const validatePassword = () => {
        if (!password.trim()) {
            setValidationResult({ isValid: false, message: 'Por favor, digite uma senha' })
            return
        }

        const passwordInstance = new Password(password)
        const details = passwordInstance.validateWithDetails()
        setValidationResult(details)
    }

    const clearValidation = () => {
        setPassword('')
        setValidationResult(null)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            validatePassword()
        }
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Lock className="w-6 h-6 text-blue-600" />
                    Validador de Senha
                </h2>
                <p className="text-gray-600">Digite uma senha para validar sua força e segurança</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Digite sua senha..."
                            size="lg"
                            fullWidth
                        />
                    </div>
                    <Button
                        onClick={validatePassword}
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
                                {validationResult.isValid ? 'Senha Válida' : 'Senha Inválida'}
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

                    {validationResult.strength && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Força da Senha</span>
                                <span className={`text-sm font-medium ${validationResult.strength.color}`}>
                                    {validationResult.strength.score}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${validationResult.strength.score >= 80 ? 'bg-green-500' :
                                        validationResult.strength.score >= 60 ? 'bg-blue-500' :
                                            validationResult.strength.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${validationResult.strength.score}%` }}
                                />
                            </div>
                            <p className={`text-sm font-medium mt-1 ${validationResult.strength.color}`}>
                                {validationResult.strength.level === 'very-strong' ? 'Muito Forte' :
                                    validationResult.strength.level === 'strong' ? 'Forte' :
                                        validationResult.strength.level === 'medium' ? 'Média' : 'Fraca'}
                            </p>
                        </div>
                    )}

                    {validationResult.checks && (
                        <div className="mb-6">
                            <h4 className="font-medium text-gray-900 mb-3">Verificações de Segurança</h4>
                            <div className="space-y-2">
                                {validationResult.checks.map((check: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        {check.passed ? (
                                            <Icons.CheckCircle className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Icons.AlertCircle className="w-4 h-4 text-red-600" />
                                        )}
                                        <span className={check.passed ? 'text-green-700' : 'text-red-700'}>
                                            {check.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                        <div>
                            <h4 className="font-medium text-gray-900 mb-3">Sugestões de Melhoria</h4>
                            <ul className="list-disc list-inside space-y-1">
                                {validationResult.suggestions.map((suggestion: string, index: number) => (
                                    <li key={index} className="text-blue-600 text-sm">{suggestion}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PasswordValidatorComponent 