import React, { useState } from 'react';
import { usePromptStore } from '../store/promptStore';
import { Purpose, Tone, Complexity, Length } from '../types';
import { generatePrompt } from '../services/gemini';
import LoadingOverlay from './LoadingOverlay';
import { 
  Sparkles, 
  BookOpen, 
  Code, 
  Palette, 
  Briefcase,
  ChevronDown,
  Check,
  Wand2
} from 'lucide-react';

const purposes: { value: Purpose; icon: React.ReactNode; label: string }[] = [
  { value: 'business', icon: <Briefcase className="w-5 h-5" />, label: 'Business' },
  { value: 'technical', icon: <Code className="w-5 h-5" />, label: 'Technical' },
  { value: 'creative', icon: <Palette className="w-5 h-5" />, label: 'Creative' },
  { value: 'academic', icon: <BookOpen className="w-5 h-5" />, label: 'Academic' },
];

const tones: Tone[] = ['formal', 'casual', 'professional', 'friendly'];
const complexities: Complexity[] = ['basic', 'intermediate', 'advanced', 'expert'];
const lengths: Length[] = ['concise', 'moderate', 'detailed', 'comprehensive'];

const PromptForm: React.FC = () => {
  const { currentConfig, setConfig, addToHistory } = usePromptStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const promptText = `Create a ${currentConfig.complexity} level ${currentConfig.purpose} prompt with a ${currentConfig.tone} tone.
        Topic: ${currentConfig.topic}
        Length: ${currentConfig.length}
        ${currentConfig.additionalContext ? `Additional Context: ${currentConfig.additionalContext}` : ''}
        ${currentConfig.outputFormat ? `Output Format: ${currentConfig.outputFormat}` : ''}`;

      const generatedPrompt = await generatePrompt(promptText);
      
      addToHistory({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        config: currentConfig,
        prompt: generatedPrompt,
        score: Math.floor(Math.random() * 3) + 8,
        version: 1,
      });
    } catch (err) {
      setError('Failed to generate prompt. Please try again.');
      console.error('Error generating prompt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
      {isLoading && <LoadingOverlay />}
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter your topic..."
          value={currentConfig.topic}
          onChange={(e) => setConfig({ topic: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Purpose Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('purpose')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-purple-500 transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                {purposes.find(p => p.value === currentConfig.purpose)?.icon}
                <span>{purposes.find(p => p.value === currentConfig.purpose)?.label}</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'purpose' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'purpose' && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.value}
                    type="button"
                    onClick={() => {
                      setConfig({ purpose: purpose.value });
                      toggleDropdown('purpose');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-left"
                  >
                    {purpose.icon}
                    <span>{purpose.label}</span>
                    {currentConfig.purpose === purpose.value && (
                      <Check className="w-4 h-4 ml-auto text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tone Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('tone')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-purple-500 transition-all duration-200"
            >
              <span className="capitalize">{currentConfig.tone}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'tone' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'tone' && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => {
                      setConfig({ tone });
                      toggleDropdown('tone');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-left capitalize"
                  >
                    {tone}
                    {currentConfig.tone === tone && (
                      <Check className="w-4 h-4 ml-auto text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Complexity Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('complexity')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-purple-500 transition-all duration-200"
            >
              <span className="capitalize">{currentConfig.complexity}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'complexity' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'complexity' && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {complexities.map((complexity) => (
                  <button
                    key={complexity}
                    type="button"
                    onClick={() => {
                      setConfig({ complexity });
                      toggleDropdown('complexity');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-left capitalize"
                  >
                    {complexity}
                    {currentConfig.complexity === complexity && (
                      <Check className="w-4 h-4 ml-auto text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Length Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('length')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-purple-500 transition-all duration-200"
            >
              <span className="capitalize">{currentConfig.length}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openDropdown === 'length' ? 'rotate-180' : ''}`} />
            </button>
            {openDropdown === 'length' && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {lengths.map((length) => (
                  <button
                    key={length}
                    type="button"
                    onClick={() => {
                      setConfig({ length });
                      toggleDropdown('length');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-left capitalize"
                  >
                    {length}
                    {currentConfig.length === length && (
                      <Check className="w-4 h-4 ml-auto text-purple-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            placeholder="Additional Context (Optional)"
            value={currentConfig.additionalContext || ''}
            onChange={(e) => setConfig({ additionalContext: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
          />
          <input
            type="text"
            placeholder="Output Format (Optional)"
            value={currentConfig.outputFormat || ''}
            onChange={(e) => setConfig({ outputFormat: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!currentConfig.topic || isLoading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2 className="w-5 h-5" />
        Generate Prompt
      </button>
    </form>
  );
};

export default PromptForm;