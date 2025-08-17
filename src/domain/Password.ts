export class Password {
    private value: string
    private options: PasswordOptions

    constructor(value: string = '', options: Partial<PasswordOptions> = {}) {
        this.value = value
        this.options = {
            length: 12,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true,
            excludeSimilar: false,
            excludeAmbiguous: false,
            ...options
        }
    }

    /**
     * Gera uma senha aleatória baseada nas opções configuradas
     */
    static generate(options: Partial<PasswordOptions> = {}): Password {
        const defaultOptions: PasswordOptions = {
            length: 12,
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true,
            excludeSimilar: false,
            excludeAmbiguous: false
        }

        const finalOptions = { ...defaultOptions, ...options }
        const password = Password.generatePassword(finalOptions)
        return new Password(password, finalOptions)
    }

    /**
     * Gera múltiplas senhas
     */
    static generateMultiple(count: number, options: Partial<PasswordOptions> = {}): Password[] {
        return Array.from({ length: count }, () => Password.generate(options))
    }

    /**
     * Algoritmo de geração de senha
     */
    private static generatePassword(options: PasswordOptions): string {
        const {
            length,
            includeUppercase,
            includeLowercase,
            includeNumbers,
            includeSymbols,
            excludeSimilar,
            excludeAmbiguous
        } = options

        let charset = ''

        if (includeUppercase) {
            charset += excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }

        if (includeLowercase) {
            charset += excludeSimilar ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz'
        }

        if (includeNumbers) {
            charset += excludeAmbiguous ? '23456789' : '0123456789'
        }

        if (includeSymbols) {
            charset += excludeAmbiguous ? '!@#$%^&*' : '!@#$%^&*()_+-=[]{}|;:,.<>?'
        }

        if (charset === '') {
            throw new Error('Pelo menos um tipo de caractere deve ser selecionado')
        }

        let password = ''
        const charsetArray = charset.split('')

        // Garantir pelo menos um caractere de cada tipo selecionado
        if (includeUppercase) {
            const upperChars = excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            password += upperChars[Math.floor(Math.random() * upperChars.length)]
        }

        if (includeLowercase) {
            const lowerChars = excludeSimilar ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz'
            password += lowerChars[Math.floor(Math.random() * lowerChars.length)]
        }

        if (includeNumbers) {
            const numberChars = excludeAmbiguous ? '23456789' : '0123456789'
            password += numberChars[Math.floor(Math.random() * numberChars.length)]
        }

        if (includeSymbols) {
            const symbolChars = excludeAmbiguous ? '!@#$%^&*' : '!@#$%^&*()_+-=[]{}|;:,.<>?'
            password += symbolChars[Math.floor(Math.random() * symbolChars.length)]
        }

        // Completar o resto da senha
        while (password.length < length) {
            password += charsetArray[Math.floor(Math.random() * charsetArray.length)]
        }

        // Embaralhar a senha
        return password.split('').sort(() => Math.random() - 0.5).join('')
    }

    /**
     * Valida a força da senha
     */
    validateStrength(): PasswordStrength {
        const score = this.calculateScore()

        if (score >= 80) return { level: 'very-strong', score, color: 'text-green-600' }
        if (score >= 60) return { level: 'strong', score, color: 'text-blue-600' }
        if (score >= 40) return { level: 'medium', score, color: 'text-yellow-600' }
        return { level: 'weak', score, color: 'text-red-600' }
    }

    /**
     * Calcula o score da senha
     */
    private calculateScore(): number {
        let score = 0
        const password = this.value

        if (password.length === 0) return 0

        // Pontos por comprimento
        score += Math.min(password.length * 4, 40)

        // Pontos por tipos de caracteres
        if (/[a-z]/.test(password)) score += 10
        if (/[A-Z]/.test(password)) score += 10
        if (/[0-9]/.test(password)) score += 10
        if (/[^A-Za-z0-9]/.test(password)) score += 15

        // Penalidades
        if (/(.)\1{2,}/.test(password)) score -= 10 // Caracteres repetidos
        if (/^[a-z]+$/.test(password)) score -= 20 // Apenas minúsculas
        if (/^[A-Z]+$/.test(password)) score -= 20 // Apenas maiúsculas
        if (/^[0-9]+$/.test(password)) score -= 20 // Apenas números

        // Padrões comuns
        if (/123|abc|qwe|asd|zxc/.test(password.toLowerCase())) score -= 15
        if (/password|senha|admin|root|user/.test(password.toLowerCase())) score -= 25

        return Math.max(0, Math.min(100, score))
    }

    /**
     * Valida se a senha atende aos requisitos mínimos
     */
    isValid(): boolean {
        const strength = this.validateStrength()
        return strength.score >= 40
    }

    /**
     * Retorna detalhes da validação
     */
    validateWithDetails(): PasswordValidationDetails {
        const strength = this.validateStrength()
        const checks = this.performChecks()

        return {
            isValid: this.isValid(),
            strength,
            checks,
            suggestions: this.getSuggestions(checks)
        }
    }

    /**
     * Realiza verificações específicas
     */
    private performChecks(): PasswordCheck[] {
        const password = this.value
        const checks: PasswordCheck[] = []

        checks.push({
            name: 'Comprimento mínimo',
            passed: password.length >= 8,
            message: `Senha deve ter pelo menos 8 caracteres (atual: ${password.length})`
        })

        checks.push({
            name: 'Letras minúsculas',
            passed: /[a-z]/.test(password),
            message: 'Senha deve conter pelo menos uma letra minúscula'
        })

        checks.push({
            name: 'Letras maiúsculas',
            passed: /[A-Z]/.test(password),
            message: 'Senha deve conter pelo menos uma letra maiúscula'
        })

        checks.push({
            name: 'Números',
            passed: /[0-9]/.test(password),
            message: 'Senha deve conter pelo menos um número'
        })

        checks.push({
            name: 'Caracteres especiais',
            passed: /[^A-Za-z0-9]/.test(password),
            message: 'Senha deve conter pelo menos um caractere especial'
        })

        checks.push({
            name: 'Sem caracteres repetidos',
            passed: !/(.)\1{2,}/.test(password),
            message: 'Senha não deve ter caracteres repetidos consecutivos'
        })

        checks.push({
            name: 'Sem padrões comuns',
            passed: !/123|abc|qwe|asd|zxc|password|senha|admin|root|user/.test(password.toLowerCase()),
            message: 'Senha não deve conter padrões comuns'
        })

        return checks
    }

    /**
     * Gera sugestões de melhoria
     */
    private getSuggestions(checks: PasswordCheck[]): string[] {
        const suggestions: string[] = []
        const failedChecks = checks.filter(check => !check.passed)

        failedChecks.forEach(check => {
            switch (check.name) {
                case 'Comprimento mínimo':
                    suggestions.push('Aumente o comprimento da senha para pelo menos 8 caracteres')
                    break
                case 'Letras minúsculas':
                    suggestions.push('Adicione letras minúsculas à senha')
                    break
                case 'Letras maiúsculas':
                    suggestions.push('Adicione letras maiúsculas à senha')
                    break
                case 'Números':
                    suggestions.push('Adicione números à senha')
                    break
                case 'Caracteres especiais':
                    suggestions.push('Adicione caracteres especiais (!@#$%^&*) à senha')
                    break
                case 'Sem caracteres repetidos':
                    suggestions.push('Evite caracteres repetidos consecutivos')
                    break
                case 'Sem padrões comuns':
                    suggestions.push('Evite padrões comuns como "123", "abc", "password"')
                    break
            }
        })

        return suggestions
    }

    /**
     * Retorna a senha
     */
    getValue(): string {
        return this.value
    }
}

export type PasswordOptions = {
    length: number
    includeUppercase: boolean
    includeLowercase: boolean
    includeNumbers: boolean
    includeSymbols: boolean
    excludeSimilar: boolean
    excludeAmbiguous: boolean
}

export type PasswordStrength = {
    level: 'weak' | 'medium' | 'strong' | 'very-strong'
    score: number
    color: string
}

export type PasswordCheck = {
    name: string
    passed: boolean
    message: string
}

export type PasswordValidationDetails = {
    isValid: boolean
    strength: PasswordStrength
    checks: PasswordCheck[]
    suggestions: string[]
} 