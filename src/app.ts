import express from 'express';
import path from "path"
import routerAdmin from './routerAdmin';
import morgan from 'morgan' // logging standarts
import { MORGAN_FORMAT } from './libs/types/config';

// 1-Entrance 
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); //BSSR
app.use(express.json()); //SPA
app.use(morgan(MORGAN_FORMAT));



// 2- Session


// 3-Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-Routers
app.use("/admin", routerAdmin);

export default app;