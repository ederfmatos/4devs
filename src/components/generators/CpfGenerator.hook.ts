import { useState } from 'react'
import { Cpf } from '@/domain'

export const useCpfGenerator = () => {
    const [quantity, setQuantity] = useState(1)
    const [generatedCpfs, setGeneratedCpfs] = useState<Cpf[]>([])
    const [showCopyFeedback, setShowCopyFeedback] = useState(false)

    const generateCpfs = () => {
        const cpfs = Cpf.generateMultiple(quantity)
        setGeneratedCpfs(cpfs)
    }

    const clearResults = () => {
        setGeneratedCpfs([])
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setShowCopyFeedback(true)
            setTimeout(() => setShowCopyFeedback(false), 2000)
        } catch (err) {
            console.error('Erro ao copiar:', err)
        }
    }

    const copyAllCpfs = async () => {
        if (generatedCpfs.length === 0) return

        const cpfsText = generatedCpfs.map(cpf => cpf.format()).join('\n')
        await copyToClipboard(cpfsText)
    }

    return {
        quantity,
        setQuantity,
        generatedCpfs,
        showCopyFeedback,
        generateCpfs,
        clearResults,
        copyToClipboard,
        copyAllCpfs
    }
} 