import express from 'express';
import path from 'path';
import router from "./router";

/**1-ENTRANCE**/
const app = express();
console.log("dirname: ", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**2-SESSIONS**/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/**3-VIEWS**/
/**4-ROUTERS**/
app.use("/", router); // (Design) Middleware pattern


export default app; //module.exports = app; 



