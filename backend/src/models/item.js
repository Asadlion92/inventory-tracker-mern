import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Electronics", "Tools", "Office Supplies", "Safety Equipment", "Consumables", "Others"]
    }
},
{
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

export default Item
