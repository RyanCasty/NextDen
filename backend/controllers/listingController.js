import Listing from "../models/listing.js";

// Fetch all listings
export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ error: "Failed to fetch listings" });
    }
};

export const getListingByUUID = async (req, res) => {
    const { uuid } = req.params;
    try {
        const listing = await Listing.findOne({ UUID: uuid });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.status(200).json(listing);
    } catch (error) {
        console.error("Error fetching listing by UUID:", error);
        res.status(500).json({ error: "Failed to fetch listing" });
    }
};
