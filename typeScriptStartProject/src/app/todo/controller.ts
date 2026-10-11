import type {Todo} from "../../validation/todo.schema.js";
import type { Request, Response } from "express";
import {todoValidationSchema} from "../../validation/todo.schema.js"
class TodoController {
    private _db:Todo[];

    constructor(){
        this._db=[];
    }

    public handleGetAllTodos(req: Request, res: Response){ 
        const todos = this._db;
       return res.status(200).json(todos);
    }

    public async handleCreateTodo(req: Request, res: Response){
        try {
        const unValidate = req.body
         const validatedData=await todoValidationSchema.parseAsync(unValidate)
         this._db.push(validatedData)
   res.status(201).json({
    message:"successfully created",
    todo:validatedData
   })
        }catch (error) {
            return res.status(500).json({message: "Internal Server Error"});
        }
    }
}
export default TodoController;