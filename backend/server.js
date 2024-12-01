import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbot.js";
import connectDB from "./config/db.js";
import listingRoutes from "./routes/listingRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/chat", chatbotRoutes); // Chatbot routes
app.use("/api", listingRoutes); // Listing routes

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
