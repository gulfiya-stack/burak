import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_URL as string, {})
    .then((data) => {
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003;
    })
    .catch((err) => console.log("Error on connection MongoDB", err));













































// console.log("Executed");

// import moment from "moment";
// const currentTime = moment().format("YYYY MM DD");
// console.log(currentTime);

// const person: string = "Martin";
// const count: number = 100;


//Architectural pattern: MVC, DI, MVP
//Design pattern: Middleware, Decorator

// import moment from "moment"; // const moment = require("moment");

// import dotenv from 'dotenv';
// dotenv.config();
// Tekshirish log
// console.log("PORT: ", process.env.PORT);
// console.log("MONGO_URL: ", process.env.MONGO_URL);

// CLUSTER->Database->Collection->Document 

