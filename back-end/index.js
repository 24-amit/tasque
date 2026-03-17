import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./modules/user/user.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});