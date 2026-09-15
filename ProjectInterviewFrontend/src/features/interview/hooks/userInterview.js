import { useContext, useState } from "react";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReportsOfLoggedInUser,
} from "../services/interview.api";

import { interviewContext } from "../Interview.context.jsx";

const useInterview = () => {
  const context = useContext(interviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { report, Setreport, loading, Setloading, reports, Setreports } =
    context;

  const generateReport = async ({
    resume,
    selfDescription,
    jobDescription,
  }) => {
    try {
      Setloading(true);
      const response = await generateInterviewReport({
        resume,
        selfDescription,
        jobDescription,
      });
      await Setreport(response.report);
      Setloading(false);
    } catch (error) {
      Setloading(true);
      throw new Error("something went wrong", error.message);
    } finally {
      Setloading(false);
    }
  };

  const getReportById = async (interviewId) => {
    try {
      Setloading(true);
      const response = await getInterviewReportById(interviewId);
      await Setreport(response.report);
      Setloading(false);
    } catch (error) {
      Setloading(true);
      throw new Error("something wrong in get Report by id", error.message);
    } finally {
      Setloading(false);
    }
  };

  const getAllLoggedinReport = async () => {
    try {
      Setloading(true);
      const response = await getAllInterviewReportsOfLoggedInUser();
      await Setreports(response.reports);
      Setloading(false);
    } catch (error) {
      Setloading(true);
      throw new Error("error in getAllLoggedinReport ", error.message);
    } finally {
      Setloading(false);
    }
  };
  return {
    loading,
    report,
    reports,
    getAllLoggedinReport,
    getReportById,
    generateReport,
  };
};
export default useInterview;