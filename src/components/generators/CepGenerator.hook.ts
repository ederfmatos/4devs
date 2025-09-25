import { Cep } from '@/domain';
import { useState } from 'react';

export const useCepGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [generatedCeps, setGeneratedCeps] = useState<Cep[]>([]);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const generateCeps = () => {
    const ceps = Cep.generateMultiple(quantity);
    setGeneratedCeps(ceps);
  };

  const clearResults = () => {
    setGeneratedCeps([]);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  const copyAllCeps = async () => {
    if (generatedCeps.length === 0) return;

    const cepsText = generatedCeps.map(cep => cep.format()).join('\n');
    await copyToClipboard(cepsText);
  };

  return {
    quantity,
    setQuantity,
    generatedCeps,
    showCopyFeedback,
    generateCeps,
    clearResults,
    copyToClipboard,
    copyAllCeps,
  };
};
