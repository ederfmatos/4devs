import { useState } from 'react'
import { Password } from '@/domain'
import type { PasswordOptions } from '@/domain/Password'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'

const PasswordGenerator = () => {
    const [generatedPassword, setGeneratedPassword] = useState<Password | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [multipleResults, setMultipleResults] = useState<Password[]>([])
    const [copyFeedback, setCopyFeedback] = useState('')
    const [options, setOptions] = useState<PasswordOptions>({
        length: 12,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
        excludeSimilar: false,
        excludeAmbiguous: false
    })

    const quantityOptions = [
        { value: 1, label: '1 Senha' },
        { value: 5, label: '5 Senhas' },
        { value: 10, label: '10 Senhas' },
        { value: 20, label: '20 Senhas' },
        { value: 50, label: '50 Senhas' }
    ]

    const generateSinglePassword = () => {
        try {
            const password = Password.generate(options)
            setGeneratedPassword(password)
            setMultipleResults([])
        } catch (error: any) {
            console.error('Erro ao gerar senha:', error.message)
        }
    }

    const generateMultiplePasswords = () => {
        try {
            const passwords = Password.generateMultiple(quantity, options)
            setMultipleResults(passwords)
            setGeneratedPassword(null)
        } catch (error: any) {
            console.error('Erro ao gerar senhas:', error.message)
        }
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            showCopyFeedback('Senha copiada!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const copyAllPasswords = async () => {
        if (multipleResults.length === 0) return

        const allPasswords = multipleResults.map(pwd => pwd.getValue()).join('\n')
        try {
            await navigator.clipboard.writeText(allPasswords)
            showCopyFeedback('Todas as senhas copiadas!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const showCopyFeedback = (message: string) => {
        setCopyFeedback(message)
        setTimeout(() => setCopyFeedback(''), 2000)
    }

    const clearResults = () => {
        setGeneratedPassword(null)
        setMultipleResults([])
    }

    const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
        setOptions((prev: PasswordOptions) => ({ ...prev, [key]: value }))
    }

    const getPasswordStrength = (password: string): { level: string; color: string; percentage: number } => {
        if (!password || password === 'Selecione pelo menos um tipo de caractere') {
            return { level: 'Inválida', color: 'text-red-600', percentage: 0 }
        }

        const passwordInstance = new Password(password)
        const strength = passwordInstance.validateStrength()

        return {
            level: strength.level === 'very-strong' ? 'Muito Forte' :
                strength.level === 'strong' ? 'Forte' :
                    strength.level === 'medium' ? 'Média' : 'Fraca',
            color: strength.color,
            percentage: strength.score
        }
    }

    const strength = getPasswordStrength(generatedPassword?.getValue() || '')

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Key className="w-6 h-6 text-blue-600" />
                    Gerador de Senha
                </h2>
                <p className="text-gray-600">Gere senhas seguras e personalizadas</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Comprimento: {options.length}
                        </label>
                        <input
                            type="range"
                            min="4"
                            max="48"
                            value={options.length}
                            onChange={(e) => updateOption('length', Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>4</span>
                            <span>48</span>
                        </div>
                    </div>

                    <div>
                        <Select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            options={quantityOptions}
                            label="Quantidade"
                            size="md"
                            fullWidth
                        />
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipos de Caracteres
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.includeUppercase}
                                    onChange={(e) => updateOption('includeUppercase', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Maiúsculas (A-Z)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.includeLowercase}
                                    onChange={(e) => updateOption('includeLowercase', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Minúsculas (a-z)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.includeNumbers}
                                    onChange={(e) => updateOption('includeNumbers', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Números (0-9)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.includeSymbols}
                                    onChange={(e) => updateOption('includeSymbols', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Símbolos (!@#$%^&*)</span>
                            </label>
                        </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Opções Avançadas
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.excludeSimilar}
                                    onChange={(e) => updateOption('excludeSimilar', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Excluir similares (0,O,1,I,l)</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={options.excludeAmbiguous}
                                    onChange={(e) => updateOption('excludeAmbiguous', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">Excluir ambíguos (0,1)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button
                        onClick={generateSinglePassword}
                        icon="Plus"
                        variant="primary"
                        size="lg"
                        fullWidth
                    >
                        Gerar 1 Senha
                    </Button>

                    <Button
                        onClick={generateMultiplePasswords}
                        icon="RefreshCw"
                        variant="success"
                        size="lg"
                        fullWidth
                    >
                        Gerar {quantity} Senhas
                    </Button>
                </div>
            </div>

            {generatedPassword && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Senha Gerada</h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${strength.color}`}>
                                {strength.level}
                            </span>
                            <Button
                                onClick={() => copyToClipboard(generatedPassword.getValue())}
                                icon="Copy"
                                variant="outline"
                                size="sm"
                            >
                                Copiar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xl font-mono text-gray-900 text-center break-all">{generatedPassword.getValue()}</p>
                    </div>

                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Força da Senha</span>
                            <span>{strength.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${strength.percentage >= 75 ? 'bg-green-500' :
                                    strength.percentage >= 50 ? 'bg-blue-500' :
                                        strength.percentage >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                style={{ width: `${strength.percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {multipleResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {multipleResults.length} Senha{multipleResults.length > 1 ? 's' : ''} Gerada{multipleResults.length > 1 ? 's' : ''}
                        </h3>
                        <Button
                            onClick={copyAllPasswords}
                            icon="Copy"
                            variant="primary"
                            size="md"
                        >
                            Copiar Todas
                        </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {multipleResults.map((password, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                                    <span className="font-mono text-gray-900 text-sm break-all">{password.getValue()}</span>
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(password.getValue())}
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
                        <h4 className="text-blue-900 font-medium mb-1">Dicas de Segurança</h4>
                        <ul className="text-blue-800 text-sm space-y-1">
                            <li>• Use pelo menos 12 caracteres</li>
                            <li>• Combine maiúsculas, minúsculas, números e símbolos</li>
                            <li>• Evite informações pessoais (nomes, datas)</li>
                            <li>• Use senhas únicas para cada conta</li>
                            <li>• Considere usar um gerenciador de senhas</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator 