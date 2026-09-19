import { useEffect, useState } from "react";
import interviewData from "../generateData.json";
import useInterview from "../hooks/userInterview"
import { useParams } from "react-router";
const Interview = () => {
  const {report,getReportById,Setloading,loading} = useInterview()
  const [activeTab, setActiveTab] = useState("technical");
  console.log("report, ",report)
// Get the interviewId from the URL parameters
  const { interviewId } = useParams();

  useEffect(()=>{
    if(interviewId){
      getReportById(interviewId)
    }


  },[interviewId])


  if (loading || !report) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1e1d1d]">
        <h1 className="text-4xl font-bold text-white">
          {loading ? "Loading..." : "Report not found"}
        </h1>
      </div>
    );
  }
  const tabs = [
    { id: "technical", label: "Technical questions" },
    { id: "behavioral", label: "Behavioral questions" },
    { id: "roadmap", label: "Road Map" },
  ];

  const questions =
    activeTab === "technical"
      ? report.technicalQuestions
      : report.behavioralQuestions;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[235px_minmax(0,1fr)_300px]">
        {/* Left Sidebar */}
        <aside className="border-b  border-slate-200 bg-white p-6 lg:border-b-0 lg:border-r">
          <h2 className="mb-8 text-xl font-bold text-slate-900">
            Interview Prep
          </h2>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-3 text-left text-sm transition ${
                  activeTab === tab.id
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <button className=" mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-[#f54dac] px-3 py-3 text-xl font-semibold text-black shadow-sm transition hover:bg-[#f52c9e] focus:outline-none  active:scale-95 cursor-pointer">
            <span className="text-sm font-semibold group-hover:text-slate-100">Download PDF</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 p-5 h-screen overflow-scroll scrollbar-none sm:p-8 lg:p-12">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Interview preparation
                </p>

                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {activeTab === "technical" && "Technical Questions"}
                  {activeTab === "behavioral" && "Behavioral Questions"}
                  {activeTab === "roadmap" && "Preparation Road Map"}
                </h1>
              </div>

              {activeTab === "technical" && (
                <span className="rounded-full bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                  Match score: {report.matchScore}%
                </span>
              )}
            </div>

            {activeTab !== "roadmap" && (
              <p className="mb-6 text-slate-500">
                {activeTab === "technical"
                  ? "Prepare for role-specific technical interviews."
                  : "Practice explaining your experience clearly."}
              </p>
            )}

            {activeTab !== "roadmap" ? (
              <div className="space-y-5">
                {questions.map((item, index) => (
                  <article
                    key={item.question}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="text-sm font-bold text-blue-600">
                      Q{index + 1}
                    </span>

                    <h2 className="mt-2 text-lg font-semibold leading-relaxed text-slate-900">
                      {item.question}
                    </h2>

                    <div className="mt-4">
                      <p className="text-sm leading-6 text-slate-600">
                        <strong className="text-slate-800">
                          What they want to know:
                        </strong>{" "}
                        {item.intention}
                      </p>
                    </div>

                    <div className="mt-4 rounded-lg bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-800">
                        Suggested answer:
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.answer}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {interviewData.preparationPlan.map((item) => (
                  <article
                    key={item.day}
                    className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="min-w-16 text-sm font-bold text-blue-600">
                      {item.day}
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">
                        {item.focus}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.plan}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="border-t border-slate-200 bg-white p-6 lg:border-t-0 lg:border-l">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            Skill Gaps
          </h2>

          <div className="flex flex-wrap gap-2">
            {report.skillGaps.map((item) => (
              <span
                key={item.skill}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  item.severity === "high"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : item.severity === "medium"
                      ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                      : "border-green-200 bg-green-50 text-green-700"
                }`}
              >
                {item.skill}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;