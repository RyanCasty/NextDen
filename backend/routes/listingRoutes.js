import express from "express";
import { getAllListings, getListingByUUID } from "../controllers/listingController.js";

const router = express.Router();

// Route to fetch all hardcoded listings
router.get("/listings", getAllListings);

// Route to fetch a single hardcoded listing by UUID
router.get("/listings/:uuid", getListingByUUID);

export default router;
