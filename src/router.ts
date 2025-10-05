import express from "express";
import memberController from "./controller/member.controller";
const router = express.Router();



          /*  MEMBER*/
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup); 


export default router;
