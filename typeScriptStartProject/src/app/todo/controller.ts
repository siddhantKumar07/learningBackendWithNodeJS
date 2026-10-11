import type {Todo} from "../../validation/todo.schema.js";

class TodoController {
    private _db:Todo[];

    constructor(){
        this._db=[];
    }
}