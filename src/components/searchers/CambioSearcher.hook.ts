import { useState, useEffect } from 'react'
import { cambioService } from '@/services'
import type { CambioData } from '@/types'

export const useCambioSearcher = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [cambioData, setCambioData] = useState<CambioData[]>([])

    const fetchCambio = async () => {
        setLoading(true)
        setError('')

        try {
            const result = await cambioService.getCambio()
            setCambioData(result)
        } catch (err: any) {
            setError(err.message || 'Erro ao buscar cotações. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCambio()
    }, [])

    const getLastUpdate = () => {
        if (cambioData.length === 0) return null
        return new Date(cambioData[0].timestamp)
    }

    const getCurrencyByCode = (code: string) => {
        return cambioData.find(cambio => cambio.code === code)
    }

    const getTopCurrencies = (limit: number = 5) => {
        return cambioData.slice(0, limit)
    }

    const getCurrenciesByVariation = (direction: 'positive' | 'negative') => {
        return cambioData.filter(cambio => {
            const variation = parseFloat(cambio.pctChange)
            return direction === 'positive' ? variation > 0 : variation < 0
        })
    }

    const formatCurrency = (value: string) => {
        const number = parseFloat(value)
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(number)
    }

    const formatPercentage = (value: string) => {
        const number = parseFloat(value)
        return `${number >= 0 ? '+' : ''}${number.toFixed(2)}%`
    }

    const getVariationColor = (value: string) => {
        const number = parseFloat(value)
        if (number > 0) return 'text-green-600'
        if (number < 0) return 'text-red-600'
        return 'text-gray-600'
    }

    return {
        loading,
        error,
        cambioData,
        fetchCambio,
        getLastUpdate,
        getCurrencyByCode,
        getTopCurrencies,
        getCurrenciesByVariation,
        formatCurrency,
        formatPercentage,
        getVariationColor
    }
} 