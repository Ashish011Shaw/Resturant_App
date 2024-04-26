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
            return h.response({ message: "You have no valid token. Please login" });
        }

        //  product details including the price
        const product = await models.Products.findByPk(productId);

        if (!product) {
            return h.response({ message: "Product not found" }).code(404);
        }

        //  total amount
        const totalAmountToPay = quantity * product.price;

        // Create a new order
        const newOrder = await models.Orders.create({ userId: req.userId, productId, quantity, totalAmount: totalAmountToPay });

        return h.response({ message: "Successfully Order added", data: newOrder }).code(201);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}


const getUserCart = async (req, h) => {
    try {
        if (!req.userId) {
            return h.response({ message: "You have no valid token. Please login" });
        }

        // Fetch all orders for the user
        const userOrders = await models.Orders.findAll({
            where: { userId: req.userId },
            include: [{ model: models.Products, as: 'product' }],
        });

        if (!userOrders || userOrders.length === 0) {
            return h.response({ message: "No items found in the cart" }).code(404);
        }

        // Calculate the total for different items
        let totalAmount = 0;
        const items = userOrders.map((order) => {
            const { productId, quantity, product } = order;
            const totalAmountForItem = quantity * product.price;
            totalAmount += totalAmountForItem;

            return {
                productId,
                quantity,
                totalAmountForItem,
                productName: product.name,
            };
        });

        return h.response({ message: "User's cart items and total calculated", data: { items, totalAmount } }).code(200);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
};


module.exports = {
    addOrder
}


module.exports = {
    addOrder,
    getUserCart
}