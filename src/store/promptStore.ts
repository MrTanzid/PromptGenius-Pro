import { create } from 'zustand';
import { GeneratedPrompt, PromptConfig } from '../types';

interface PromptStore {
  history: GeneratedPrompt[];
  currentConfig: PromptConfig;
  setConfig: (config: Partial<PromptConfig>) => void;
  addToHistory: (prompt: GeneratedPrompt) => void;
  clearHistory: () => void;
}

const defaultConfig: PromptConfig = {
  topic: '',
  purpose: 'business',
  tone: 'professional',
  complexity: 'intermediate',
  length: 'moderate',
};

export const usePromptStore = create<PromptStore>((set) => ({
  history: [],
  currentConfig: defaultConfig,
  setConfig: (config) =>
    set((state) => ({
      currentConfig: { ...state.currentConfig, ...config },
    })),
  addToHistory: (prompt) =>
    set((state) => ({
      history: [prompt, ...state.history],
    })),
  clearHistory: () => set({ history: [] }),
}));