import {Router} from "express";
import {forgotPasswordController, getMeController, registerController} from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import registerDTO from "./dto/register.dto.js";
import loginDTO from "./dto/login.dto.js";
import {loginController} from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";
import { logoutController,resetPasswordController } from "./auth.controller.js";
import { verifyEmailController } from "./auth.controller.js";
import forgotPasswordDTO from "./dto/forgotPassword.dto.js";

const authRouter = Router();

authRouter.post("/register", validate(registerDTO), registerController);
authRouter.get("/verify-email/:token", verifyEmailController);

authRouter.post("/login",validate(loginDTO),loginController)

authRouter.post("/logout",authenticate,logoutController)

authRouter.get("/me",authenticate,getMeController)


// forgot password route
authRouter.post("/forgot-password",forgotPasswordController)
// reset password route
authRouter.post("/reset-password",validate(forgotPasswordDTO),resetPasswordController)
export default authRouter;