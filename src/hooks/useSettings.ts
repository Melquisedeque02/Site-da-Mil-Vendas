// src/hooks/useSettings.ts
import { useContext } from 'react';
import { ContentContext } from '../context/ContentContext';

interface UseSettingsReturn {
  settings: Record<string, string>;
  loading: boolean;
  updateSetting: (key: string, value: string) => void;
  resetSettings: () => void;
}

export const useSettings = (): UseSettingsReturn => {
  const context = useContext(ContentContext);
  
  if (!context) {
    // Fallback quando o contexto não está disponível
    return {
      settings: {},
      loading: false,
      updateSetting: () => {},
      resetSettings: () => {}
    };
  }

  const { content, updateContent, resetContent } = context;

  return {
    settings: content,
    loading: false,
    updateSetting: updateContent,
    resetSettings: resetContent
  };
};