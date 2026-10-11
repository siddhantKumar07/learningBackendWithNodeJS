import exprees from "express";
import TodoController from "./controller.js";

const todoRouter = exprees.Router()
const todoController = new TodoController();
todoRouter.get("/",todoController.handleGetAllTodos.bind(todoController))
// todoRouter.get("/:id")
todoRouter.post("/",todoController.handleCreateTodo.bind(todoController))
// todoRouter.put("/:id")
// todoRouter.delete("/:id")



export default todoRouter;