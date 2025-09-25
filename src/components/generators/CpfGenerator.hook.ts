import { Cpf } from '@/domain';
import { useState } from 'react';

export const useCpfGenerator = () => {
  const [quantity, setQuantity] = useState(1);
  const [generatedCpfs, setGeneratedCpfs] = useState<Cpf[]>([]);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const generateCpfs = () => {
    const cpfs = Cpf.generateMultiple(quantity);
    setGeneratedCpfs(cpfs);
  };

  const clearResults = () => {
    setGeneratedCpfs([]);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  const copyAllCpfs = async () => {
    if (generatedCpfs.length === 0) return;

    const cpfsText = generatedCpfs.map(cpf => cpf.format()).join('\n');
    await copyToClipboard(cpfsText);
  };

  return {
    quantity,
    setQuantity,
    generatedCpfs,
    showCopyFeedback,
    generateCpfs,
    clearResults,
    copyToClipboard,
    copyAllCpfs,
  };
};
