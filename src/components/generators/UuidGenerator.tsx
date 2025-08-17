import { useState } from 'react'
import { v1, v3, v4, v5 } from 'uuid'
import Icons from '../Icons'
import Button from '../Button'

type UuidVersion = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7'

const UuidGenerator = () => {
    const [generatedUuid, setGeneratedUuid] = useState('')
    const [version, setVersion] = useState<UuidVersion>('v4')
    const [quantity, setQuantity] = useState(1)
    const [namespace, setNamespace] = useState('')
    const [name, setName] = useState('')
    const [multipleResults, setMultipleResults] = useState<string[]>([])
    const [copyFeedback, setCopyFeedback] = useState('')

    const generateUuidV6 = (): string => {
        const timestamp = Date.now()
        const randomBytes = Array.from({ length: 10 }, () => Math.floor(Math.random() * 256))

        const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0')
        const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0')
        const timeHi = (((timestamp >> 48) & 0x0fff) | 0x6000).toString(16).padStart(4, '0')

        const randomPart = randomBytes.map(b => b.toString(16).padStart(2, '0')).join('')

        return `${timeLow}-${timeMid}-${timeHi}-${randomPart.slice(0, 4)}-${randomPart.slice(4, 16)}`
    }

    const generateUuidV7 = (): string => {
        const timestamp = Date.now()
        const randomBytes = Array.from({ length: 10 }, () => Math.floor(Math.random() * 256))

        const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0')
        const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0')
        const timeHi = (((timestamp >> 48) & 0x0fff) | 0x7000).toString(16).padStart(4, '0')

        const randomPart = randomBytes.map(b => b.toString(16).padStart(2, '0')).join('')

        return `${timeLow}-${timeMid}-${timeHi}-${randomPart.slice(0, 4)}-${randomPart.slice(4, 16)}`
    }

    const generateUuid = (): string => {
        switch (version) {
            case 'v1':
                return v1()
            case 'v3':
                return v3(name, namespace || v3.URL)
            case 'v4':
                return v4()
            case 'v5':
                return v5(name, namespace || v5.URL)
            case 'v6':
                return generateUuidV6()
            case 'v7':
                return generateUuidV7()
            default:
                return v4()
        }
    }

    const generateSingleUuid = () => {
        const uuid = generateUuid()
        setGeneratedUuid(uuid)
        setMultipleResults([])
    }

    const generateMultipleUuids = () => {
        const uuids: string[] = []
        for (let i = 0; i < quantity; i++) {
            uuids.push(generateUuid())
        }
        setMultipleResults(uuids)
        setGeneratedUuid('')
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            showCopyFeedback('UUID copiado!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const copyAllUuids = async () => {
        if (multipleResults.length === 0) return

        const allUuids = multipleResults.join('\n')
        try {
            await navigator.clipboard.writeText(allUuids)
            showCopyFeedback('Todos os UUIDs copiados!')
        } catch (err) {
            showCopyFeedback('Erro ao copiar')
        }
    }

    const showCopyFeedback = (message: string) => {
        setCopyFeedback(message)
        setTimeout(() => setCopyFeedback(''), 2000)
    }

    const getVersionColor = (ver: UuidVersion): string => {
        switch (ver) {
            case 'v1': return 'text-blue-600'
            case 'v3': return 'text-green-600'
            case 'v4': return 'text-purple-600'
            case 'v5': return 'text-orange-600'
            case 'v6': return 'text-indigo-600'
            case 'v7': return 'text-pink-600'
            default: return 'text-gray-600'
        }
    }

    const getVersionDescription = (ver: UuidVersion): string => {
        switch (ver) {
            case 'v1': return 'Baseado em timestamp e MAC address'
            case 'v3': return 'Baseado em namespace e nome (MD5)'
            case 'v4': return 'Gerado aleatoriamente (mais comum)'
            case 'v5': return 'Baseado em namespace e nome (SHA-1)'
            case 'v6': return 'Baseado em timestamp (ordenável)'
            case 'v7': return 'Baseado em timestamp (ordenável, mais recente)'
            default: return ''
        }
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Icons.Hash className="w-6 h-6 text-blue-600" />
                    Gerador de UUID
                </h2>
                <p className="text-gray-600">Gere UUIDs válidos em diferentes versões</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Versão UUID
                        </label>
                        <select
                            value={version}
                            onChange={(e) => setVersion(e.target.value as UuidVersion)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="v1">UUID v1</option>
                            <option value="v3">UUID v3</option>
                            <option value="v4">UUID v4</option>
                            <option value="v5">UUID v5</option>
                            <option value="v6">UUID v6</option>
                            <option value="v7">UUID v7</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quantidade
                        </label>
                        <select
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={1}>1 UUID</option>
                            <option value={5}>5 UUIDs</option>
                            <option value={10}>10 UUIDs</option>
                            <option value={20}>20 UUIDs</option>
                            <option value={50}>50 UUIDs</option>
                        </select>
                    </div>

                    {(version === 'v3' || version === 'v5') && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Namespace
                                </label>
                                <input
                                    type="text"
                                    value={namespace}
                                    onChange={(e) => setNamespace(e.target.value)}
                                    placeholder="Ex: 6ba7b810-9dad-11d1-80b4-00c04fd430c8"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ex: exemplo.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={generateSingleUuid}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Icons.Plus className="w-5 h-5" />
                        Gerar 1 UUID
                    </Button>

                    <Button
                        onClick={generateMultipleUuids}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Icons.RefreshCw className="w-5 h-5" />
                        Gerar {quantity} UUIDs
                    </Button>
                </div>
            </div>

            {generatedUuid && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">UUID Gerado</h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getVersionColor(version)}`}>
                                {version.toUpperCase()}
                            </span>
                            <Button
                                onClick={() => copyToClipboard(generatedUuid)}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1"
                            >
                                <Icons.Copy className="w-4 h-4" />
                                Copiar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-lg font-mono text-gray-900 text-center break-all">{generatedUuid}</p>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2">
                            <Icons.Info className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-800 text-sm">
                                {getVersionDescription(version)}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {multipleResults.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {multipleResults.length} UUID{multipleResults.length > 1 ? 's' : ''} Gerado{multipleResults.length > 1 ? 's' : ''}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${getVersionColor(version)}`}>
                                {version.toUpperCase()}
                            </span>
                            <Button
                                onClick={copyAllUuids}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2"
                            >
                                <Icons.Copy className="w-5 h-5" />
                                Copiar Todos
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {multipleResults.map((uuid, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-500 w-8">#{index + 1}</span>
                                    <span className="font-mono text-gray-900 text-sm break-all">{uuid}</span>
                                    <span className={`text-xs font-medium ${getVersionColor(version)}`}>
                                        {version.toUpperCase()}
                                    </span>
                                </div>
                                <Button
                                    onClick={() => copyToClipboard(uuid)}
                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <Icons.Copy className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {copyFeedback && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
                    {copyFeedback}
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                    <Icons.Info className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h4 className="text-blue-900 font-medium mb-2">Versões de UUID</h4>
                        <div className="space-y-2 text-blue-800 text-sm">
                            <div><strong>UUID v1:</strong> Baseado em timestamp e endereço MAC</div>
                            <div><strong>UUID v3:</strong> Baseado em namespace e nome usando MD5</div>
                            <div><strong>UUID v4:</strong> Gerado aleatoriamente (mais comum)</div>
                            <div><strong>UUID v5:</strong> Baseado em namespace e nome usando SHA-1</div>
                            <div><strong>UUID v6:</strong> Baseado em timestamp (ordenável)</div>
                            <div><strong>UUID v7:</strong> Baseado em timestamp (ordenável, mais recente)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UuidGenerator 