import { useState } from "react";

const Home = () => {
  const [resume, setResume] = useState(null);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
              Interview studio
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Build your interview plan
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Share the role and your experience. We&apos;ll turn them into a focused preparation report.
            </p>
          </div>
          <div className="hidden rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-xs text-slate-400 sm:block">
            Step 1 <span className="mx-2 text-slate-600">/</span> Your profile
          </div>
        </header>

        <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-400">
                <span className="text-lg">01</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Target role</h2>
                <p className="mt-1 text-sm text-slate-400">Paste the job description you&apos;re preparing for.</p>
              </div>
            </div>
            <label htmlFor="jobDescription" className="mb-2 block text-sm font-medium text-slate-300">
              Job description
            </label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              placeholder="e.g. We are looking for a frontend engineer..."
              className="min-h-[330px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-400/10"
            />
          </section>

          <section className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 sm:p-7">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400">
                <span className="text-lg">02</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Your background</h2>
                <p className="mt-1 text-sm text-slate-400">Add a resume and a little context about yourself.</p>
              </div>
            </div>

            <label
              htmlFor="resume"
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-600 bg-slate-950/50 p-4 transition hover:border-cyan-400 hover:bg-cyan-400/5"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">↑</span>
                <span>
                  <span className="block text-sm font-semibold">{resume ? resume.name : "Upload your resume"}</span>
                  <span className="mt-1 block text-xs text-slate-500">PDF, DOC or DOCX · max 10 MB</span>
                </span>
              </span>
              <span className="text-xs font-semibold text-cyan-300">Browse</span>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(event) => setResume(event.target.files?.[0] ?? null)}
            />

            <label htmlFor="selfDescription" className="mb-2 mt-6 block text-sm font-medium text-slate-300">
              Tell us about yourself
            </label>
            <textarea
              name="selfDescription"
              id="selfDescription"
              placeholder="Mention your experience, strengths, and the areas you want to improve..."
              className="min-h-[170px] w-full resize-none rounded-2xl border border-slate-700 bg-slate-950/70 p-4 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10"
            />

            <button
              className="mt-6 cursor-pointer active:scale-90  flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-fuchsia-500/10 transition hover:brightness-110 active:scale-[0.98]"
              type="submit"
            >
              Generate interview report
              <span aria-hidden="true">→</span>
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">Your information is used only to personalize your report.</p>
          </section>
        </form>
      </div>
    </main>
  );
};

export default Home