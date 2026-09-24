import express from 'express';
import path from 'path';
import router from "./router";
import routerAdmin from "./routerAdmin";

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
app.use("/admin", routerAdmin); //EJS, BSSR
app.use("/", router); // React // (Design) Middleware pattern
// Goal1: SPA: REACT (REST API)
// Goal2: BSSR: EJS

export default app; //module.exports = app; 



