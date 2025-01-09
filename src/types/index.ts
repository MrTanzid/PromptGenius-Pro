export type Purpose = 'business' | 'technical' | 'creative' | 'academic';
export type Tone = 'formal' | 'casual' | 'professional' | 'friendly';
export type Complexity = 'basic' | 'intermediate' | 'advanced' | 'expert';
export type Length = 'concise' | 'moderate' | 'detailed' | 'comprehensive';

export interface PromptConfig {
  topic: string;
  purpose: Purpose;
  tone: Tone;
  complexity: Complexity;
  length: Length;
  additionalContext?: string;
  outputFormat?: string;
}

export interface GeneratedPrompt {
  id: string;
  timestamp: number;
  config: PromptConfig;
  prompt: string;
  score: number;
  version: number;
}