import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4">
        <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Crafting Your Perfect Prompt
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Optimizing for maximum effectiveness...
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;