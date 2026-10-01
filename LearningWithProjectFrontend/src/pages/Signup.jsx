import axios from "axios";
import React, { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../utils/constants.js";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    image: null,
    skills: "",
    about: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const checkedData = {
      ...data,
      skills: data.skills
        ? data.skills.split(",").map((skill) => skill.trim())
        : [],
    };

    const formData = new FormData();

    Object.entries(checkedData).forEach(([key, value]) => {
      if (key === "skills") {
        value.forEach((skill) => formData.append("skills", skill));
      } else if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      await axios.post(`${base_url}/signUp`, formData, {
        withCredentials: true,
      });

      toast.success("😍 Account created successfully!", {
        position: "top-right",
        autoClose: 1800,
        transition: Bounce,
      });

      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to create account", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "input w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 transition duration-300 focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <main className="relative flex h-screen items-center justify-center overflow-hidden bg-slate-950 px-3 py-3 text-white sm:px-4">
      <div className="absolute -left-24 -top-24 h-72 w-72 animate-pulse rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 animate-pulse rounded-full bg-secondary/25 blur-3xl [animation-delay:1s]" />
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <section className="relative grid h-[calc(100vh-1.5rem)] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-primary/20 backdrop-blur-xl md:grid-cols-[0.85fr_1.5fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-secondary p-8 md:flex md:flex-col md:justify-between">
          <div className="absolute -right-16 -top-16 h-48 w-48 animate-spin rounded-full border-[24px] border-white/10 [animation-duration:12s]" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border-[30px] border-white/10" />

          <div className="relative">
            <div className="mb-5 inline-flex h-14 w-14 animate-bounce items-center justify-center rounded-2xl bg-white/20 text-3xl shadow-lg">
              🚀
            </div>

            <h1 className="text-4xl font-black leading-tight">
              Start your
              <br />
              journey!
            </h1>

            <p className="mt-4 max-w-sm leading-relaxed text-white/80">
              Create your account and connect with a community built for growth.
            </p>
          </div>

          <div className="relative flex flex-wrap gap-2 text-sm text-white/70">
            <span className="rounded-full bg-white/15 px-3 py-1.5">
              ✨ Discover
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5">
              🤝 Connect
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="min-h-0 overflow-hidden p-4 sm:p-7">
          <div className="mb-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Join the community
            </p>

            <h2 className="text-3xl font-black">Create account</h2>

            <p className="mt-1 text-sm text-white/50">
              Fill in your details to get started.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {([
              ["First name", "firstName", "text", "John"],
              ["Last name", "lastName", "text", "Doe"],
              ["Email", "emailId", "email", "you@example.com"],
              ["Password", "password", "password", "Create a password"],
              ["Age", "age", "number", "Your age"],
            ]).map(([label, name, type, placeholder]) => (
              <label key={name} className="form-control">
                <span className="mb-1 text-sm font-semibold text-white/80">
                  {label}
                </span>

                <input
                  required
                  type={type}
                  name={name}
                  value={data[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className={`${inputClass} h-10`}
                />
              </label>
            ))}

            <label className="form-control">
              <span className="mb-1 text-sm font-semibold text-white/80">
                Gender
              </span>

              <select
                required
                name="gender"
                value={data.gender}
                onChange={handleChange}
                className={`${inputClass} h-10`}
              >
                <option value="" className="bg-slate-900">
                  Select gender
                </option>
                <option value="Male" className="bg-slate-900">
                  Male
                </option>
                <option value="Female" className="bg-slate-900">
                  Female
                </option>
                <option value="Other" className="bg-slate-900">
                  Other
                </option>
              </select>
            </label>

            <label className="form-control sm:col-span-2">
              <span className="mb-1 text-sm font-semibold text-white/80">
                Profile photo
              </span>

              <input
                required
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="file-input file-input-sm w-full rounded-xl border-white/10 bg-white/5 text-white"
              />
            </label>

            <label className="form-control sm:col-span-2">
              <span className="mb-1 text-sm font-semibold text-white/80">
                Skills
              </span>

              <input
                type="text"
                name="skills"
                value={data.skills}
                placeholder="React, Node.js, MongoDB"
                onChange={handleChange}
                className={`${inputClass} h-10`}
              />
            </label>

            <label className="form-control sm:col-span-2">
              <span className="mb-1 text-sm font-semibold text-white/80">
                About
              </span>

              <textarea
                name="about"
                rows="2"
                value={data.about}
                placeholder="Tell us something about yourself..."
                onChange={handleChange}
                className={`${inputClass} resize-none py-2`}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-4 h-10 min-h-10 w-full rounded-xl border-0 text-sm font-bold shadow-lg shadow-primary/30 transition duration-300 hover:-translate-y-1 hover:shadow-primary/50"
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Creating account...
              </>
            ) : (
              "Create account →"
            )}
          </button>

          <p className="mt-3 text-center text-xs text-white/50">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-primary transition hover:text-secondary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        transition={Bounce}
      />
    </main>
  );
};

export default Signup;
