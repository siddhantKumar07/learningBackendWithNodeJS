const generateInterviewReport = require("../services/ai.service")
const pdfParse = require("pdf-parse")
const interviewReportModel = require("../model/interviewReportSchema")
const generateInterviewReportController = async(req,res)=>{
const {selfDescription,jobDescription} = req.body;

try{
    const resume =await pdfParse( req.file.buffer.toString("base64"))

    const report = await generateInterviewReport({
        resume:resume,
        selfDescription,
        jobDescription
    })
    const savedReport =await interviewReportModel.create({
        user:req.user.id,
        resume:resume,
        selfDescription,
        jobDescription,
        ...report
    })
    return res.status(200).json({message:"Interview report generated successfully",report:savedReport});
    
}catch(error){
    return res.status(500).json({message:"Internal server error",error:error.message});
}
}
module.exports = {generateInterviewReportController}