import { useFeriadosSearcher } from './FeriadosSearcher.hook'
import Icons from '@/components/Icons'
import Button from '@/components/Button'
import Select from '@/components/Select'

const FeriadosSearcher = () => {
    const {
        year,
        loading,
        error,
        feriados,
        getFeriadosByMonth,
        searchFeriados,
        formatDate,
        getDayOfWeek,
        getMonthName
    } = useFeriadosSearcher()

    const yearOptions = Array.from({ length: 10 }, (_, i) => {
        const yearOption = new Date().getFullYear() + i
        return {
            value: yearOption.toString(),
            label: yearOption.toString()
        }
    })

    const feriadosByMonth = getFeriadosByMonth()

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Calendar className="w-6 h-6 text-blue-600" />
                    Feriados Nacionais
                </h2>
                <p className="text-gray-600">Consulte os feriados nacionais por ano</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Feriados {year}</h3>
                        <p className="text-gray-600 text-sm">
                            Total de {feriados.length} feriados encontrados
                        </p>
                    </div>
                    <div className="w-48">
                        <Select
                            value={year.toString()}
                            onChange={(e) => searchFeriados(Number(e.target.value))}
                            options={yearOptions}
                            label="Ano"
                            size="md"
                            fullWidth
                        />
                    </div>
                </div>
            </div>

            {loading && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-center gap-3">
                        <Icons.RefreshCw className="animate-spin h-6 w-6 text-blue-600" />
                        <span className="text-gray-600">Buscando feriados...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Icons.AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-red-800 font-semibold">Erro na busca</h3>
                    </div>
                    <p className="text-red-700 mb-4">{error}</p>
                    <Button
                        onClick={() => searchFeriados(year)}
                        variant="danger"
                        size="md"
                    >
                        Tentar Novamente
                    </Button>
                </div>
            )}

            {feriados.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(feriadosByMonth).map(([month, monthFeriados]) => (
                        <div key={month} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Icons.Calendar className="w-5 h-5 text-blue-600" />
                                {getMonthName(Number(month))}
                            </h3>
                            <div className="space-y-3">
                                {monthFeriados.map((feriado, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-3">
                                        <div className="font-medium text-gray-900">
                                            {feriado.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {formatDate(feriado.date)} - {getDayOfWeek(feriado.date)}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {feriado.type}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {feriados.length === 0 && !loading && !error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <Icons.Info className="w-6 h-6 text-yellow-600" />
                        <div>
                            <h3 className="text-yellow-800 font-semibold">Nenhum feriado encontrado</h3>
                            <p className="text-yellow-700">Não foram encontrados feriados para o ano {year}.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FeriadosSearcher 