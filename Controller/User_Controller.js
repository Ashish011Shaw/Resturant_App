const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "@#$@#%$#CJYC"


// sign-up users
const signUp = async (req, h) => {
    try {
        const { name, email, password, mobile, billing_address, shipping_address } = req.payload;
        if (!name) {
            return h.response({ message: "Please enter your name" }).code(404);
        }
        if (!email) {
            return h.response({ message: "Please enter your email" }).code(404);;
        }
        if (!password) {
            return h.response({ message: "Please enter your password" }).code(404);;
        }
        if (!mobile) {
            return h.response({ message: "Please enter mobile" }).code(404);
        }
        if (!billing_address) {
            return h.response({ message: "Please enter your billing_address" }).code(404);
        }
        if (!shipping_address) {
            return h.response({ message: "Please enter shipping_address" }).code(404);
        }

        const preUser = await models.User.findOne({ where: { email } });

        if (preUser) {
            return h.response({ message: "User already exists" });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await models.User.create({ name, email, password: hashedPassword, mobile, billing_address, shipping_address });
            return h.response({ message: "Sucessfully sign-up", data: newUser }).code(201);


        }


    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// sign-in user
const signInUser = async (req, h) => {
    try {
        const { email, password } = req.payload;
        if (!email) {
            return h.response({ message: "Please enter your email" });
        }
        if (!password) {
            return h.response({ message: "Please enter your password" });
        }

        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            return h.response({ message: "User not found" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return h.response({ message: "Invalid password" });
            } else {
                const token = jwt.sign({ email: user.email }, SECRET, {
                    expiresIn: "1d"
                })
                return h.response({ message: "Sucessfully sign-in", data: user, token: token }).code(200);
            }
        }

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}

// User order history 
const userOrderHistory = async (req, h) => {
    try {



        const orderHistory = await models.Orders.findAll({ where: { userId: req.userId } });

        return h.response({ success: true, data: orderHistory }).code(201);

    } catch (error) {
        console.log(error);
        return h.response({ message: "Something went wrong", error }).code(400);
    }
}


module.exports = {
    signUp,
    signInUser,
    userOrderHistory
}
