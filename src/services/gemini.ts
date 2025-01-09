import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generatePrompt = async (input: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(input);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw error;
  }
};