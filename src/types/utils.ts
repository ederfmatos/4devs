export type ValidationResult = {
    isValid: boolean
    message?: string
    errors?: string[]
}

export type FormatOptions = {
    mask?: string
    placeholder?: string
    separator?: string
    decimalPlaces?: number
    currency?: boolean
    locale?: string
}

export type ApiResponse<T = any> = {
    data: T
    status: number
    message?: string
    success: boolean
}

export type ApiError = {
    message: string
    status: number
    code?: string
    details?: any
}

export type PaginationParams = {
    page: number
    limit: number
    total?: number
    totalPages?: number
}

export type SortParams = {
    field: string
    direction: 'asc' | 'desc'
}

export type FilterParams = {
    [key: string]: any
}

export type SearchParams = PaginationParams & {
    sort?: SortParams
    filters?: FilterParams
    query?: string
}

export type DebounceOptions = {
    delay: number
    leading?: boolean
    trailing?: boolean
}

export type ThrottleOptions = {
    delay: number
    leading?: boolean
    trailing?: boolean
}

export type LocalStorageItem<T = any> = {
    key: string
    value: T
    expiresAt?: number
}

export type SessionStorageItem<T = any> = {
    key: string
    value: T
    expiresAt?: number
} 