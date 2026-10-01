import React from "react";

const AboutSection = ({ receiver }) => {
  const skills = Array.isArray(receiver?.skills) ? receiver.skills : [];

  return (
    <section className="flex h-full w-full min-w-0 flex-col overflow-y-auto bg-[#151e34] p-5 text-[#dae2fd]">
      <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1428]">
        <img
          src={receiver?.photoUrl}
          alt={`${receiver?.firstName} profile`}
          className="block h-64 w-full object-cover"
        />
      </div>

      <div className="min-w-0 text-center">
        <h2 className="truncate text-2xl font-black capitalize text-white">
          {receiver?.firstName} {receiver?.lastName}
        </h2>

        <p className="mt-2 break-words text-sm leading-6 text-slate-400">
          {receiver?.about || "No introduction available."}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 divide-x divide-white/15 rounded-2xl border border-white/15 bg-[#0d1428] py-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Age
          </p>
          <p className="mt-1 font-bold text-white">{receiver?.age || "—"}</p>
        </div>

        <div className="min-w-0 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Gender
          </p>
          <p className="mt-1 truncate px-2 font-bold capitalize text-white">
            {receiver?.gender || "—"}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-center text-sm font-bold uppercase tracking-wider text-slate-400">
          Skills
        </h3>

        <div className="flex flex-wrap justify-center gap-2">
          {skills.length ? (
            skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-sm text-slate-500">No skills listed</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;