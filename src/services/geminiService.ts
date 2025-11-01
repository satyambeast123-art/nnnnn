
import { getApiKeyFromRuntime } from "../utils/getApiKey";
import { GoogleGenAI } from "@google/genai";
import { QUIZ_QUESTIONS } from "../../constants";
import { Option } from '../types';

interface Answer {
  question: string;
  answer: string;
}

export async function generateRoutine(answers: (Option | undefined)[]): Promise<string> {
 const apiKey = getApiKeyFromRuntime();
const ai = new GoogleGenAI({ apiKey });


  const formattedAnswers: Answer[] = answers
    .map((answer, index) => {
      if (!answer) return null;
      return {
        question: QUIZ_QUESTIONS[index].text,
        answer: answer.text,
      };
    })
    .filter((a): a is Answer => a !== null);

  const prompt = `
You are an AI assistant specializing in behavioral psychology and self-improvement. Your goal is to provide a helpful, non-judgmental, and supportive routine for an individual looking to build self-discipline.

Based on the following quiz answers, generate a simple, actionable, and positive daily/weekly routine. The routine should be encouraging and focus on building healthy habits, mindfulness, and constructive coping mechanisms.

**Important Guidelines:**
1.  **Positive Framing:** Frame all suggestions positively. Instead of "stop doing X," suggest "start doing Y."
2.  **Actionable Steps:** Provide concrete, small, and manageable steps.
3.  **Non-Judgmental Tone:** Use supportive and understanding language. Avoid any shaming or guilt-inducing phrases.
4.  **Do Not Give Medical Advice:** Explicitly state that this is not medical advice and recommend consulting a professional for serious concerns.
5.  **Format:** Use Markdown for clear formatting. Use headings, bold text, and bullet points.

**User's Quiz Answers:**
${formattedAnswers.map(a => `- Question: ${a.question}\n  - Answer: ${a.answer}`).join('\n')}

Please generate the personalized routine now.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating routine:", error);
    throw new Error("Failed to generate your personalized routine. Please check your API key and try again.");
  }
}
