const imageKit = require("@imagekit/nodejs");
require("dotenv").config();

const client = new imageKit({
    privateKey:process.env.IMAGEKIT_API_KEY,
})

const uploadImage = async(buffer,fileName)=>{
   try{
    const response = await client.files.upload({
        file:buffer.toString("base64"),
        fileName:fileName,
    })
return response;
   }
   catch(error){
    return {
        error:true,
        message:error.message
    }
   }
}
module.exports = {
    uploadImage
}