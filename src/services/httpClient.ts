class FetchHttpClient {
    constructor(private baseURL: string = '') { }

    async get<T>(url: string): Promise<T> {
        const response = await fetch(`${this.baseURL}${url}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    }
}

export const brasilApiClient = new FetchHttpClient('https://brasilapi.com.br/api') 