const productRoute = require("./productsRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const uploadRoute = require("./uploadImageRoute");
const searchRoute = require("./searchRoute");

const routerApi = (app) => {
    app.use("/api/products", productRoute);
    app.use("/api/users", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/uploads", uploadRoute);
    app.use("/api/search", searchRoute);
}

module.exports = routerApi;

