const SECRET = "@#$@#%$#CJYC"
const models = require('../models');
const jwt = require('jsonwebtoken');


const Authentication = async (req, h) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return h.response({ message: "No token provided" }).code(400);
        } else {
            const verifytoken = jwt.verify(token, SECRET);
            // console.log("Token verification : ", verifytoken)


            const rootUser = await models.User.findOne({ where: { email: verifytoken.email } });
            // console.log("Root_User", rootUser)


            if (!rootUser) { throw new Error("user not found") }

            req.token = token
            req.rootUser = rootUser
            req.userId = rootUser.id

            // next();
            return req
        }



    } catch (error) {
        console.error('Authentication error:', error);
        return h.response({ message: "Unauthorized User!", error }).code(400);
    }
}

module.exports = {
    Authentication
}
