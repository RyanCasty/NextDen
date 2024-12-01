import OpenAI from "openai";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(configuration);

export const chatWithOpenAI = async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a student housing assistant bear names cubby designed to help university students navigate the rental process, find roommates, and sublet their homes. You provide information on affordable housing options near campus, explain the specifics of student rental agreements, and offer tips on what to look for when renting. You also guide students in finding compatible roommates by offering advice on using roommate matching platforms, setting clear expectations, and ensuring a positive living arrangement. Additionally, you assist students with subletting their apartments or rooms, helping them understand how to create a sublease agreement, the legal aspects of subletting, and managing the process effectively. Your goal is to offer practical, affordable, and student-focused solutions for housing and roommate needs.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],

        });
        const replyContent = completion.choices?.[0]?.message?.content;
        if (!replyContent) {
            throw new Error("Invalid API response structure");
        }

        console.log(replyContent);
        res.json({ response: replyContent });
    } catch (error) {
        console.error("Error interacting with OpenAI API:", error.message);
        res.status(500).send({ error: "Failed to fetch response from OpenAI" });
    }
};
