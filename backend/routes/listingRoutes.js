import express from "express";
import { fetchHousingData } from "../controllers/listingController.js";

const router = express.Router();

// Route to fetch all listings
router.get("/listings", fetchHousingData);

export default router;
