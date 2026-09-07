const {generateInterviewReport} = require("../services/ai.service")
const pdfParse = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model")
const generateInterviewReportController = async(req,res)=>{
const {selfDescription,jobDescription} = req.body;

try{
    const resume =await pdfParse( req.file.buffer.toString("base64"))

    const report = await generateInterviewReport({
        resume:resume,
        selfDescription,
        jobDescription
    })
    const savedReport =await interviewReportModel.create()
}catch(error){
    return res.status(500).json({message:"Internal server error",error:error.message});
}
}
module.exports = {generateInterviewReportController}