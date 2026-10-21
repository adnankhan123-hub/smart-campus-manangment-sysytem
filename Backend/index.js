
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");




app.get("/", (req, res) => {
    res.send("Smart Campus API is running!");
});
app.use(express.json());
app.use("/api/auth", authRoutes);
// Connect all student routes
app.use("/students", studentRoutes);

async function startServer() {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
