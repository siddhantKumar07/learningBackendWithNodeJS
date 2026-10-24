import {router} from "express";

const authRouter = router();

authRouter.post("/register", register);


export default authRouter;