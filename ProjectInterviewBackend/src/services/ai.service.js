const  { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const invokeGemini =async()=>{
try{
    const response = await ai.models.generateContent({
  model: "gemini-3-flash-preview ",
  contents: "define love",
});
console.log(response.text);

}catch(err){
    console.log(err.message)
}
}

module.exports = invokeGemini