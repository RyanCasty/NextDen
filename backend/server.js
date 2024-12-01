import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chatbotRoutes from "./routes/chatbot.js";
import connectDB from "./config/db.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = 5001; // Hardcode to 5001


// Middleware
app.use(bodyParser.json());

app.use(cors());
app.options('*', cors()); // Enable preflight across-the-board

// Routes
app.use("/chat", chatbotRoutes); // Chatbot routes
app.use("/api", listingRoutes); // Listing routes

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
