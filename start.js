const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { emailSender } = require("./email");

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies

// MongoDB Connection
const MONGO_URI = "mongodb+srv://fashionneeedles:g2MOcqGk5sIfZf1z@cluster0.d7qco.mongodb.net/jiotower?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Schema and Model
const applicationSchema = new mongoose.Schema({
  ownerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  pinCode: { type: String, required: true },
  postOffice: { type: String },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
});

const Application = mongoose.model("Application", applicationSchema);

// Routes
app.post("/apply", async (req, res) => {
  try {
    const {
      ownerName,
      mobileNumber,
      email,
      pinCode,
      postOffice,
      district,
      state,
      country,
      address,
    } = req.body;

    // Validate input
    if (!ownerName || !mobileNumber || !email || !pinCode || !district || !state || !country || !address) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Create a new application
    const newApplication = new Application({
      ownerName,
      mobileNumber,
      email,
      pinCode,
      postOffice,
      district,
      state,
      country,
      address,
    });

    // Save to database
    await newApplication.save();
    emailSender.emailVerification(email, ownerName, mobileNumber, pinCode, district, state, country, address)

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/data", async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
