const models = require('../models');

// add order
const addOrder = async (req, h) => {
    try {
        const { productId, quantity } = req.payload;

        if (!productId) {
            return h.response({ message: "Please enter your product id" });
        }
        if (!quantity) {
            return h.response({ message: "Please enter your quantity" });
        }
        if (!req.userId) {
            return h.response({ message: "You have no valid token.Please login" });
        }

        const newOrder = await models.Orders.create({ userId: req.userId, productId, quantity });
        return h.response({ message: "Sucessfully Order added", data: newOrder }).code(201);


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

module.exports = {
    addOrder
}