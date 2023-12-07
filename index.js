'use strict';
const Hapi = require('@hapi/hapi');
const UserRoutes = require("./Routes/UserRoute");
const productRoutes = require("./Routes/ProductRoute");
const orderRoutes = require("./Routes/OrderRoute");


const server = Hapi.server({
    port: 8080,
    host: 'localhost'
});
const init = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return '<h3>Hello!</h3>';
        }
    });
    server.route({
        method: 'GET',
        path: '/home/{name}',
        handler: (request, h) => {
            return `Hello ${request.params.name}!`;
        }

    });
    // Routes
    await server.route(UserRoutes);
    await server.route(productRoutes);
    await server.route(orderRoutes);
}; init();