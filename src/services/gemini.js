import { GoogleGenerativeAI } from "@google/generative-ai";

// Placeholder for API Key - User must replace this!
const API_KEY = "AIzaSyAJj83Q4qF83L777-7y3cLYKJ0xX7pTNqA";

const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeMedicineImage = async (imageBlob) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Convert Blob to Base64
        const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.readAsDataURL(imageBlob);
        });

        const prompt = `
      Analyze this image of a medicine package. 
      Extract the following details and return them in strictly valid JSON format:
      {
        "name": "Medicine Name",
        "lotNumber": "Lot/Batch Number",
        "manufacturingDate": "YYYY-MM-DD",
        "expirationDate": "YYYY-MM-DD"
      }
      If a field is not found, use null. 
      Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
    `;

        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text); // Debug log

        // Clean up markdown if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        try {
            const parsedJson = JSON.parse(cleanText);
            console.log("Gemini Parsed JSON:", parsedJson); // Debug log
            return parsedJson;
        } catch (e) {
            console.error("JSON Parse Error. Raw text:", text);
            throw new Error("Failed to parse AI response. See console for details.");
        }
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
};
