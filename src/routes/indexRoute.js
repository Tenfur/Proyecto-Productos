const productRoute = require("./productsRoute");
const userRoute = require("./userRoute");

const routerApi = (app) => {
    app.use("/api/products", productRoute);
    app.use("/api/users", userRoute);
}

module.exports = routerApi;

