const models = require('../models');

// add products
const addProduct = async (req, h) => {
    try {
        const { productName, price } = req.payload;
        if (!productName) {
            return h.response({ message: "Please enter your name" });
        }
        if (!price) {
            return h.response({ message: "Please enter your price" });
        }

        const newProduct = await models.Products.create({ productName, price });
        return h.response({ message: "Sucessfully Product added", data: newProduct }).code(201);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// get all products 
const getAllProducts = async (req, h) => {
    try {
        const products = await models.Products.findAll();
        return h.response({ success: true, message: "Sucessfully Products fetched", data: products }).code(201);


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}



module.exports = {
    addProduct,
    getAllProducts
}
