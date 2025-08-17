import { useState } from 'react'
import { cepService } from '@/services'
import type { CepData } from '@/types'
import { Cep } from '@/domain'

export const useCepSearcher = () => {
    const [cep, setCep] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState<CepData | null>(null)

    const searchCep = async (cepValue?: string) => {
        const cepToSearch = cepValue || cep
        const cepInstance = new Cep(cepToSearch)

        if (!cepInstance.isValid()) {
            setError('CEP inválido')
            return
        }

        setLoading(true)
        setError('')
        setData(null)

        try {
            const result = await cepService.searchCep(cepToSearch)
            setData(result)
        } catch (err: any) {
            setError(err.message || 'Erro ao buscar CEP. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    const clearSearch = () => {
        setCep('')
        setData(null)
        setError('')
    }

    const formatCep = (value: string) => {
        return new Cep(value).format()
    }

    const isValidCep = (value: string) => {
        return new Cep(value).isValid()
    }

    return {
        cep,
        setCep,
        loading,
        error,
        data,
        formatCep,
        isValidCep,
        searchCep,
        clearSearch
    }
} 