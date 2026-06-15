import Item from "../models/item.js";

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        console.error("Error in getAllItems controller", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
};

export const createItem = async (req, res) => {
    try {
        const {name, quantity, price, category} = req.body;
        const item = new Item({name, quantity, price, category});
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error("Error in createItem controller", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
};

export const updateItem = () => {
    res.status(200).json({message: "Item updated successfully!"})
};

export const deleteItem = () => {
    res.status(200).json({message: "Item deleted successfully!"})
};
