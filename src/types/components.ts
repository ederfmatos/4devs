import { ReactNode } from 'react'

export type CopyToClipboardButtonProps = {
    text: string
    onCopy?: () => void
    onError?: (error: string) => void
    className?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'ghost' | 'outline'
    children?: ReactNode
    showFeedback?: boolean
    feedbackMessage?: string
    errorMessage?: string
}

export type GeneratedCep = {
    cep: string
    isValid: boolean
    data?: import('./api').CepData
    error?: string
}

export type GeneratedCpf = {
    cpf: string
    isValid: boolean
}

export type GeneratedCnpj = {
    cnpj: string
    isValid: boolean
}

export type GeneratedPassword = {
    password: string
    strength: 'weak' | 'medium' | 'strong' | 'very-strong'
    score: number
}

export type GeneratedUuid = {
    uuid: string
    version: 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'
    description: string
}

export type UuidVersion = {
    value: 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'
    label: string
    description: string
    color: string
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

export type NavItemProps = {
    section: string
    icon: ReactNode
    children: ReactNode
    isActive: boolean
    onClick: () => void
}

export type SidebarProps = {
    activeSection: import('./app').Section
    onSectionChange: (section: import('./app').Section) => void
    isOpen: boolean
    onClose: () => void
} 