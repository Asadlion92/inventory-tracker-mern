import express from "express";
import itemRoutes from './routes/itemRoutes.js'

const app = express();

app.use("api/inventory", itemRoutes);

app.listen(5001, () => {
    console.log("Server is running on port 5001")
});

export default app;