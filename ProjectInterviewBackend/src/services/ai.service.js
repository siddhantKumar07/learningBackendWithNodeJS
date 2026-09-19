const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
require("dotenv").config();
const puppeteer = require("puppeteer");
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
        },
         title:{
        type: "string",
        description:"The title of the job for which the interview report is generated."
       },
    },
    required: [
        "title",
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

const generatePdfFromHtml = async (html) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    return pdfBuffer;

}

const resumePdfJsonSchema = {
    type: "object",
    properties: {
        html: {
            type: "string",
            description: "Complete HTML resume with inline CSS."
        }
    },
    required: ["html"]
};

const resumePdfSchema = z.object({
    html: z.string()
});

const generateResumePdf = async ({
    resume,
    selfDescription,
    jobDescription
}) => {

const prompt = `
You are an expert ATS resume writer and professional resume designer.

Create a COMPLETE professional resume in HTML format using the candidate's
provided resume, self-description, and job description.

The HTML will be directly converted into an A4 PDF.

========================================
MOST IMPORTANT RULE
========================================

DO NOT invent information.

Use ONLY information that exists in:
1. Candidate Resume
2. Candidate Self Description

The Job Description is ONLY used to understand what is relevant and to
optimize the wording.

NEVER add:
- Fake experience
- Fake projects
- Fake companies
- Fake skills
- Fake certifications
- Fake achievements
- Fake dates
- Fake numbers
- Fake contact information
- Fake education
- Fake links
- Generic placeholder content

If something does not exist in the candidate information, do not create it.

========================================
USE THE CANDIDATE'S INFORMATION
========================================

Do NOT unnecessarily remove genuine information from the candidate resume.

Extract and organize all useful professional information.

For example, if the candidate resume contains projects, INCLUDE THEM.

If it contains experience, INCLUDE IT.

If it contains education, INCLUDE IT.

If it contains certifications, INCLUDE THEM.

If it contains achievements, INCLUDE THEM.

Do not reduce a complete resume to only Summary + Skills.

========================================
RESUME STRUCTURE
========================================

Use this order when information exists:

HEADER
PROFESSIONAL SUMMARY
TECHNICAL SKILLS
EXPERIENCE
PROJECTS
EDUCATION
CERTIFICATIONS
ACHIEVEMENTS

Only omit a section if there is genuinely no information for it.

Do NOT create:
- Core Competencies
- Soft Skills
- Career Objective
- References
- Hobbies
- Declaration
- Strengths
- Interests

just to fill space.

========================================
HEADER
========================================

Use the candidate's REAL name from the provided resume.

Do NOT generate names such as:

"FULL STACK DEVELOPER CANDIDATE"
"SOFTWARE ENGINEER CANDIDATE"
"YOUR NAME"

The header should contain:

Candidate Name
Professional Title, if supported by the candidate information

Email | Phone | Location | LinkedIn | GitHub

Only show information that actually exists.

========================================
PROFESSIONAL SUMMARY
========================================

Create a concise 2-3 sentence summary.

Make it relevant to the Job Description.

Use the candidate's real experience, skills, education and projects.

Do NOT use meaningless generic statements such as:

"Hardworking and passionate individual..."
"Looking for a challenging opportunity..."
"Highly motivated team player..."

========================================
TECHNICAL SKILLS
========================================

Organize the candidate's actual technical skills.

Example:

Languages: JavaScript, Java
Frontend: React, HTML, CSS, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Tools: Git, GitHub

Only include technologies actually present in the candidate information.

Do NOT create skill ratings, percentages, bars or stars.

========================================
EXPERIENCE
========================================

If experience exists, include it.

For every role:

Company Name | Job Title
Duration

• Concise responsibility or achievement
• Concise responsibility or achievement
• Concise responsibility or achievement

Do not invent metrics.

========================================
PROJECTS
========================================

If projects exist in the candidate information, they MUST be included.

For every project:

Project Name | Technologies

• What the candidate built
• Important functionality
• Candidate's technical contribution

Use 2-4 concise bullets per project.

Do NOT invent projects.

========================================
EDUCATION
========================================

Use the actual degree, institution and dates provided.

Example:

Master of Computer Applications (MCA)
Institute Name
2025 - 2027

Never output incomplete content such as:

"Computer Science"
"Student"

when the actual information is available elsewhere in the candidate input.

========================================
JOB DESCRIPTION OPTIMIZATION
========================================

Analyze the Job Description.

Identify:
- Required technologies
- Required skills
- Responsibilities
- Important keywords

Then prioritize matching information from the candidate.

IMPORTANT:

A keyword can ONLY be added if the candidate's information supports it.

For example:

If JD says React, Node.js and MongoDB,
and candidate actually knows React, Node.js and MongoDB,
highlight those skills.

But if JD says AWS and candidate has never mentioned AWS,
DO NOT add AWS.

========================================
DESIGN
========================================

Create a professional software/IT resume.

Use a SINGLE COLUMN layout.

The resume should look like a real professional resume,
NOT an AI-generated document.

Design requirements:

- A4 page
- White background
- Dark text
- One subtle accent color
- Arial, Helvetica or Calibri
- Professional typography
- Clear hierarchy
- Thin section separators
- Compact spacing
- Strong visual alignment
- Consistent margins
- Clean bullet points

DO NOT use:

- Photos
- Emojis
- Icons
- Skill bars
- Charts
- Progress bars
- Stars
- Sidebars
- Two-column layout
- Large graphics
- Excessive colors
- Huge headings
- Excessive whitespace

========================================
PAGE USAGE
========================================

IMPORTANT:

Use the available page space efficiently.

DO NOT leave large empty areas.

DO NOT vertically center the resume.

DO NOT add huge gaps between sections.

DO NOT make the font unnecessarily tiny just to fit content.

The resume should naturally flow from the top of the page.

If the candidate has enough genuine information for one page,
make a strong one-page resume.

If there is enough genuine information for two pages,
allow a second page.

NEVER create a second page simply because of excessive spacing.

NEVER create fake content to fill empty space.

========================================
SPACING
========================================

Use approximately:

Page margin: 0.45-0.55 inch
Body font: 10-10.5px
Name: 22-26px
Section heading: 12-14px
Line height: 1.15-1.25

Spacing:

Header bottom: 10-14px
Between sections: 10-14px
Between bullets: 3-5px
Between heading and content: 4-6px

Keep the resume compact but readable.

========================================
HTML
========================================

Return a COMPLETE HTML document.

Use:

<!DOCTYPE html>
<html>
<head>
<style>
...
</style>
</head>
<body>
...
</body>
</html>

Use semantic HTML.

Use CSS that works correctly when converted to PDF.

Use:

@page {
    size: A4;
    margin: 0.5in;
}

Do NOT use fixed page heights.

Do NOT use vertical centering.

Do NOT use unnecessary min-height.

Do NOT use CSS that creates large empty areas.

Avoid CSS grid and multi-column layouts.

========================================
FINAL CHECK
========================================

Before returning the HTML, check:

1. Is the candidate's real name used?
2. Did I invent anything?
3. Did I include all genuine relevant projects?
4. Did I include genuine experience?
5. Did I include genuine education?
6. Did I include genuine skills?
7. Did I unnecessarily create sections?
8. Is there excessive whitespace?
9. Is the content starting near the top?
10. Is the resume ATS-friendly?
11. Is the resume professionally formatted?
12. Is the Job Description reflected naturally?

If information exists in the candidate input, USE IT.

Return ONLY the HTML document.

NO Markdown.
NO JSON.
NO explanation.
NO code fence.

========================================
CANDIDATE RESUME
========================================

${resume}

========================================
CANDIDATE SELF DESCRIPTION
========================================

${selfDescription}

========================================
JOB DESCRIPTION
========================================

${jobDescription}
`;


const interaction = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    input: prompt,
    response_format: {
        type: "text",
        mime_type: "application/json",
        schema: resumePdfJsonSchema
    }
});

const parsedOutput = JSON.parse(interaction.output_text);
const validatedOutput = resumePdfSchema.parse(parsedOutput);

const pdfBuffer = await generatePdfFromHtml(validatedOutput.html);
return pdfBuffer;
};

module.exports = {
    generateInterviewReport,
    generateResumePdf,
};