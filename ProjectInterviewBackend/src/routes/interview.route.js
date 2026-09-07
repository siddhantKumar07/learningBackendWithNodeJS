const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { generateInterviewReportController } = require("../controllers/interviewController");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description This route is used to generate an interview report based on the provided resume, self-description, and job description. It uses the AI service to generate the report and returns it in the response.
 * @access private
 */
interviewRouter.post("/",authMiddleware,generateInterviewReportController)





module.exports = interviewRouter;





