import React from 'react';
import { usePromptStore } from '../store/promptStore';
import { History, Star, Copy } from 'lucide-react';

const PromptHistory: React.FC = () => {
  const { history } = usePromptStore();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mt-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl animate-fade-in-up">
      <div className="flex items-center gap-2 mb-8">
        <History className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Generated Prompts</h2>
      </div>

      <div className="space-y-6">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-200 dark:hover:border-purple-600 transition-all duration-300 transform hover:scale-[1.01] animate-slide-in"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.score}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(item.prompt)}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-medium">{item.prompt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                {item.config.purpose}
              </span>
              <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full">
                {item.config.tone}
              </span>
              <span className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full">
                {item.config.complexity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptHistory;