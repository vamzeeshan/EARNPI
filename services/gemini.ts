
import { GoogleGenAI } from "@google/genai";

// getFinancialAdvice retrieves tailored earning strategies using Gemini
export const getFinancialAdvice = async (balance: number, earnings: number): Promise<string> => {
  try {
    // Initializing Gemini with the correct structure and direct environment variable access
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am a user on Earn Pi. My current balance is $${balance.toFixed(2)} and my lifetime earnings are $${earnings.toFixed(2)}. 
      Give me 3 short, actionable tips on how to maximize my referrals and earnings on this platform. Keep it professional, encouraging, and brief. Use emojis.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    // Correctly accessing the text property from GenerateContentResponse
    return response.text || "I'm currently analyzing the markets. Check back in a moment!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The financial advisor is temporarily unavailable. Keep earning!";
  }
};
