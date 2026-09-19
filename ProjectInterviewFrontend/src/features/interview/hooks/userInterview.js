import { useContext } from "react";
import {
  generateInterviewReport,
  getInterviewReportById,
  getAllInterviewReportsOfLoggedInUser,
  generateResumePdf
} from "../services/interview.api";
import { useParams } from "react-router";
import { useEffect } from "react";
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
       Setreport(response.report);
       console.log("response from generateReport", response.report);
      return response.report;
    } catch (error) {
      Setloading(true);
      throw new Error("something went wrong", error.message);
    } finally {
      Setloading(false);
    }
  };

  const getReportById = async (interviewId) => {
          Setloading(true);
    try {

      const response = await getInterviewReportById(interviewId);
       Setreport(response.report);
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
      Setreports(response.reports);
    } catch (error) {
      Setloading(true);
      throw new Error("error in getAllLoggedinReport ", error.message);
    } finally {
      Setloading(false);
    }
  };
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
    else{
      getAllLoggedinReport()
    }
  }, [interviewId]);

  const generatePdf = async (interviewId) => {
      Setloading(true);
    try {
      let response = await generateResumePdf(interviewId);
      const url =window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `interview_report_${interviewId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
        
    }
    catch (error) {
      Setloading(true);
      throw new Error("error in generatePdf ", error.message);
    }
    finally {
      Setloading(false);
    }
  }

  return {
    Setloading,
    loading,
    report,
    reports,
    getAllLoggedinReport,
    getReportById,
    generateReport,
    generatePdf
  };
};

export default useInterview;