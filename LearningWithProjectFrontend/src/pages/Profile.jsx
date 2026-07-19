import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate()
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState("");

  if (!user) return null;

  if (isEditing&&isEditing==="profileUpdate") {
    return (
      <EditProfile
        user={user}
        setIsEditing={setIsEditing}
      />
    );
  }
  else if(isEditing==="passwordUpdate"){
    return(
     <ChangePassword setIsEditing={setIsEditing}/>
    )
  }

  return (
    <div className="bg-gray-100 flex h-[90%] w-[70%] px-2 items-center justify-center p-6 relative text-black">
      <button onClick={()=>{navigate(-1)}} className="rounded-xl px-8 active:scale-90 py-2 bg-black text-white text-xl cursor-pointer absolute top-2 right-2 ">Back</button>
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-5xl">
        <div className="grid md:grid-cols-3">
          {/* Left Side */}
          <div className="bg-gradient-to-b from-indigo-600 to-blue-500 text-white flex flex-col items-center p-8">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <h2 className="text-2xl font-bold mt-5">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-indigo-100 mt-2">{user.emailId}</p>

            <div className="flex gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold">{user.age}</h3>
                <p className="text-sm">Age</p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold">{user.gender}</h3>
                <p className="text-sm">Gender</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="md:col-span-2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Profile Information
            </h1>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                About
              </h2>

              <p className="text-gray-600 leading-7">{user.about}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              <div>
                <p className="text-gray-500 text-sm">First Name</p>
                <p>{user.firstName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Last Name</p>
                <p>{user.lastName}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Age</p>
                <p>{user.age}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <p>{user.gender}</p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-gray-500 text-sm">Email</p>
                <p>{user.emailId}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Skills
              </h2>

              <div className="flex flex-wrap gap-3">
                {user.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setIsEditing("profileUpdate")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer"
              >
                Edit Profile
              </button>

              <button
                onClick={() => setIsEditing("passwordUpdate")}
                className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;