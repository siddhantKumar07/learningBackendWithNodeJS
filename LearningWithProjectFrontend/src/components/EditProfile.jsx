import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { ImagePlus, Save, X } from "lucide-react";
import Card from "./Card.jsx";
import { base_url } from "../utils/constants.js";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ user, setIsEditing }) => {
  const dispatch = useDispatch();

  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState(user?.photoUrl || "");

  const [formData, setFormData] = useState({
    age: user?.age || "",
    gender: user?.gender || "",
    about: user?.about || "",
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : "",
    image: null,
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      setFormData((previous) => ({ ...previous, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    const payload = new FormData();

    payload.append("age", formData.age);
    payload.append("gender", formData.gender);
    payload.append("about", formData.about);

    formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .forEach((skill) => payload.append("skills", skill));

    if (formData.image) {
      payload.append("image", formData.image);
    }

    try {
      const response = await axios.patch(
        `${base_url}/profile/edit`,
        payload,
        { withCredentials: true },
      );

      dispatch(addUser(response.data.updatedUser));
      setIsEditing("");

      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 1800,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 2200,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-primary focus:bg-white/10 focus:ring-2 focus:ring-primary/20";

  const previewUser = {
    ...user,
    ...formData,
    photoUrl: preview,
    skills: formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
  };

  return (
    <main className="relative flex h-full min-h-0 w-full items-center justify-center overflow-y-hidden overflow-x-hidden bg-[#080d1d] p-4 text-white sm:p-8">
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <section className="relative grid w-full max-w-5xl gap-6 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-xl sm:p-8"
        >
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Account settings
            </p>
            <h1 className="mt-2 text-3xl font-black">Edit profile</h1>
            <p className="mt-2 text-sm text-slate-400">
              Keep your profile information up to date.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="form-control">
              <span className="mb-2 text-sm font-semibold text-slate-300">
                Age
              </span>
              <input
                required
                min="13"
                max="100"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={inputClass}
              />
            </label>

            <label className="form-control">
              <span className="mb-2 text-sm font-semibold text-slate-300">
                Gender
              </span>
              <select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
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
          </div>

          <label className="form-control mt-5">
            <span className="mb-2 text-sm font-semibold text-slate-300">
              Profile photo
            </span>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/[0.03] p-4 transition hover:border-primary">
              <ImagePlus className="text-primary" />
              <span className="text-sm text-slate-400">
                Choose a new profile image
              </span>
              <input
                hidden
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>
          </label>

          <label className="form-control mt-5">
            <span className="mb-2 text-sm font-semibold text-slate-300">
              About
            </span>
            <textarea
              rows={4}
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell people about yourself"
              className={`${inputClass} resize-none`}
            />
          </label>

          <label className="form-control mt-5">
            <span className="mb-2 text-sm font-semibold text-slate-300">
              Skills
            </span>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className={inputClass}
            />
            <span className="mt-2 text-xs text-slate-500">
              Separate skills with commas.
            </span>
          </label>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setIsEditing("")}
              className="btn rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary flex-1 rounded-xl border-0 font-bold shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>

        <aside className="hidden items-center justify-center lg:flex">
          <Card
            user={previewUser}
            size="h-[min(70vh,38rem)] w-[min(24rem,90vw)]"
          />
        </aside>
      </section>

      <ToastContainer />
    </main>
  );
};

export default EditProfile;
