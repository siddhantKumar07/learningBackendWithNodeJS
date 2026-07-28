const ImageKit = require("@imagekit/nodejs")
require("dotenv").config();
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_API_KEY // This is the default and can be omitted
});

const uploadImage = async(buffer,fileName)=>{

try{
const response = await client.files.upload({
  file: buffer.toString("base64"),
  fileName: fileName
});

return response;

}catch(error){
    return res.status(500).json({
        message:"Internal server error",
        error:error.message
    })


}
}
module.exports = uploadImage