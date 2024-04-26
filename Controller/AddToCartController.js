const models = require('../models');

const addToCart = async (req, h) => {
    try {
        const userId = req.userId
        if (!userId) {
            return h.response({ success: false, message: "Not a valid User!" }).code(404);
        }


        const { productId, quantity } = req.payload;

        if (!productId) {
            return h.response({ message: "Please enter your product id" }).code(404);
        }
        if (!quantity) {
            return h.response({ message: "Please enter your quantity" }).code(404);
        }


        const cartItem = await models.Cart.create({ userId: req.userId, productId, quantity });
        return h.response({ message: "Sucessfully Order added", data: cartItem }).code(201);
    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// my cart items 
const myCartItems = async (req, h) => {
    try {
        const userId = req.userId
        if (!userId) {
            return h.response({ success: false, message: "Not a valid User!" }).code(404);
        }
        console.log("ititi7")

        const cartItems = await models.Cart.findAll({
            where: { userId: userId },
            include: [{
                model: models.User,
                as: 'user'
            }]
        });
        if (!cartItems) {
            return h.response({ success: false, message: "No Cart Items" }).code(404);
        } else {
            return h.response({ message: "Sucessfully Order added", data: cartItems }).code(201);
        }

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}


module.exports = {
    addToCart,
    myCartItems
}
