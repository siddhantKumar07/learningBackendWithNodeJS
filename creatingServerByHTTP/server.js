const http = require('http');

const server= http.createServer((req,res)=>{
    res.end("hello")
});


server.listen(7777,()=>{
    console.log("server is running")

})