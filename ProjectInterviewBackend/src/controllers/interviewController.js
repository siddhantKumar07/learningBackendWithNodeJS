const {generateInterviewReport,generateResumePdf } = require("../services/ai.service")
const { PDFParse } = require("pdf-parse");
const interviewReportModel = require("../model/interviewReportSchema")
const generateInterviewReportController = async(req,res)=>{
const {selfDescription,jobDescription} = req.body;

try{
    if(!req.file){
        return res.status(400).json({message:"Resume file is required"});
    }
const parser = new PDFParse({
  data: req.file.buffer,
});

const parsedPdf = await parser.getText();
await parser.destroy();

const resume = parsedPdf.text;

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

const getInterviewReportController = async(req,res)=>{
   try {
     const {interviewId} = req.params;
    if(!interviewId){
        return res.status(400).json({message:"Report ID is required"});
    }
    const interviewReport = await interviewReportModel.findOne({
  _id: interviewId,
  user: req.user.id,
});
    if(!interviewReport){
        return res.status(404).json({message:"Report not found"});
    }
    return res.status(200).json({message:"Report retrieved successfully",report:interviewReport});
   }catch (error) {
    return res.status(500).json({message:"Internal server error",error:error.message});
   }

}

const getAllInterviewReportsOfLoggedInUserController=async(req,res)=>{
    const userId = req.user.id;
    try{
      const reports = await interviewReportModel.find({user:userId}).sort({createdAt:-1}).select("title createdAt matchScore");
      if(!reports || reports.length === 0){
        return res.status(404).json({message:"No reports found for the user"});
      }
        return res.status(200).json({message:"Reports retrieved successfully",reports});
    }catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}

const generateResumePdfController = async(req,res)=>{
    const {interviewId} = req.params;

    const interviewReport = await interviewReportModel.findById(interviewId);
    if(!interviewReport){
        return res.status(404).json({message:"Report not found"});
    }
    const {resume,selfDescription,jobDescription}= interviewReport;
    const pdfBuffer = await generateResumePdf({resume,selfDescription,jobDescription});
    if(!pdfBuffer){
        return res.status(500).json({message:"Failed to generate PDF"});
    }
    res.set({
        "Content-Type":"application/pdf",
        "Content-Disposition":`attachment; filename=interview_report_${interviewId}.pdf`,
        "Content-Length":pdfBuffer.length
    })
    res.send(pdfBuffer)
    
}
module.exports = {generateInterviewReportController,getInterviewReportController,getAllInterviewReportsOfLoggedInUserController,generateResumePdfController}