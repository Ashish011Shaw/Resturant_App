const usersControllers = require("../Controller/User_Controller");
const { Authentication } = require("../Middleware/Authenticate")

module.exports = [
    {
        method: 'POST',
        path: '/signUp',
        handler: usersControllers.signUp
    },
    {
        method: 'POST',
        path: '/signIn',
        handler: usersControllers.signInUser
    },
    {
        method: 'GET',
        path: '/userOrderHistory',
        options: {
            pre: [
                { method: Authentication }
            ],
            handler: usersControllers.userOrderHistory
        },

    }
]

