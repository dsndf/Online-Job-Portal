
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyBGf9hDUm2DsxqxO5RbesM8acsr9nyR4rU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


export const generateGeminiResponse = async (prompt: string) => {

    const result = await model.generateContent(prompt);
    console.log(result.response.text().trim());
}