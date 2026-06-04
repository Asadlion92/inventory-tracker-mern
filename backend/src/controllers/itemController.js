export const getAllItems = () => {
    res.status(200).send("You have 20 items inside your inventory")
};

export const createItem = () => {
    res.status(201).json({message: "Item created successfully!"})
};

export const updateItem = () => {
    res.status(200).json({message: "Item updated successfully!"})
};

export const deleteItem = () => {
    res.status(200).json({message: "Item deleted successfully!"})
};
