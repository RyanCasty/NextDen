import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    UUID: { type: String, required: true },
    Images: { type: [String], required: true },
    Map: { type: String, required: true },
    Details: {
        "Housing Type": { type: String, required: true },
        "Bedroom(s)": { type: String, required: true },
        Utilities: { type: String },
        "Date Available": { type: String },
        "Lease Term": { type: String },
        Location: { type: String },
        Distance: { type: String },
        "Prefered Gender": { type: String },
        Smoking: { type: String },
        "Tenant Type": { type: String },
        "Utilities Incl": { type: String },
        "Furnished Bdrm(s)": { type: String },
        Transit: { type: String },
        Dishwasher: { type: String },
        Microwave: { type: String },
    },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
