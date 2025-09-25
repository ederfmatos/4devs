import { Cnpj } from '@/domain';
import { useState } from 'react';

export const useCnpjGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [generatedCnpjs, setGeneratedCnpjs] = useState<Cnpj[]>([]);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const generateCnpjs = () => {
    const cnpjs = Cnpj.generateMultiple(quantity);
    setGeneratedCnpjs(cnpjs);
  };

  const clearResults = () => {
    setGeneratedCnpjs([]);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  const copyAllCnpjs = async () => {
    if (generatedCnpjs.length === 0) return;

    const cnpjsText = generatedCnpjs.map(cnpj => cnpj.format()).join('\n');
    await copyToClipboard(cnpjsText);
  };

  return {
    quantity,
    setQuantity,
    generatedCnpjs,
    showCopyFeedback,
    generateCnpjs,
    clearResults,
    copyToClipboard,
    copyAllCnpjs,
  };
};
