import mongoose from "mongoose";

// Fetch housing data
export const fetchHousingData = async (req, res) => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("Failed to connect to the database: MONGO_URI is not set.");
        return res.status(500).json({ error: "Database connection issue" });
    }

    try {
        // Connect to MongoDB
        const client = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db; // Get the raw database instance
        const collection = db.collection("Housing Data");

        // Fetch data from the collection
        const data = await collection.find({}, { projection: { _id: 0 } }).toArray();

        if (data.length === 0) {
            console.warn("No data retrieved from the database");
            return res.status(200).json([]);
        }

        // Return data
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return res.status(500).json({ error: "Failed to fetch data from the database" });
    } finally {
        // Close the connection
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};
