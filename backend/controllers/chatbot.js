import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Fetch API key from .env
});

export const chatWithOpenAI = async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "system", 
                    content: "You are Chubby, a bear-themed assistant specialized in helping users with rent, subletting, and student housing. You provide concise, accurate, and friendly answers to their questions, making the process simple and stress-free." 
                },
                { role: "user", content: message },
            ],
            max_tokens: 100,
        });
        

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error interacting with OpenAI API:", error);
        res.status(500).send({ error: "Failed to fetch response from OpenAI" });
    }
};
