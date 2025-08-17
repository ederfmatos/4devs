import { brasilApiClient } from './httpClient'
import type {
    CepData,
    CnpjData,
    DominioInfo,
    Feriado,
    CambioData,
    CepApi,
    CnpjApi,
    DominiosApi,
    FeriadosApi,
    CambioApi
} from '@/types'

export class BrasilApiService implements CepApi, CnpjApi, DominiosApi, FeriadosApi, CambioApi {
    async searchCep(cep: string): Promise<CepData> {
        const cleanCep = cep.replace(/\D/g, '')

        if (cleanCep.length !== 8) {
            throw new Error('CEP deve conter 8 dígitos')
        }

        return brasilApiClient.get<CepData>(`/cep/v2/${cleanCep}`)
    }

    async searchCnpj(cnpj: string): Promise<CnpjData> {
        const cleanCnpj = cnpj.replace(/\D/g, '')

        if (cleanCnpj.length !== 14) {
            throw new Error('CNPJ deve conter 14 dígitos')
        }

        return brasilApiClient.get<CnpjData>(`/cnpj/v1/${cleanCnpj}`)
    }

    async searchDomain(domain: string): Promise<DominioInfo> {
        const cleanDomain = domain
            .replace(/^https?:\/\//, '')
            .replace(/^www\./, '')
            .trim()

        if (!cleanDomain.includes('.')) {
            throw new Error('Domínio deve conter pelo menos um ponto')
        }

        try {
            return await brasilApiClient.get<DominioInfo>(`/registrobr/v1/${cleanDomain}`)
        } catch (error: any) {
            if (error.message.includes('404')) {
                return {
                    status: 'disponível',
                    fqdn: cleanDomain,
                    hosts: [],
                    created: '',
                    updated: '',
                    nameservers: [],
                    status_code: 404,
                    ['expires-at']: ''
                }
            }
            throw error
        }
    }

    async getFeriados(year: number): Promise<Feriado[]> {
        if (year < 1900 || year > 2100) {
            throw new Error('Ano deve estar entre 1900 e 2100')
        }

        return brasilApiClient.get<Feriado[]>(`/feriados/v1/${year}`)
    }

    async getCambio(): Promise<CambioData[]> {
        return brasilApiClient.get<CambioData[]>('/cambio/v1')
    }
}

export const brasilApiService = new BrasilApiService() 