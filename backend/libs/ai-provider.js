import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Try different model names in order of preference
const AVAILABLE_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-flash-latest",
  "gemini-pro-latest",
];

let model = null;

const listModels = async () => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  );
  const data = await res.json();
  console.log(data);

};

// Initialize model
const initializeModel = () => {
  for (const m of AVAILABLE_MODELS) {
    try {
      model = genAI.getGenerativeModel({ model: m });
      console.log(`✓ Initialized with model: ${m}`);
      return;
    } catch (err) {
      console.warn(`Failed model: ${m}`);
    }
  }

  throw new Error("No Gemini models available");
};

initializeModel();

export const generateSummary = async (prompt) => {
  try {
    if (!model) {
      initializeModel();
    }

    // Use stable generateContent API
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    const response = await result.response;
    const text = result.response?.text();


    if (!text) {
      throw new Error("No response text from Gemini API");
    }

    return text;
  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    
    // Provide helpful error messages
    if (error.message.includes("404")) {
      throw new Error(
        "Gemini model not available with this API key. Try: 1) Verify API key is valid at https://ai.google.dev 2) Check API has Gemini enabled"
      );
    }
    
    if (error.message.includes("UNAUTHENTICATED")) {
      throw new Error("Invalid Gemini API key. Get a new one at https://ai.google.dev");
    }

    throw new Error("Failed to generate summary from AI: " + error.message);
  }
};

export const parseAISummary = (text) => {
  // Parse AI response to extract main summary, insights, and recommendations
  const lines = text.split("\n").filter((line) => line.trim());

  const summary = lines.slice(0, 3).join(" ");

  // Extract key insights (lines starting with •, -, or numbers)
  const keyInsights = lines
    .filter((line) => /^[•\-*]|^\d+\./.test(line.trim()))
    .slice(0, 5)
    .map((line) => line.replace(/^[•\-*\d.]\s*/, ""));

  // Extract recommendations
  const recommendations = lines
    .filter(
      (line) =>
        line.toLowerCase().includes("recommend") ||
        line.toLowerCase().includes("suggest")
    )
    .slice(0, 3);

  return {
    summary,
    keyInsights: keyInsights.length > 0 ? keyInsights : undefined,
    recommendations: recommendations.length > 0 ? recommendations : undefined,
  };
};
