import express from "express";

const app = express();

app.get("/api/inventory", (req, res) => {
    res.send("You have 20 items inside your inventory")
});

app.listen(5001, () => {
    console.log("Server is running on port 5001")
});

export default app;