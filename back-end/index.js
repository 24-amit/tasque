const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = express.Router();

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
// router.get("/")

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});