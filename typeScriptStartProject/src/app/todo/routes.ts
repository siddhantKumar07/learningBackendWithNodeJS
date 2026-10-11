import exprees from "express";

const todoRouter = exprees.Router()

todoRouter.get("/")
todoRouter.get("/:id")
todoRouter.post("/")
todoRouter.put("/:id")
todoRouter.delete("/:id")



export default todoRouter;