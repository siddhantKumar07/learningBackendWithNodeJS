import React, { useState } from "react";
import { ToastContainer, Bounce, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { base_url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addFeed } from "../utils/feedSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${base_url}/login`,
        { emailId: email, password },
        { withCredentials: true },
      );

      if (response.data.message === "login successful") {
        await fetchProfile();
        await fetchFeed();

        toast.success("Welcome back! Login successful.", {
          position: "top-right",
          autoClose: 1800,
          transition: Bounce,
        });

        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to login", {
        position: "top-right",
        autoClose: 2000,
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    const user = await axios.get(`${base_url}/profile/view`, {
      withCredentials: true,
    });

    if (!user.data) {
      navigate("/login");
      return;
    }

    dispatch(addUser(user.data.user));
  };

  const fetchFeed = async () => {
    try {
      const feed = await axios.get(`${base_url}/user/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(feed.data.feedUser));
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="absolute -left-24 -top-24 h-72 w-72 animate-pulse rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 animate-pulse rounded-full bg-secondary/25 blur-3xl [animation-delay:1s]" />
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl shadow-primary/20 backdrop-blur-xl md:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-primary via-indigo-600 to-secondary p-12 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -right-16 -top-16 h-48 w-48 animate-spin rounded-full border-[24px] border-white/10 [animation-duration:12s]" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full border-[30px] border-white/10" />

          <div className="relative">
            <div className="mb-8 inline-flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-white/20 text-4xl shadow-lg">
              👋
            </div>
            <h1 className="text-5xl font-black leading-tight">
              Welcome
              <br />
              back!
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/80">
              Sign in and continue building meaningful connections with your
              community.
            </p>
          </div>

          <div className="relative flex gap-3 text-sm text-white/70">
            <span className="rounded-full bg-white/15 px-4 py-2">
              ✨ Connect
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2">
              🚀 Grow
            </span>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-slate-900/80 p-7 text-white sm:p-12"
        >
          <div className="mb-9">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              Your journey continues
            </p>
            <h2 className="text-4xl font-black">Sign in</h2>
            <p className="mt-3 text-white/50">
              Enter your details to access your account.
            </p>
          </div>

          <div className="space-y-5">
            <label className="form-control">
              <span className="mb-2 font-semibold text-white/80">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="input w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 transition duration-300 focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <span className="mb-2 font-semibold text-white/80">
                Password
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className="input w-full rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/30 transition duration-300 focus:border-primary focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary mt-3 w-full rounded-xl border-0 text-base font-bold shadow-lg shadow-primary/30 transition duration-300 hover:-translate-y-1 hover:shadow-primary/50"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Signing in...
                </>
              ) : (
                "Sign in →"
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-primary transition hover:text-secondary hover:underline"
            >
              Create one
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

export default Login;
