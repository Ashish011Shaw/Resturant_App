const orderController = require("../Controller/Order_Controller")
const { Authentication } = require("../Middleware/Authenticate")

module.exports = [
    {
        method: 'POST',
        path: '/add-Order',
        options: {
            pre: [
                { method: Authentication }
            ],
            handler: orderController.addOrder
        },
        // handler: orderController.addOrder

    }
]

