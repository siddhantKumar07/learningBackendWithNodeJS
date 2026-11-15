import {router} from "express";
import {registerController} from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import registerDTO from "./dto/register.dto";
import loginDTO from "./dto/login.dto";
import validateDTO from "../../common/middleware/validate.middleware.js";
import {loginController} from "./auth.controller.js";



const authRouter = router();

authRouter.post("/register", validate(registerDTO), registerController);

authRouter.post("/login",validate(loginDTO),loginController)

export default authRouter;