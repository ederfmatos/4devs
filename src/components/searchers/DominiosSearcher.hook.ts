import { useState } from 'react';
import { dominiosService } from '@/services';
import type { DominioInfo } from '@/types';

export const useDominiosSearcher = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [domainInfo, setDomainInfo] = useState<DominioInfo | null>(null);

  const cleanDomain = (domain: string) => {
    return domain
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .trim();
  };

  const isValidDomain = (domain: string) => {
    const clean = cleanDomain(domain);
    return clean.includes('.') && clean.length > 3;
  };

  const searchDomain = async (domainValue?: string) => {
    const domainToSearch = domainValue || domain;

    if (!domainToSearch) {
      setError('Por favor, digite um domínio');
      return;
    }

    if (!isValidDomain(domainToSearch)) {
      setError('Por favor, digite um domínio válido');
      return;
    }

    setLoading(true);
    setError('');
    setDomainInfo(null);

    try {
      const result = await dominiosService.searchDomain(domainToSearch);
      setDomainInfo(result);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar domínio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setDomain('');
    setDomainInfo(null);
    setError('');
  };

  const getDomainStatus = () => {
    if (!domainInfo) return null;

    return {
      isAvailable: domainInfo.status === 'disponível',
      status: domainInfo.status,
      statusCode: domainInfo.status_code,
    };
  };

  return {
    domain,
    setDomain,
    loading,
    error,
    domainInfo,
    cleanDomain,
    isValidDomain,
    searchDomain,
    clearSearch,
    getDomainStatus,
  };
};
