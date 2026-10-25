import express from 'express';
import path from 'path';
import router from "./router";
import routerAdmin from "./router-admin";
import morgan from "morgan";
import { MORGAN_FORMAT } from './libs/config';

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from './libs/types/common';
const MongoDBStore = ConnectMongoDB(session);

const store = new MongoDBStore({        // TCP2 connection to MongoDB
    //Konstruktorga  2 property uzatyabmiz
    uri: String(process.env.MONGO_URL),

    collection: "sessions",
});

/**1-ENTRANCE**/
const app = express();
console.log("dirname: ", __dirname);
app.use(express.static(path.join(__dirname, "public")));
// public ni brauzer orqali olishga ochiqlayabmiz
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));
// app.use(morgan(`:method :url :response-time [:status] \n`));

/**2-SESSIONS**/
app.use(                         // MIDDLEWARE PATTERN da TCP2 ishga tushadi
    session({
        secret: String(process.env.SESSION_SECRET), //propertylar
        // cookie ni imzolaydigan maxfiy kalit
        cookie: { //brauzerdagi sid sozlamasi
            maxAge: 1000 * 3600 * 6,   // 6h   
            // maxAge: 1000 * 10, //10s
        },
        store: store, //qayerda saqlanishi
        resave: true,  // false - deleted after 3 hours, true - refreshed
        saveUninitialized: true, // loginsiz session yasaydi
    })
);
app.use(function (req, res, next) {
    const sessionInstance = req.session as T;
    // foydalanuvchining sessionini session Instance ga saqladik
    res.locals.member = sessionInstance.member;
    next();
    // 
}
);
/**3-VIEWS**/
app.set("views", path.join(__dirname, 'views'));
// ejs fayllarning pathini beryabmiz8 9
app.set("view engine", "ejs");
//EJS ishlatishni belgilayabmiz
//view engine - shablondan tayyor HTML yasaydigan vosita
/**4-ROUTERS**/
app.use("/admin", routerAdmin); //EJS, BSSR
app.use("/", router); // React // (Design) Middleware pattern
// Goal1: SPA: REACT (REST API)
// Goal2: BSSR: EJS 

export default app; //module.exports = app; 



