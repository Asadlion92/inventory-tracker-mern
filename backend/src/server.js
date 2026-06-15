import express from "express";
import itemRoutes from './routes/itemRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

//middleware
app.use(express.json());

app.use("/api/inventory", itemRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT)
});

export default app;