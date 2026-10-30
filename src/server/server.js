import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ai", async (req, res) => {
    try {

        // TEST ONLY - Gemini quota limit
        // return res.status(429).json({
        // error: "AI_LIMIT_REACHED",
        // reply: "Sorry, the AI usage limit has been reached. Please try again later."
        // });

        const { message, context } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const prompt = `
        You are an AI assistant inside a Book Store website.

        Your role is to help users with questions related to books,
        authors, literature, novels, stories, characters, genres,
        publishing information, and works by authors.

        The user is currently viewing a specific book or author.

        For questions related to the current book or author:
        - Use the provided context as the primary source when it contains
        the needed information.
        - If the information is not included in the context, you may use
        your general knowledge to answer.
        - Do not make up information when you are not reasonably confident.
        - Clearly mention uncertainty when necessary.

        You may also answer related questions about:
        - The author's other books or works.
        - The book's genre or themes.
        - Characters and story-related information.
        - Similar books or authors.
        - General literary topics related to the user's question.

        However, you must NOT answer questions that are unrelated to
        books, authors, literature, or the Book Store.

        For unrelated questions, politely respond:
        "I'm here to help with books and authors. Please ask me something
        related to the book or author you're viewing."

        Keep your answers helpful, natural, and concise.

        Current context:
        ${context}

        User question:
        ${message}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt
        });

        res.json({
            reply: response.text
        });

    } catch (error) {
        console.error("AI Error:", error);

        const errorMessage = error?.message || "";

        if (
            error?.status === 429 ||
            errorMessage.toLowerCase().includes("quota") ||
            errorMessage.toLowerCase().includes("rate limit") ||
            errorMessage.toLowerCase().includes("resource exhausted")
        ) {
            return res.status(429).json({
                error: "AI_LIMIT_REACHED",
                reply: "Sorry, the AI usage limit has been reached. Please try again later."
            });
        }

        res.status(500).json({
            error: "Failed to get AI response"
        });
    }
});

app.listen(3001, () => {
    console.log("AI server running on http://localhost:3001");
});