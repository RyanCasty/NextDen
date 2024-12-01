import express from "express";
import { getAllListings, getListingByUUID } from "../controllers/listingController.js";

const router = express.Router();

// Route to fetch all listings
router.get("/listings", getAllListings);

// Route to fetch a listing by UUID
router.get("/listings/:uuid", getListingByUUID);

export default router;
