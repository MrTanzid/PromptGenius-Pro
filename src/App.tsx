import React, { useEffect } from 'react';
import PromptForm from './components/PromptForm';
import PromptHistory from './components/PromptHistory';
import ThemeToggle from './components/ThemeToggle';
import { Sparkles } from 'lucide-react';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
      <ThemeToggle />
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <Sparkles className="w-10 h-10 text-purple-600 dark:text-purple-400 animate-pulse" />
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            PromptGenius Pro
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl animate-fade-in-up">
          Craft perfect AI prompts with advanced engineering tools and professional optimization
        </p>
        <PromptForm />
        <PromptHistory />
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>© 2025 PromptGenius Pro. Made with ❤️ by <b><a href="https://t.me/sp_mrt">MrTanzid</a></b></p>
        </footer>
      </div>
    </div>
  );
}

export default App;