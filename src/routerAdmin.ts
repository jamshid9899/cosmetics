import express from "express";
import adminController from "./controller/admin.controller";
const routerAdmin = express.Router();
import productController from "./controller/product.controller";
import makeUploader from "./libs/utils/uploader";


/**  ADMIN */
routerAdmin.get("/", adminController.goHome);

routerAdmin
   .get("/signup", adminController.getSignup)
   .post("/signup/process",  makeUploader("members").single("memberImage"), adminController.processSignup);
routerAdmin
   .get("/login", adminController.getLogin)
   .post("/login/process", adminController.processLogin);

routerAdmin.get("/logout", adminController.logout);   
routerAdmin.get("/checkme", adminController.checkAuthSession);

/**PRODUCT */
// Product 
// routerAdmin.get("/product/all", adminController.verifyAdmin,  productController.getAllProducts);

routerAdmin.post("/product/create", adminController.verifyAdmin, // uploadProductImage.single("productImage"), // uploadProductImage
    makeUploader("products").array("productImages", 5), productController.createNewProduct);

routerAdmin.post("/product/:id", adminController.verifyAdmin,productController.updateChosenProduct)

export default routerAdmin
