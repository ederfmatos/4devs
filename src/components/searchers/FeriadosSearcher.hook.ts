import { useEffect, useState } from 'react';
import { feriadosService } from '@/services';
import type { Feriado } from '@/types';

export const useFeriadosSearcher = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feriados, setFeriados] = useState<Feriado[]>([]);

  useEffect(() => {
    searchFeriados();
  }, []);

  const searchFeriados = async (yearValue?: number) => {
    const yearToSearch = yearValue || year;

    if (yearToSearch < 1900 || yearToSearch > 2100) {
      setError('Ano deve estar entre 1900 e 2100');
      return;
    }

    setLoading(true);
    setError('');
    setFeriados([]);

    try {
      const result = await feriadosService.getFeriados(yearToSearch);
      setFeriados(result);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar feriados. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setFeriados([]);
    setError('');
  };

  const getFeriadosByMonth = () => {
    const feriadosByMonth: { [key: number]: Feriado[] } = {};

    feriados.forEach(feriado => {
      const month = new Date(feriado.date).getMonth() + 1;
      if (!feriadosByMonth[month]) {
        feriadosByMonth[month] = [];
      }
      feriadosByMonth[month].push(feriado);
    });

    return feriadosByMonth;
  };

  const getMonthName = (month: number) => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1];
  };

  const getFeriadosByType = () => {
    const feriadosByType: { [key: string]: Feriado[] } = {};

    feriados.forEach(feriado => {
      if (!feriadosByType[feriado.type]) {
        feriadosByType[feriado.type] = [];
      }
      feriadosByType[feriado.type].push(feriado);
    });

    return feriadosByType;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('pt-BR');
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
  };

  return {
    year,
    setYear,
    loading,
    error,
    feriados,
    searchFeriados,
    clearSearch,
    getFeriadosByMonth,
    getFeriadosByType,
    formatDate,
    getDayOfWeek,
    getMonthName,
  };
};
