import { Button, Icons, Text } from '@/components';
import { useState } from 'react';

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setError('');
      return;
    }

    try {
      // Primeiro, fazemos o parse para validar se é JSON válido
      const parsed = JSON.parse(inputJson);
      // Depois formatamos com indentação de 2 espaços
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setError('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError('JSON inválido: ' + message);
      setFormattedJson('');
    }
  };

  const copyToClipboard = async () => {
    if (!formattedJson) return;

    try {
      await navigator.clipboard.writeText(formattedJson);
      showCopyFeedback('JSON formatado copiado!');
    } catch {
      showCopyFeedback('Erro ao copiar');
    }
  };

  const showCopyFeedback = (message: string) => {
    setCopyFeedback(message);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  const reset = () => {
    setInputJson('');
    setFormattedJson('');
    setError('');
  };

  const minifyJson = () => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setError('');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setError('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError('JSON inválido: ' + message);
      setFormattedJson('');
    }
  };

  const isValidJson = () => {
    if (!inputJson.trim()) return false;
    try {
      JSON.parse(inputJson);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <Text variant='h2' weight='bold' className='mb-2'>
          Formatador de JSON
        </Text>
        <Text variant='body-lg' color='secondary'>
          Formate e valide JSON de forma rápida e eficiente
        </Text>
      </div>

      {/* Campo de entrada */}
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between mb-4'>
          <Text variant='h4' weight='semibold'>
            JSON Original
          </Text>
          <div className='flex items-center gap-2'>
            {inputJson.trim() && (
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                  isValidJson()
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                }`}
              >
                <Icons.CheckCircle className='w-3 h-3' />
                {isValidJson() ? 'Válido' : 'Inválido'}
              </div>
            )}
          </div>
        </div>

        <textarea
          value={inputJson}
          onChange={e => setInputJson(e.target.value)}
          placeholder='Cole seu JSON aqui...'
          className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm'
        />
      </div>

      {/* Botões de ação */}
      <div className='flex flex-col sm:flex-row gap-3'>
        <Button
          onClick={formatJson}
          icon='RefreshCw'
          variant='primary'
          size='lg'
          fullWidth
          disabled={!inputJson.trim()}
        >
          Formatar JSON
        </Button>

        <Button
          onClick={minifyJson}
          icon='Minus'
          variant='secondary'
          size='lg'
          fullWidth
          disabled={!inputJson.trim()}
        >
          Minificar JSON
        </Button>

        <Button
          onClick={copyToClipboard}
          icon='Copy'
          variant='success'
          size='lg'
          fullWidth
          disabled={!formattedJson}
        >
          Copiar Resultado
        </Button>

        <Button
          onClick={reset}
          icon='RotateCcw'
          variant='outline'
          size='lg'
          fullWidth
        >
          Resetar
        </Button>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
          <div className='flex items-start gap-3'>
            <Icons.AlertCircle className='w-5 h-5 text-red-600 dark:text-red-400 mt-0.5' />
            <div>
              <Text variant='h5' color='error' weight='medium' className='mb-1'>
                Erro de Validação
              </Text>
              <Text variant='body-sm' color='error'>
                {error}
              </Text>
            </div>
          </div>
        </div>
      )}

      {/* Campo de saída */}
      {formattedJson && (
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between mb-4'>
            <Text variant='h4' weight='semibold'>
              JSON Formatado
            </Text>
            <Text variant='body-sm' color='secondary'>
              {formattedJson.split('\n').length} linhas
            </Text>
          </div>

          <textarea
            value={formattedJson}
            readOnly
            className='w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-mono text-sm'
          />
        </div>
      )}

      {/* Feedback de cópia */}
      {copyFeedback && (
        <div className='fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300'>
          {copyFeedback}
        </div>
      )}

      {/* Informações */}
      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
        <div className='flex items-start gap-3'>
          <Icons.Info className='w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5' />
          <div>
            <Text variant='h5' color='info' weight='medium' className='mb-1'>
              Como Funciona
            </Text>
            <div className='space-y-1 flex flex-col gap-1'>
              <Text variant='body-sm' color='info'>
                • Cole seu JSON no campo "JSON Original"
              </Text>
              <Text variant='body-sm' color='info'>
                • Clique em "Formatar JSON" para formatar com indentação
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Minificar JSON" para remover espaços desnecessários
              </Text>
              <Text variant='body-sm' color='info'>
                • O JSON formatado aparecerá no campo abaixo
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Copiar Resultado" para copiar o JSON processado
              </Text>
              <Text variant='body-sm' color='info'>
                • Use "Resetar" para limpar todos os campos
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
