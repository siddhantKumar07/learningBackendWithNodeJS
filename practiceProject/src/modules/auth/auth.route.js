import {router} from "express";
import {getMeController, registerController} from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import registerDTO from "./dto/register.dto";
import loginDTO from "./dto/login.dto";
import validateDTO from "../../common/middleware/validate.middleware.js";
import {loginController} from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";
import { logoutController } from "./auth.controller.js";
import { getMeService } from "./auth.service.js";


const authRouter = router();

authRouter.post("/register", validate(registerDTO), registerController);

authRouter.post("/login",validate(loginDTO),loginController)

authRouter.post("/logout",authenticate,logoutController)

authRouter.get("/me",authenticate,getMeController)
export default authRouter;