import { z } from "zod";

export const todoValidationSchema = z.object({
    id:z.string().describe("Unique identifier for the todo item"),
    title:z.string().describe("Title of the todo item"),
    description:z.string().optional().describe("Optional description of the todo item"),
    iscompleted:z.boolean().default(false).describe("Indicates whether the todo item is completed or not")
})

export type Todo = z.infer<typeof todoValidationSchema>;// it will create a type from the schema and we can use it in our code to validate the data.
// export interface Todo {
//     id: number;
//     title: string;
//     description?: string; // Optional property
//     iscompleted: boolean;
// }