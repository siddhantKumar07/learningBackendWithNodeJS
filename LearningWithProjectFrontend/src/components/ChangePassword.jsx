import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/constants";
import { toast, Bounce, ToastContainer,Flip} from "react-toastify";
const ChangePassword = ({ setIsEditing }) => {
  const [updatePass, setupdatePass] = useState({});

  const handleChange = (e) => {
    setupdatePass((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        base_url + "/profile/updatePassword",
        updatePass,
        {
          withCredentials: true,
        },
      );
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
    setIsEditing(null);
      console.log(response);
    } catch (err) {
       setIsEditing("passwordUpdate");
        if (err.response.status == 400) {
        toast.error(err.response?.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("something went wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };
  return (
    <div className="bg-gray-100 text-black min-h-[90vh] flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-3xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-center">Change Password</h1>

        <div>
          <label className="block mb-2 font-medium">Old Password</label>

          <input
            type="password"
            name="oldPassword"
            value={updatePass.oldPassword}
            onChange={handleChange}
            placeholder="Enter old password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">New Password</label>

          <input
            type="password"
            name="newPassword"
            value={updatePass.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className=" cursor-pointer flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
          >
            Update Password
          </button>

          <button
            type="button"
            onClick={() => setIsEditing(null)}
            className="cursor-pointer flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
