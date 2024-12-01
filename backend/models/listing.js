import mongoose from "mongoose";

// Define a nested schema for 'Details'
const detailsSchema = new mongoose.Schema({
    HousingType: { type: String, default: null },
    Bedrooms: { type: Number, default: 0 },
    Utilities: { type: String, default: null },
    DateAvailable: { type: Date, default: null },
    LeaseTerm: { type: String, default: null },
    Location: { type: String, default: null },
    Distance: { type: String, default: null },
    PreferredGender: { type: String, default: null },
    Smoking: { type: Boolean, default: false },
    TenantType: { type: String, default: null },
    UtilitiesIncl: { type: Boolean, default: false },
    FurnishedBedrooms: { type: Boolean, default: false },
    Transit: { type: String, default: null },
    Dishwasher: { type: Boolean, default: false },
    Microwave: { type: Boolean, default: false },
});

// Main listing schema
const listingSchema = new mongoose.Schema(
    {
        UUID: { type: String, required: true, unique: true },
        Images: { type: [String], default: [] },
        Map: { type: String, default: null },
        Details: { type: detailsSchema, default: {} },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        collection: "Housing Data", // Explicitly set the collection name
    }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
