const productController = require("../Controller/Products_controller");

module.exports = [
    {
        method: 'POST',
        path: '/add-Product',
        handler: productController.addProduct
    },

    {
        method: 'GET',
        path: '/get-all-products',
        handler: productController.getAllProducts
    }
]