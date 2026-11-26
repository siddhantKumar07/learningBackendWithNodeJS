import {createServer} from "node:http";
import { createExpresApp } from "./app/index";
async function main() {
    
   try{
     const server = createServer(createExpresApp())
    const PORT : number = 3000;
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
   }catch(err){
    console.error(err)
    throw err
   }


}
main()