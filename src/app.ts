import express from 'express';
import path from "path"
import routerAdmin from './routerAdmin';
import morgan from 'morgan' // logging standarts
import { MORGAN_FORMAT } from './libs/types/config';
import router from './router';
import session from "express-session";//(sessions)
import ConnectMongoDB from "connect-mongodb-session";//(sessions)
import cookieParser from 'cookie-parser'; // to save brauzer in cookie the token we generated
import { T } from './libs/types/common';

const MongoDBStore = ConnectMongoDB(session);//(connect mongodb- creation of sessions collection)
const store = new MongoDBStore({
    uri: String(process.env.MONGO_URL),
    collection: "sessions",
});

// 1-Entrance 
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true})); //BSSR
app.use(express.json()); //SPA
app.use(cookieParser()); // to save brauzer in cookie the token we generated
app.use(morgan(MORGAN_FORMAT));



// 2- Session
app.use(require('express-session')({
  secret: String(process.env.SESSION_SECRET),
  cookie: {
    maxAge: 1000 * 3600 * 6, //6h
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});
// 3-Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-Routers
app.use("/admin", routerAdmin);
app.use("/", router);

export default app; 