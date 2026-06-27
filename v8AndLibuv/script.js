const crpto = require('crypto');
console.log("helo")
crpto.pbkdf2Sync("siddhant",'salt',500000,50,'sha512');
console.log("key was generated")

crpto.pbkdf2("siddhant",'salt',5000,50,'sha512',(err,key)=>{
    console.log  (key)
})