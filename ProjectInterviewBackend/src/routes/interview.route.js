const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { generateInterviewReportController, getInterviewReportController } = require("../controllers/interviewController");
const multer =require("multer")
const interviewRouter = express.Router();


// Set up multer for file uploads
const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024 // 5mb
    },
})
/**
 * @route POST /api/interview
 * @description This route is used to generate an interview report based on the provided resume, self-description, and job description. It uses the AI service to generate the report and returns it in the response.
 * @access private
 */
interviewRouter.post("/",authMiddleware,upload.single("resume"),generateInterviewReportController)


/**
 * @route GET /api/interview/report/:id
 * @description This route is used to retrieve a previously generated interview report by its ID. It returns the report in the response.
 * @access private
 */
interviewRouter.get("/report/:interviewId",authMiddleware,getInterviewReportController)




module.exports = interviewRouter;





