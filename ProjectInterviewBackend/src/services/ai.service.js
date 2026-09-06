const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});



const interviewReportJsonSchema = {
    type: "object",

    properties: {

        matchScore: {
            type: "number",
            minimum: 0,
            maximum: 100,
            description:
                "The match score between the candidate and the job description. " +
                "It must be a number between 0 and 100, where 0 means the candidate " +
                "is not suitable for the job and 100 means the candidate is a perfect match."
        },

        technicalQuestions: {
            type: "array",
            description:
                "The technical questions which can be asked in the interview " +
                "along with the intention behind each question and how to answer it.",

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "The technical question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The intention behind asking this question and what " +
                            "the interviewer wants to evaluate."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How to answer this question, what points should be " +
                            "kept in mind, and what approach should be used."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        behavioralQuestions: {
            type: "array",
            description:
                "The behavioral questions which can be asked in the interview " +
                "along with the intention behind each question and how to answer it.",

            items: {
                type: "object",

                properties: {

                    question: {
                        type: "string",
                        description:
                            "The behavioral question that can be asked in the interview."
                    },

                    intention: {
                        type: "string",
                        description:
                            "The intention behind asking this question and what " +
                            "the interviewer wants to evaluate."
                    },

                    answer: {
                        type: "string",
                        description:
                            "How to answer this question, what points should be " +
                            "kept in mind, and what approach should be used."
                    }
                },

                required: [
                    "question",
                    "intention",
                    "answer"
                ]
            }
        },

        skillGaps: {
            type: "array",
            description:
                "The skill gaps in the candidate which are required for the job " +
                "along with the severity of each skill gap.",

            items: {
                type: "object",

                properties: {

                    skill: {
                        type: "string",
                        description:
                            "The skill which is missing or insufficient in the candidate."
                    },

                    severity: {
                        type: "string",
                        enum: [
                            "low",
                            "medium",
                            "high"
                        ],
                        description:
                            "The severity of the skill gap. Low means the candidate " +
                            "can learn this skill easily, medium means the candidate " +
                            "can learn this skill with some effort, and high means the " +
                            "candidate needs to learn this skill from scratch."
                    }
                },

                required: [
                    "skill",
                    "severity"
                ]
            }
        },

        preparationPlan: {
            type: "array",
            description:
                "The preparation plan for the candidate to prepare for the interview " +
                "along with the focus and detailed plan for each day.",

            items: {
                type: "object",

                properties: {

                    day: {
                        type: "string",
                        description:
                            "The day of the preparation plan."
                    },

                    focus: {
                        type: "string",
                        description:
                            "The focus of the preparation plan for that day, " +
                            "including what to learn, practice, revise, or improve."
                    },

                    plan: {
                        type: "string",
                        description:
                            "The detailed plan for that day, including what to do, " +
                            "how to do it, and approximately how much time to spend."
                    }
                },

                required: [
                    "day",
                    "focus",
                    "plan"
                ]
            }
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan"
    ]
};



const interviewReportSchema =
    z.fromJSONSchema(interviewReportJsonSchema);



async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
}) {

    const prompt = `
You are an expert technical recruiter and interview preparation coach.

Analyze the candidate's resume, self-description, and job description.

Generate a detailed interview preparation report.

Follow these rules carefully:

1. Calculate a realistic match score between 0 and 100.
2. The match score should reflect how well the candidate's skills,
   experience, education, and projects match the job description.
3. Generate relevant technical interview questions based on the
   candidate's resume and the job description.
4. Generate relevant behavioral interview questions based on the
   candidate's experience and the job requirements.
5. For every question, explain the intention behind asking it.
6. For every question, explain how the candidate should approach
   the answer and what points they should keep in mind.
7. Identify skills required by the job description that are missing
   or insufficient in the candidate's resume.
8. Assign low, medium, or high severity to every skill gap.
9. Create a practical preparation plan for the candidate.
10. The preparation plan should focus on the candidate's skill gaps,
    important job requirements, and likely interview topics.
11. Do not invent experience, skills, projects, or achievements
    that are not present in the candidate's information.
12. Make the questions realistic for an actual interview.
13. Give useful and actionable preparation advice.
14. Return all required fields from the provided schema.

CANDIDATE RESUME
${resume}

CANDIDATE SELF DESCRIPTION
${selfDescription}


JOB DESCRIPTION
${jobDescription}
`;

    try {

        const interaction = await ai.interactions.create({

            model: "gemini-3-flash-preview",

            input: prompt,

            response_format: {
                type: "text",
                mime_type: "application/json",
                schema: interviewReportJsonSchema
            }
        });



        const rawOutput = interaction.output_text;

        console.log("Gemini output:");
        console.log(rawOutput);

        const parsedOutput = JSON.parse(rawOutput);

        const report =
            interviewReportSchema.parse(parsedOutput);
        console.log("Interview report generated successfully.");

        return report;

    } catch (error) {

        console.error(
            "Error generating interview report:",
            error
        );

        throw error;
    }
}


module.exports = generateInterviewReport;