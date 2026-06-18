import express from "express";
import itemRoutes from './routes/itemRoutes.js';
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/Ratelimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log("We just got a new request");
//     next();
// })

app.use("/api/inventory", itemRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT:", PORT)
    });
})

export default app;