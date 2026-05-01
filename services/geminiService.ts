
import { GoogleGenAI } from "@google/genai";

export const generateMindfulMoment = async (): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API key for Gemini is not configured.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Generate a short, uplifting, and mindful message (2-3 sentences) for an athlete who might be feeling stressed or overwhelmed. The tone should be encouraging and calm.",
    });

    return response.text;
  } catch (error) {
    console.error("Error generating mindful moment:", error);
    return "There was an issue generating a message. Please remember to be kind to yourself today.";
  }
};
