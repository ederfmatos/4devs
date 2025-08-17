export class Cpf {
    private value: string

    constructor(value: string = '') {
        this.value = value.replace(/\D/g, '') // Remove caracteres não numéricos
    }

    /**
     * Cria uma instância de CPF com valor aleatório
     */
    static generate(): Cpf {
        // Gera 9 dígitos aleatórios
        const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))

        // Calcula o primeiro dígito verificador
        const firstDigit = Cpf.calculateDigit(digits)
        digits.push(firstDigit)

        // Calcula o segundo dígito verificador
        const secondDigit = Cpf.calculateDigit(digits)
        digits.push(secondDigit)

        return new Cpf(digits.join(''))
    }

    /**
     * Gera múltiplos CPFs aleatórios
     */
    static generateMultiple(count: number): Cpf[] {
        return Array.from({ length: count }, () => Cpf.generate())
    }

    /**
     * Calcula dígito verificador do CPF
     */
    private static calculateDigit(digits: number[]): number {
        const weights = [10, 9, 8, 7, 6, 5, 4, 3, 2]
        const startIndex = digits.length === 9 ? 0 : 1
        const endIndex = digits.length === 9 ? 9 : 10

        let sum = 0
        for (let i = startIndex; i < endIndex; i++) {
            sum += digits[i] * weights[i - startIndex]
        }

        const remainder = sum % 11
        return remainder < 2 ? 0 : 11 - remainder
    }

    /**
     * Valida se o CPF é válido
     */
    isValid(): boolean {
        const digits = this.value.split('').map(Number)

        // Verifica se tem 11 dígitos
        if (digits.length !== 11) return false

        // Verifica se todos os dígitos são iguais
        if (digits.every(digit => digit === digits[0])) return false

        // Verifica o primeiro dígito verificador
        const firstDigit = Cpf.calculateDigit(digits.slice(0, 9))
        if (digits[9] !== firstDigit) return false

        // Verifica o segundo dígito verificador
        const secondDigit = Cpf.calculateDigit(digits.slice(0, 10))
        if (digits[10] !== secondDigit) return false

        return true
    }

    /**
     * Retorna detalhes da validação
     */
    validateWithDetails(): {
        isValid: boolean
        errors: string[]
        steps: {
            step: string
            passed: boolean
            expected?: number
            found?: number
        }[]
    } {
        const digits = this.value.split('').map(Number)
        const errors: string[] = []
        const steps: any[] = []

        // Passo 1: Verificar se tem 11 dígitos
        const has11Digits = digits.length === 11
        steps.push({
            step: 'CPF deve ter 11 dígitos',
            passed: has11Digits,
            expected: 11,
            found: digits.length
        })
        if (!has11Digits) {
            errors.push(`CPF deve ter 11 dígitos, encontrado ${digits.length}`)
        }

        // Passo 2: Verificar se não são todos iguais
        const allSame = digits.every(digit => digit === digits[0])
        steps.push({
            step: 'CPF não pode ter todos os dígitos iguais',
            passed: !allSame
        })
        if (allSame) {
            errors.push('CPF não pode ter todos os dígitos iguais')
        }

        // Passo 3: Verificar primeiro dígito verificador
        if (has11Digits && !allSame) {
            const expectedFirstDigit = Cpf.calculateDigit(digits.slice(0, 9))
            const firstDigitValid = digits[9] === expectedFirstDigit
            steps.push({
                step: 'Primeiro dígito verificador',
                passed: firstDigitValid,
                expected: expectedFirstDigit,
                found: digits[9]
            })
            if (!firstDigitValid) {
                errors.push(`Primeiro dígito verificador incorreto. Esperado: ${expectedFirstDigit}, Encontrado: ${digits[9]}`)
            }

            // Passo 4: Verificar segundo dígito verificador
            if (firstDigitValid) {
                const expectedSecondDigit = Cpf.calculateDigit(digits.slice(0, 10))
                const secondDigitValid = digits[10] === expectedSecondDigit
                steps.push({
                    step: 'Segundo dígito verificador',
                    passed: secondDigitValid,
                    expected: expectedSecondDigit,
                    found: digits[10]
                })
                if (!secondDigitValid) {
                    errors.push(`Segundo dígito verificador incorreto. Esperado: ${expectedSecondDigit}, Encontrado: ${digits[10]}`)
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors,
            steps
        }
    }

    /**
     * Formata o CPF no padrão XXX.XXX.XXX-XX
     */
    format(): string {
        const digits = this.value
        if (digits.length !== 11) return this.value

        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
    }

    /**
     * Retorna apenas os dígitos (sem formatação)
     */
    getDigits(): string {
        return this.value
    }
} 