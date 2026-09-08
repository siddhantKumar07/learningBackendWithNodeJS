const generateInterviewReport = require("../services/ai.service")
const { PDFParse } = require("pdf-parse");const interviewReportModel = require("../model/interviewReportSchema")
const generateInterviewReportController = async(req,res)=>{
const {selfDescription,jobDescription} = req.body;

try{
const parser = new PDFParse({
  data: req.file.buffer,
});

const parsedPdf = await parser.getText();
await parser.destroy();

const resume = parsedPdf.text;

    const report = await generateInterviewReport({
        resume:resume.text,
        selfDescription,
        jobDescription
    })
    const savedReport =await interviewReportModel.create({
        user:req.user.id,
        resume:resume.textj,
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