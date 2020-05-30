import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {User} from "./entity/User";
import { CorsOptions } from "cors";
import { OrdersController } from "./controller/OrdersController";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    const userRouter = require('./routes/users')
    const ordersRouter = require('./routes/orders')
    const productsRouter = require('./routes/products')
    const http = require('http')

 
   
    /* CORS middleware */
    const cors = require('cors')
    const corsOptions: CorsOptions = {
        origin: "http://localhost:4200",
        optionsSuccessStatus: 200
    }
    app.use(cors(corsOptions))

    // start express server
    var server = http.createServer(app)

    const io = require('socket.io').listen(server)

    
    io.on("connection", (socket) => {
        console.log("a new user has joined the connection");
    })

    app.use((req:any,res,next) => {
        req.io = io;
        next()
    })

    // register express routes from defined application routes
    app.use('/api/users', userRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/orders', ordersRouter)
    
    server.listen(3000); 



    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");

}).catch(error => console.log(error));
