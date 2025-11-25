import { GoogleGenAI } from "@google/genai";

const fetchSurveyInfo = async (): Promise<string> => {
    // IMPORTANT: The API key must be set in the environment variables.
    if (typeof process === 'undefined' || !process.env.API_KEY) {
        console.error("API_KEY environment variable not set or 'process' is not defined in this environment.");
        throw new Error("AI Service not configured.");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
        const prompt = `Genera un resumen informativo y atractivo sobre el mundo de las encuestas para el dashboard de la aplicación 'Miencuesta'.
        Cubre su importancia, los diferentes tipos que existen, y algunos datos curiosos.
        El tono debe ser profesional pero accesible.
        Formatea la salida con Markdown, usando '##' para títulos principales y '###' para subtítulos y '*' para listas. No incluyas un título principal al inicio, empieza directamente con una introducción.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        console.error("Error fetching data from Gemini API:", error);
        throw new Error("Failed to communicate with the AI service.");
    }
};

export { fetchSurveyInfo };