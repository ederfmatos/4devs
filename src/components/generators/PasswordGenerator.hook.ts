import { useState } from 'react';
import { Password } from '@/domain';
import type { PasswordOptions } from '@/domain/Password';

export const usePasswordGenerator = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });

  const [quantity, setQuantity] = useState(1);
  const [generatedPasswords, setGeneratedPasswords] = useState<Password[]>([]);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const updateOption = (
    key: keyof PasswordOptions,
    value: boolean | number,
  ) => {
    setOptions((prev: PasswordOptions) => ({ ...prev, [key]: value }));
  };

  const generatePasswords = () => {
    const passwords = Password.generateMultiple(quantity, options);
    setGeneratedPasswords(passwords);
  };

  const clearResults = () => {
    setGeneratedPasswords([]);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const copyAllPasswords = async () => {
    if (generatedPasswords.length === 0) return;

    const passwordsText = generatedPasswords
      .map(pwd => pwd.getValue())
      .join('\n');
    await copyToClipboard(passwordsText);
  };

  const getPasswordStrength = (password: string) => {
    const pwd = new Password(password);
    return pwd.validateStrength();
  };

  return {
    options,
    quantity,
    setQuantity,
    generatedPasswords,
    showCopyFeedback,
    updateOption,
    generatePasswords,
    clearResults,
    copyToClipboard,
    copyAllPasswords,
    getPasswordStrength,
  };
};
