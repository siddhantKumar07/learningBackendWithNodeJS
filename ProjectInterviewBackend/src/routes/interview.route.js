const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { generateInterviewReportController } = require("../controllers/interviewController");
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





module.exports = interviewRouter;





