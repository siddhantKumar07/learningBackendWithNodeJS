import {createServer} from "node:http";

async function main() {
 
   try{
     const server = createServer()
    const PORT : number = 3000;
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
   }catch(err){
    console.error(err)
    throw err
   }


}