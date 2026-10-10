import http from "node:http";
import { createServer } from "./app/app.js"
async function main(){
    try{
  const server = http.createServer(createServer());
  const PORT:number=process.env.PORT?+process.env.PORT:3000;
  server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
  })
    }catch(err){
        console.log(err);
    }
}
main();