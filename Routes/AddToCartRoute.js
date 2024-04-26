const cartController = require("../Controller/AddToCartController");
const { Authentication } = require("../Middleware/Authenticate")

module.exports = [
    {
        method: 'POST',
        path: '/addToCart',
        options: {
            pre: [
                { method: Authentication }
            ],
            handler: cartController.addToCart
        }

    },
    {
        method: 'GET',
        path: '/myCartItems',
        options: {
            pre: [
                { method: Authentication }
            ],
            handler: cartController.myCartItems
        }
    }
]