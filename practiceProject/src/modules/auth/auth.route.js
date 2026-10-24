import {router} from "express";
import {registerController} from "./auth.controller";
const authRouter = router();

authRouter.post("/register", registerController);


export default authRouter;