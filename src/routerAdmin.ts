import express from "express";
import adminController from "./controller/admin.controller";
const routerAdmin = express.Router();



/**  ADMIN */
routerAdmin.get("/", adminController.goHome);

routerAdmin
   .get("/login", adminController.getLogin)
   .post("/login/process", adminController.processLogin);


routerAdmin
   .get("/signup", adminController.getSignup)
   .post("/signup/process", adminController.processSignup);



export default routerAdmin
