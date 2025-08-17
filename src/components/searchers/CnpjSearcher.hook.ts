import { useState } from 'react';
import { cnpjService } from '@/services';
import type { CnpjData } from '@/types';
import { Cnpj } from '@/domain';

export const useCnpjSearcher = () => {
  const [cnpj, setCnpj] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<CnpjData | null>(null);

  const searchCnpj = async (cnpjValue?: string) => {
    const cnpjToSearch = cnpjValue || cnpj;

    if (!cnpjToSearch) {
      setError('Por favor, digite um CNPJ');
      return;
    }

    const cnpjInstance = new Cnpj(cnpjToSearch);
    if (!cnpjInstance.isValid()) {
      setError(
        'Por favor, digite um CNPJ válido no formato 00.000.000/0000-00',
      );
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await cnpjService.searchCnpj(cnpjToSearch);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar CNPJ. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setCnpj('');
    setData(null);
    setError('');
  };

  const formatCnpj = (value: string) => {
    return new Cnpj(value).format();
  };

  const isValidCnpj = (value: string) => {
    return new Cnpj(value).isValid();
  };

  return {
    cnpj,
    setCnpj,
    loading,
    error,
    data,
    formatCnpj,
    isValidCnpj,
    searchCnpj,
    clearSearch,
  };
};
