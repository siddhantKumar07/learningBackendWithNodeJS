import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Mail, UserRound, LockKeyhole, BriefcaseBusiness } from "lucide-react";
import EditProfile from "../components/EditProfile.jsx";
import ChangePassword from "../components/ChangePassword.jsx";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState("");

  if (!user) return null;

  if (isEditing === "profileUpdate") {
    return <EditProfile user={user} setIsEditing={setIsEditing} />;
  }

  if (isEditing === "passwordUpdate") {
    return <ChangePassword setIsEditing={setIsEditing} />;
  }

  return (
    <main className="relative flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-[#080d1d] p-4 text-white sm:p-6">
      <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-secondary/10 blur-2xl" />

      <section className="relative flex h-full max-h-[760px] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-xl lg:flex-row">
        <aside className="relative flex w-full shrink-0 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-secondary p-7 text-center lg:w-[35%]">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border-[30px] border-white/10" />

          <div className="relative">
            <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-white/20 p-1.5 shadow-2xl sm:h-36 sm:w-36">
              <img
                src={user.photoUrl}
                alt={`${user.firstName} ${user.lastName}`}
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <h1 className="text-2xl font-black capitalize sm:text-3xl">
              {user.firstName} {user.lastName}
            </h1>

            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/75">
              <Mail size={15} />
              {user.emailId}
            </p>

            <div className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/20 bg-white/10">
              <div className="px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Age
                </p>
                <p className="mt-1 text-xl font-bold">{user.age || "—"}</p>
              </div>

              <div className="border-l border-white/20 px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-white/60">
                  Gender
                </p>
                <p className="mt-1 capitalize">{user.gender || "—"}</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-9">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                Account overview
              </p>
              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Profile information
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Manage your personal details and preferences.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-primary/15 p-3 text-primary sm:block">
              <UserRound size={25} />
            </div>
          </div>

          <div className="mb-7 rounded-2xl border border-white/10 bg-black/10 p-5">
            <div className="mb-3 flex items-center gap-2">
              <UserRound size={18} className="text-primary" />
              <h3 className="font-bold">About</h3>
            </div>
            <p className="leading-7 text-slate-300">
              {user.about || "No introduction added yet."}
            </p>
          </div>

          <div className="mb-7 grid gap-4 sm:grid-cols-2">
            {([
              ["First name", user.firstName],
              ["Last name", user.lastName],
              ["Age", user.age],
              ["Gender", user.gender],
              ["Email", user.emailId],
            ]).map(([label, value], index) => (
              <div
                key={label}
                className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 ${
                  index === 4 ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                <p className="mt-2 truncate text-base font-semibold capitalize text-slate-100">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <BriefcaseBusiness size={18} className="text-primary" />
              <h3 className="font-bold">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {user.skills?.length ? (
                user.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">No skills added yet.</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <button
              onClick={() => setIsEditing("profileUpdate")}
              className="btn btn-primary rounded-xl border-0 px-6 font-bold shadow-lg shadow-primary/20 transition hover:-translate-y-0.5"
            >
              Edit profile
            </button>

            <button
              onClick={() => setIsEditing("passwordUpdate")}
              className="btn rounded-xl border border-white/10 bg-white/5 px-6 text-white hover:bg-white/10"
            >
              <LockKeyhole size={17} />
              Change password
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Profile;
