import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {User} from "./entity/User";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    const userRouter = require('./routes/users')
    const ordersRouter = require('./routes/orders')
    const productsRouter = require('./routes/products')
   
 
    // register express routes from defined application routes
    app.use('/api/users', userRouter)
    app.use('/api/products', productsRouter)
    app.use('/api/orders', ordersRouter)


    // start express server
    app.listen(3000); 


    console.log("Express server has started on port 3000. Open http://localhost:3000 to see results");

}).catch(error => console.log(error));
