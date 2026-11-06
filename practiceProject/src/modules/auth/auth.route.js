import {router} from "express";
import {registerController} from "./auth.controller";
import validate from "../../common/middleware/validate.middleware";
import registerDTO from "./dto/register.dto";
const authRouter = router();

authRouter.post("/register", validate(registerDTO), registerController);


export default authRouter;