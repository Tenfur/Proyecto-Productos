const express = require("express");
const cors = require("cors");
const connectDatabase = require("../config/database");
const routerApi = require("../routes/indexRoute");
const fileUpload = require("express-fileupload");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // Connect to the database
        this.connectDatabase();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    }
    async connectDatabase(){
        await connectDatabase();
    }
    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("./src/public"));

        this.app.use(express.urlencoded({extended: true}));

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: "/tmp/"
        }));

    }
    routes(){
        routerApi(this.app);

    }
    listen(){
        this.app.listen(this.port, () => {
            console.log("Server running in the port:", this.port)
        })
    }
};


module.exports = Server;