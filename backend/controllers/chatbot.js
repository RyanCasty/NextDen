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
                { role: "user", content: message },
            ],
            max_tokens: 100, // Adjust token limit as needed
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error interacting with OpenAI API:", error);
        res.status(500).send({ error: "Failed to fetch response from OpenAI" });
    }
};
