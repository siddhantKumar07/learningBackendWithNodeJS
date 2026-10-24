import {router} from "express";
import {registerController} from "./auth.controller.js";
const authRouter = router();

authRouter.post("/register", registerController);


export default authRouter;