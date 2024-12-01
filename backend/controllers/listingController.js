import listings from "../data/listings.js";

// Fetch all hardcoded listings
export const getAllListings = (req, res) => {
    try {
        if (!listings.length) {
            console.warn("No hardcoded listings available");
            return res.status(404).json({ message: "No listings found" });
        }

        return res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching hardcoded listings:", error);
        return res.status(500).json({ error: "Failed to fetch listings" });
    }
};

// Fetch a single listing by UUID
export const getListingByUUID = (req, res) => {
    const { uuid } = req.params;

    try {
        const listing = listings.find((item) => item.UUID === uuid);

        if (!listing) {
            console.warn(`No hardcoded listing found with UUID: ${uuid}`);
            return res.status(404).json({ message: "Listing not found" });
        }

        return res.status(200).json(listing);
    } catch (error) {
        console.error(`Error fetching hardcoded listing by UUID (${uuid}):`, error);
        return res.status(500).json({ error: "Failed to fetch listing" });
    }
};
