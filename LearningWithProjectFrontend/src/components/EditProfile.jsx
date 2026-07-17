import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast, Bounce, ToastContainer, Flip } from "react-toastify";
import Card from "./Card";
const EditProfile = ({ user, setIsEditing }) => {
  const dispatch = useDispatch();
  const { age, gender, photoUrl, about, skills = [] } = user;

  const [formData, setFormData] = useState({
    age,
    gender,
    photoUrl,
    about,
    skills: Array.isArray(skills) ? skills.join(", ") : String(skills || ""),
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
       ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...formData,
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try{
      const response  =await axios.patch(base_url+"/profile/edit",updatedUser,{
      withCredentials:true
    })
dispatch(addUser(response.data.updatedUser));
    toast.success("updated succesfully", {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Flip,
});
    }catch(err){
      console.log(err);
    }

    setIsEditing(null);
  };

  return (
    <div className="bg-gray-100 text-black min-h-[90vh] flex justify-center gap-7 items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold">Edit Profile</h1>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border rounded-lg p-3"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="photoUrl"
            value={formData.photoUrl}
            onChange={handleChange}
            placeholder="Photo URL"
            className="border rounded-lg p-3"
          />
        </div>

        <textarea
          rows={4}
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About"
          className="border rounded-lg p-3 w-full"
        />

        <input
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="React, Node, MongoDB"
          className="border rounded-lg p-3 w-full"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(null)}
            className="bg-gray-300 px-6 py-3 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    <Card user={formData} />
    </div>
  );
};

export default EditProfile;